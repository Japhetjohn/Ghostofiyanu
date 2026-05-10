import * as THREE from 'three';
import gsap from 'gsap';

const vertexShader = `
uniform float uTime;
uniform float uDissolveProgress;
uniform float uSpeed;
uniform float uFreq;
uniform float uAmp;
uniform float uMaxAge;
uniform float uGlobalScale;
uniform float uSize;
uniform sampler2D uNoiseMap;

attribute vec3 aInitialPosition;
attribute vec3 aAxis;
attribute float aOffset;

varying vec2 vUv;
varying float vVisibility;

vec3 mod289v3(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289v2(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289v3(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat4(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                  0.0,                                  0.0,                                  1.0
  );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  return (rotationMatrix(axis, angle) * vec4(v, 1.0)).xyz;
}

void main() {
  vUv = uv;

  float age = mod(uTime + aOffset * uMaxAge, uMaxAge);
  vVisibility = 1.0 - (age / uMaxAge);

  float scale = (uSize * vVisibility) * uGlobalScale;

  vec3 noise = texture2D(uNoiseMap, aInitialPosition.xy).rgb;
  vec3 disturbedPos = aInitialPosition * (vec3(1.0) + (noise * 0.015));

  vec3 position = disturbedPos * (1.0 + (uDissolveProgress * 0.7));

  vec3 newPosition = rotate(position, aAxis, uSpeed * 2.0 * age) + transformed;
  newPosition *= scale;

  float driftX = snoise(vec2(newPosition.x * uFreq + (age * 1.5), newPosition.y * uFreq)) * uAmp;
  float driftY = snoise(vec2(newPosition.y * uFreq, newPosition.z * uFreq * 0.85 + (age * 1.5))) * uAmp;

  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  mvPosition.xyz -= vec3(driftX, 0.0, driftY) * uDissolveProgress * 0.5;

  gl_Position = projectionMatrix * mvPosition;

  scale = (uSize * (pow(vVisibility, 5.0))) * uGlobalScale;
}
`;

const fragmentShader = `
uniform vec3 uColor;
uniform vec3 uColorCore;
uniform float uOpacity;

varying vec2 vUv;
varying float vVisibility;

void main() {
  vec3 color = vec3(mix(uColor, uColorCore, vUv.y));
  color *= vVisibility;
  vec3 finalColor = color * 5.0;
  float alpha = (vVisibility * smoothstep(0.15, 0.3, length(color))) * uOpacity;
  gl_FragColor = vec4(finalColor, alpha);
}
`;

