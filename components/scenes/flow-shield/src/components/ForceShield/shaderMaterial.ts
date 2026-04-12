import * as THREE from 'three'
import { MAX_HITS } from './consts'

// ── Vertex shader ─────────────────────────────────────────────────────────────
export const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vObjPos;

  void main() {
    vObjPos  = position;
    vNormal  = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`

// ── Fragment shader ───────────────────────────────────────────────────────────
export const fragmentShader = /* glsl */ `
  #define MAX_HITS 6

  uniform float uTime;
  uniform vec3  uColor;
  uniform float uLife;
  uniform float uHexScale;
  uniform float uEdgeWidth;
  uniform float uFresnelPower;
  uniform float uFresnelStrength;
  uniform float uOpacity;
  uniform float uReveal;
  uniform float uFlashSpeed;
  uniform float uFlashIntensity;
  uniform float uNoiseScale;
  uniform vec3  uNoiseEdgeColor;
  uniform float uNoiseEdgeWidth;
  uniform float uNoiseEdgeIntensity;
  uniform float uNoiseEdgeSmoothness;
  uniform float uHexOpacity;
  uniform float uShowHex;
  uniform float uFlowScale;
  uniform float uFlowSpeed;
  uniform float uFlowIntensity;
  uniform vec3  uHitPos[MAX_HITS];
  uniform float uHitTime[MAX_HITS];
  uniform float uHitRingSpeed;
  uniform float uHitRingWidth;
  uniform float uHitMaxRadius;
  uniform float uHitDuration;
  uniform float uHitIntensity;
  uniform float uHitImpactRadius;
  uniform float uFadeStart;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vObjPos;

  // ── Simplex 3D noise ────────────────────────────────────────────────────────
  vec3 mod289v3(vec3 x){ return x - floor(x*(1./289.))*289.; }
  vec4 mod289v4(vec4 x){ return x - floor(x*(1./289.))*289.; }
  vec4 permute(vec4 x){ return mod289v4(((x*34.)+1.)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1./6., 1./3.);
    const vec4 D = vec4(0., 0.5, 1., 2.);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1. - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289v3(i);
    vec4 p = permute(permute(permute(
      i.z+vec4(0.,i1.z,i2.z,1.))
     +i.y+vec4(0.,i1.y,i2.y,1.))
     +i.x+vec4(0.,i1.x,i2.x,1.));
    float n_ = 0.142857142857;
    vec3  ns = n_*D.wyz - D.xzx;
    vec4 j   = p - 49.*floor(p*ns.z*ns.z);
    vec4 x_  = floor(j*ns.z);
    vec4 y_  = floor(j - 7.*x_);
    vec4 x   = x_*ns.x + ns.yyyy;
    vec4 y   = y_*ns.x + ns.yyyy;
    vec4 h   = 1. - abs(x) - abs(y);
    vec4 b0  = vec4(x.xy, y.xy);
    vec4 b1  = vec4(x.zw, y.zw);
    vec4 s0  = floor(b0)*2.+1.;
    vec4 s1  = floor(b1)*2.+1.;
    vec4 sh  = -step(h, vec4(0.));
    vec4 a0  = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1  = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0  = vec3(a0.xy, h.x);
    vec3 p1  = vec3(a0.zw, h.y);
    vec3 p2  = vec3(a1.xy, h.z);
    vec3 p3  = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m = max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m = m*m;
    return 42.*dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  // ── Life color: uColor (full) → red (empty) ────────────────────────────────
  vec3 lifeColor(float life){
    return mix(vec3(1.0, 0.08, 0.04), uColor, life);
  }

  // ── Hex grid ────────────────────────────────────────────────────────────────
  float hexPattern(vec2 p){
    p *= uHexScale;
    const vec2 s = vec2(1., 1.7320508);
    vec4 hC = floor(vec4(p, p-vec2(0.5,1.))/s.xyxy) + 0.5;
    vec4 h  = vec4(p-hC.xy*s, p-(hC.zw+0.5)*s);
    vec2 cell = (dot(h.xy,h.xy) < dot(h.zw,h.zw)) ? h.xy : h.zw;
    cell = abs(cell);
    float d = max(dot(cell, s*0.5), cell.x);
    return smoothstep(0.5-uEdgeWidth, 0.5, d);
  }

  vec2 hexCellId(vec2 p){
    p *= uHexScale;
    const vec2 s = vec2(1., 1.7320508);
    vec4 hC = floor(vec4(p, p-vec2(0.5,1.))/s.xyxy) + 0.5;
    vec4 h  = vec4(p-hC.xy*s, p-(hC.zw+0.5)*s);
    return (dot(h.xy,h.xy) < dot(h.zw,h.zw)) ? hC.xy : hC.zw+0.5;
  }

  float cellFlash(vec2 cellId){
    float rnd   = fract(sin(dot(cellId, vec2(127.1,311.7)))*43758.5453);
    float phase = rnd * 6.2831;
    float speed = 0.5 + rnd * 1.5;
    return smoothstep(0.6, 1.0, sin(uTime*uFlashSpeed*speed+phase)) * uFlashIntensity;
  }

  void main(){
    // ── Reveal / dissolve ─────────────────────────────────────────────────────
    float noise = snoise(vObjPos * uNoiseScale) * 0.5 + 0.5;
    float revealMask = smoothstep(uReveal - uNoiseEdgeWidth, uReveal, noise);
    if (revealMask < 0.001) discard;

    float innerFade  = mix(0.98, 0.15, uNoiseEdgeSmoothness);
    float edgeLow    = smoothstep(uReveal-uNoiseEdgeWidth, uReveal-uNoiseEdgeWidth*innerFade, noise);
    float edgeHigh   = smoothstep(uReveal-uNoiseEdgeWidth*0.15, uReveal, noise);
    float revealEdge = edgeLow * (1.0 - edgeHigh);

    // ── Fresnel ───────────────────────────────────────────────────────────────
    float fresnel = pow(1.0 - dot(vNormal, vViewDir), uFresnelPower) * uFresnelStrength;

    // ── Flow noise ────────────────────────────────────────────────────────────
    float t   = uTime * uFlowSpeed;
    float fn1 = snoise(vObjPos*uFlowScale + vec3(t, t*0.6, t*0.4));
    float fn2 = snoise(vObjPos*uFlowScale*2.1 + vec3(-t*0.5, t*0.9, t*0.3));
    float flowNoise = (fn1*0.6 + fn2*0.4)*0.5 + 0.5;

    // ── Hex: cube-face select + seam fade ────────────────────────────────────
    // One projection per fragment (no overlap). Near the 45° seam
    // between cube faces, hexFade drives hex opacity to 0 so neither
    // a ghost grid NOR a hard discontinuity is visible.
    //   dominance = 1.0  → face center → full hex
    //   dominance ≈ 0.71 → 45° seam   → hex fades to 0
    vec3 absN = abs(normalize(vObjPos));
    float dominance = max(absN.x, max(absN.y, absN.z));
    float hexFade   = smoothstep(0.65, 0.85, dominance);

    vec2 faceUV;
    if (absN.x >= absN.y && absN.x >= absN.z) {
      faceUV = vObjPos.yz;   // ±X face
    } else if (absN.y >= absN.z) {
      faceUV = vObjPos.xz;   // ±Y face
    } else {
      faceUV = vObjPos.xy;   // ±Z face
    }

    float hex   = hexPattern(faceUV) * hexFade;
    vec2  cId   = hexCellId(faceUV);
    float flash = cellFlash(cId) * hexFade;

    // ── Hit ring buffer ───────────────────────────────────────────────────────
    // Each slot: expanding noisy ring + initial hex highlight zone
    vec3  normPos     = normalize(vObjPos);
    float ringContrib = 0.0;
    float hexHitBoost = 0.0;

    for (int i = 0; i < MAX_HITS; i++) {
      float ht      = uHitTime[i];
      float elapsed = uTime - ht;

      // isActive: slot valid AND within lifetime
      float isActive = step(0.0, ht)
                     * step(0.0, elapsed)
                     * step(elapsed, uHitDuration);

      // Geodesic distance on the sphere surface (radians)
      float dist = acos(clamp(dot(normPos, normalize(uHitPos[i])), -1.0, 1.0));

      // Expanding ring — capped at uHitMaxRadius, fades as it reaches it
      float ringR      = min(elapsed * uHitRingSpeed, uHitMaxRadius);
      float noiseD     = snoise(normPos*5.0 + vec3(elapsed*2.0)) * 0.05;
      float ring       = smoothstep(uHitRingWidth, 0.0, abs(dist + noiseD - ringR));
      float fade       = 1.0 - smoothstep(uHitDuration*0.5, uHitDuration, elapsed);
      float radialFade = 1.0 - smoothstep(uHitMaxRadius*0.75, uHitMaxRadius, ringR);
      ringContrib     += ring * fade * radialFade * isActive;

      // Hex highlight: cells within impact radius flash on impact
      float zone     = smoothstep(uHitImpactRadius, 0.0, dist);
      float zoneFade = 1.0 - smoothstep(0.0, uHitDuration*0.35, elapsed);
      hexHitBoost   += zone * zoneFade * isActive;
    }

    ringContrib = min(ringContrib, 2.0);
    hexHitBoost = min(hexHitBoost, 1.0);

    // ── Combine ───────────────────────────────────────────────────────────────
    vec3  lColor = lifeColor(uLife);

    float effectiveHexOpacity = (uHexOpacity + hexHitBoost * uHitIntensity) * uShowHex;
    float intensity = hex * effectiveHexOpacity * (0.3 + fresnel*0.7) + fresnel*0.4 + flash * uShowHex;

    vec3 shieldColor = lColor * intensity * 2.0;
    shieldColor += lColor * (flowNoise * fresnel * uFlowIntensity);
    shieldColor += lColor * ringContrib * uHitIntensity;

    vec3 edgeColor = mix(uNoiseEdgeColor, lColor, 1.0 - uLife);
    vec3 edgeGlow  = edgeColor * revealEdge * uNoiseEdgeIntensity;

    float alpha = clamp(intensity*uOpacity*revealMask + revealEdge*uNoiseEdgeIntensity, 0.0, 1.0);

    // ── Bottom fade gradient ──────────────────────────────────────────────────
    // vObjPos.y / 1.8 normalizes Y to [-1, 1] for the sphere (radius 1.8).
    // smoothstep(-1, uFadeStart, normY): 0 at the bottom pole, 1 at uFadeStart.
    float normY = vObjPos.y / 1.8;
    alpha *= smoothstep(-1.0, uFadeStart, normY);

    gl_FragColor = vec4(shieldColor + edgeGlow, alpha);
  }
`

// ── Material factory ──────────────────────────────────────────────────────────
export function createShieldMaterial(): THREE.ShaderMaterial {
  const hitPositions = Array.from({ length: MAX_HITS }, () => new THREE.Vector3(0, 1.8, 0))
  const hitTimes = new Array(MAX_HITS).fill(-999)

  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#26aeff') },
      uLife: { value: 1.0 },
      uHexScale: { value: 3.0 },
      uEdgeWidth: { value: 0.06 },
      uFresnelPower: { value: 1.8 },
      uFresnelStrength: { value: 1.75 },
      uOpacity: { value: 0.76 },
      uReveal: { value: 1 },
      uFlashSpeed: { value: 0.6 },
      uFlashIntensity: { value: 0.11 },
      uNoiseScale: { value: 1.3 },
      uNoiseEdgeColor: { value: new THREE.Color('#26aeff') },
      uNoiseEdgeWidth: { value: 0.02 },
      uNoiseEdgeIntensity: { value: 10.0 },
      uNoiseEdgeSmoothness: { value: 0.5 },
      uHexOpacity: { value: 0.13 },
      uShowHex: { value: 1.0 },
      uFlowScale: { value: 2.4 },
      uFlowSpeed: { value: 1.13 },
      uFlowIntensity: { value: 4 },
      uHitPos: { value: hitPositions },
      uHitTime: { value: hitTimes },
      uHitRingSpeed: { value: 1.75 },
      uHitRingWidth: { value: 0.12 },
      uHitMaxRadius: { value: 0.85 },
      uHitDuration: { value: 1.8 },
      uHitIntensity: { value: 4.1 },
      uHitImpactRadius: { value: 0.3 },
      uFadeStart: { value: 0.0 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
  })
}