function createNoiseTexture(): THREE.DataTexture {
  const size = 64;
  const data = new Float32Array(size * size * 4);
  for (let i = 0; i < size * size * 4; i++) {
    data[i] = Math.random();
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

export class DissolvingHelix {
  container: HTMLElement;
  count: number;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  clock: THREE.Clock;
  mesh!: THREE.InstancedMesh;
  uniforms!: Record<string, THREE.IUniform>;
  tickerCallback: ((time: number) => void) | null = null;
  dissolveTween: gsap.core.Tween | null = null;
  resizeHandler: (() => void) | null = null;
  mouseHandler: ((e: MouseEvent) => void) | null = null;
  mouseX = 0;
  mouseY = 0;
  isActive = true;

  constructor(container: HTMLElement) {
    this.container = container;
    const w = container.clientWidth;
    const h = container.clientHeight;
    this.count = window.innerWidth < 768 ? 1500 : 3000;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x0a0a0f, 1);
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.display = 'block';

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 50);
    this.camera.position.set(4, 0, 6);
    this.camera.lookAt(2.5, 0, 0);

    this.clock = new THREE.Clock();

    this.initMesh();
    this.initEvents();
    this.startAnimation();
  }

  initMesh() {
    const geometry = new THREE.TorusGeometry(0.3, 0.05, 16, 100);

    const positions: number[] = [];
    const axes: number[] = [];
    const offsets: number[] = [];

    for (let i = 0; i < this.count; i++) {
      const u = i / this.count;
      const angle = u * Math.PI * 20;
      const x = Math.cos(angle) + 2.5;
      const y = (u - 0.5) * 7;
      const z = Math.sin(angle);
      positions.push(x, y, z);

      const axis = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
      axes.push(axis.x, axis.y, axis.z);

      offsets.push(Math.random());
    }

    geometry.setAttribute('aInitialPosition', new THREE.InstancedBufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('aAxis', new THREE.InstancedBufferAttribute(new Float32Array(axes), 3));
    geometry.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(offsets), 1));

    const noiseTexture = createNoiseTexture();

    this.uniforms = {
      uDissolveProgress: { value: 0.0 },
      uGlobalScale: { value: 1.0 },
      uTime: { value: 0.0 },
      uNoiseMap: { value: noiseTexture },
      uNoiseStrength: { value: 0.015 },
      uFreq: { value: 0.5 },
      uAmp: { value: 1.7 },
      uSpeed: { value: 0.05 },
      uSize: { value: 0.0 },
      uMaxAge: { value: 3.0 },
      uColor: { value: new THREE.Color(0.78, 1.0, 0.18) },
      uColorCore: { value: new THREE.Color(0.91, 1.0, 0.82) },
      uOpacity: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    this.mesh = new THREE.InstancedMesh(geometry, material, this.count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < this.count; i++) {
      dummy.updateMatrix();
      this.mesh.setMatrixAt(i, dummy.matrix);
    }

    this.scene.add(this.mesh);
  }

  initEvents() {
    this.resizeHandler = () => {
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener('resize', this.resizeHandler);

    this.mouseHandler = (e: MouseEvent) => {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(this.camera.position, {
        x: 4 + this.mouseX * 0.05,
        y: -this.mouseY * 0.05,
        duration: 1,
        ease: 'power1.inOut',
        overwrite: true,
      });
    };
    window.addEventListener('mousemove', this.mouseHandler);
  }

  startAnimation() {
    // Scale-in animation
    gsap.to(this.uniforms.uSize, {
      value: 1,
      duration: 2,
      ease: 'expo.out',
    });

    // Start dissolve cycle
    this.startDissolveCycle();

    // Render loop via GSAP ticker
    this.tickerCallback = () => {
      if (!this.isActive) return;
      this.uniforms.uTime.value = this.clock.getElapsedTime();
      this.renderer.render(this.scene, this.camera);
    };
    gsap.ticker.add(this.tickerCallback);
  }

  startDissolveCycle() {
    this.uniforms.uDissolveProgress.value = 0;
    this.dissolveTween = gsap.to(this.uniforms.uDissolveProgress, {
      value: 1,
      duration: 10,
      ease: 'none',
      onComplete: () => {
        this.randomizePositions();
        this.startDissolveCycle();
      },
    });
  }

  randomizePositions() {
    const positions = this.mesh.geometry.attributes.aInitialPosition.array as Float32Array;
    for (let i = 0; i < this.count; i++) {
      const u = i / this.count;
      const angle = u * Math.PI * 20;
      positions[i * 3] = Math.cos(angle) + 2.5;
      positions[i * 3 + 1] = (u - 0.5) * 7;
      positions[i * 3 + 2] = Math.sin(angle);
    }
    this.mesh.geometry.attributes.aInitialPosition.needsUpdate = true;
  }

  pause() {
    this.isActive = false;
    gsap.to(this.container, { opacity: 0, duration: 0.5 });
    if (this.dissolveTween) this.dissolveTween.pause();
  }

  resume() {
    this.isActive = true;
    gsap.to(this.container, { opacity: 1, duration: 0.5 });
    if (this.dissolveTween) this.dissolveTween.resume();
  }

  destroy() {
    this.isActive = false;
    if (this.tickerCallback) gsap.ticker.remove(this.tickerCallback);
    if (this.dissolveTween) this.dissolveTween.kill();
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.mouseHandler) window.removeEventListener('mousemove', this.mouseHandler);
    this.renderer.dispose();
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.ShaderMaterial).dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
