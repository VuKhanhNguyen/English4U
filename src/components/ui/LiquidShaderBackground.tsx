"use client";

import React, { useEffect, useRef, useState } from "react";

interface LiquidShaderBackgroundProps {
  src: string;
  distortionStrength?: number;
  chromaticAberration?: number;
  speed?: number;
  className?: string;
}

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  varying vec2 v_uv;
  void main() {
    v_uv = position * 0.5 + 0.5;
    v_uv.y = 1.0 - v_uv.y; // Flip Y for WebGL texture orientation
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec2 v_uv;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_click_pos;
  uniform float u_click_time;
  uniform float u_distortion_intensity;
  uniform float u_chromatic_aberration;
  uniform float u_speed;

  // Safe hash without floating-point overflow
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // 2D Noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  // Fractal Brownian Motion (FBM) noise - Unrolled for WebGL 1.0 compatibility
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(10.0);
    mat2 rot = mat2(0.87758, 0.47943, -0.47943, 0.87758);
    
    // Iteration 1
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
    
    // Iteration 2
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
    
    // Iteration 3
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
    
    // Iteration 4
    v += a * noise(p);
    
    return v;
  }

  void main() {
    // 1. Calculate 'background-size: cover' UV coordinates
    vec2 ratio = vec2(
      min((u_resolution.x / u_resolution.y) / (u_imageResolution.x / u_imageResolution.y), 1.0),
      min((u_resolution.y / u_resolution.x) / (u_imageResolution.y / u_imageResolution.x), 1.0)
    );
    vec2 uv = vec2(
      v_uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      v_uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // 2. Ambient fluid noise flow displacement
    vec2 flow_uv = uv * 3.5;
    float time_factor = u_time * u_speed * 0.07;
    float n1 = fbm(flow_uv + vec2(time_factor, time_factor * 0.5));
    float n2 = fbm(flow_uv - vec2(time_factor * 0.4, time_factor));
    vec2 ambient_disp = vec2(n1, n2) * 2.0 - 1.0;
    ambient_disp *= 0.02 * u_distortion_intensity;

    // 3. Interactive mouse cursor distortion ripples
    vec2 mouse_diff = v_uv - u_mouse;
    mouse_diff.x *= u_resolution.x / u_resolution.y; // Correct for aspect ratio
    float mouse_dist = length(mouse_diff);
    vec2 mouse_disp = vec2(0.0);
    
    if (mouse_dist < 0.28 && mouse_dist > 0.0001) {
      float strength = pow(1.0 - mouse_dist / 0.28, 2.5);
      // Sine wave ripples radiating from cursor
      float wave = sin(mouse_dist * 40.0 - u_time * 7.0) * 0.5 + 0.5;
      mouse_disp = normalize(mouse_diff) * wave * strength * 0.015 * u_distortion_intensity;
    }

    // 4. Interactive click shockwave wave propagation
    vec2 click_diff = v_uv - u_click_pos;
    click_diff.x *= u_resolution.x / u_resolution.y; // Correct for aspect ratio
    float click_dist = length(click_diff);
    vec2 click_disp = vec2(0.0);
    
    if (u_click_time >= 0.0 && u_click_time < 1.6 && click_dist > 0.0001) {
      float wave_front = u_click_time * 0.7; // Speed of propagation
      float width = 0.07;
      float dist_from_front = abs(click_dist - wave_front);
      
      if (dist_from_front < width) {
        float strength = 1.0 - (dist_from_front / width);
        float decay = pow(1.0 - (u_click_time / 1.6), 2.0); // Fades over time
        float wave = sin(dist_from_front * (6.2831853 / width)) * 0.5 + 0.5;
        click_disp = normalize(click_diff) * wave * strength * decay * 0.045 * u_distortion_intensity;
      }
    }

    vec2 total_disp = ambient_disp + mouse_disp + click_disp;

    // 5. Chromatic aberration sampling
    vec2 red_uv = uv + total_disp * (1.0 + u_chromatic_aberration * 0.25);
    vec2 green_uv = uv + total_disp;
    vec2 blue_uv = uv + total_disp * (1.0 - u_chromatic_aberration * 0.25);

    // Clamp coords to prevent wrap/edge bleeding artifacts
    red_uv = clamp(red_uv, 0.001, 0.999);
    green_uv = clamp(green_uv, 0.001, 0.999);
    blue_uv = clamp(blue_uv, 0.001, 0.999);

    float r = texture2D(u_texture, red_uv).r;
    float g = texture2D(u_texture, green_uv).g;
    float b = texture2D(u_texture, blue_uv).b;
    float a = texture2D(u_texture, green_uv).a;

    gl_FragColor = vec4(r, g, b, a);
  }
`;


export default function LiquidShaderBackground({
  src,
  distortionStrength = 1.0,
  chromaticAberration = 0.5,
  speed = 0.5,
  className = "",
}: LiquidShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // References to keep state across animation loop
  const stateRef = useRef({
    time: 0,
    mouse: { x: 0.5, y: 0.5 },
    targetMouse: { x: 0.5, y: 0.5 },
    clickPos: { x: -10, y: -10 },
    clickTime: 999.0, // Start inactive
    imageSize: { width: 1, height: 1 },
    canvasSize: { width: 1, height: 1 },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Initialize WebGL
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true }) ||
               canvas.getContext("experimental-webgl", { alpha: true, antialias: true }) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn("WebGL not supported by browser. Falling back to static image.");
      setWebglSupported(false);
      return;
    }

    // Helper to create & compile shaders
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        if (info) {
          console.warn("WebGL Shader compilation note:", info);
        }
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    // Link WebGL program
    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // 2. Set up Geometry Buffer (Full screen quad)
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // 3. Locate Uniforms
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uImageResolution = gl.getUniformLocation(program, "u_imageResolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uClickPos = gl.getUniformLocation(program, "u_click_pos");
    const uClickTime = gl.getUniformLocation(program, "u_click_time");
    const uDistortionIntensity = gl.getUniformLocation(program, "u_distortion_intensity");
    const uChromaticAberration = gl.getUniformLocation(program, "u_chromatic_aberration");
    const uSpeed = gl.getUniformLocation(program, "u_speed");

    // 4. Create and Bind WebGL Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set texture wrapping parameters to clamp to edge
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Upload placeholder pixel
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    );

    // Load actual background image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      
      stateRef.current.imageSize = { width: img.naturalWidth, height: img.naturalHeight };
      setImageLoaded(true);
    };
    img.src = src;

    // 5. Handling Resize and Device Pixel Ratio for performance
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Auto-throttle resolution for performance on mobile screens
      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const width = rect.width;
      const height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      gl.viewport(0, 0, canvas.width, canvas.height);
      stateRef.current.canvasSize = { width: canvas.width, height: canvas.height };
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 6. Interaction listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      stateRef.current.targetMouse = { x, y };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / rect.width;
      const y = (e.touches[0].clientY - rect.top) / rect.height;
      stateRef.current.targetMouse = { x, y };
    };

    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      stateRef.current.clickPos = { x, y };
      stateRef.current.clickTime = 0.0; // Reset timer to launch wave
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    // 7. Core Animation/Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const render = () => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Smooth mouse coordinate interpolation (lerp)
      const mouse = stateRef.current.mouse;
      const target = stateRef.current.targetMouse;
      mouse.x += (target.x - mouse.x) * 0.1;
      mouse.y += (target.y - mouse.y) * 0.1;

      // Update click shockwave time
      if (stateRef.current.clickTime < 1.6) {
        stateRef.current.clickTime += delta;
      } else {
        stateRef.current.clickTime = 999.0; // Deactivate when expired
      }

      // Increment global time
      stateRef.current.time += delta;

      // Clear Canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Upload Uniform values
      gl.uniform2f(uResolution, stateRef.current.canvasSize.width, stateRef.current.canvasSize.height);
      gl.uniform2f(uImageResolution, stateRef.current.imageSize.width, stateRef.current.imageSize.height);
      gl.uniform1f(uTime, stateRef.current.time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform2f(uClickPos, stateRef.current.clickPos.x, stateRef.current.clickPos.y);
      gl.uniform1f(uClickTime, stateRef.current.clickTime);
      gl.uniform1f(uDistortionIntensity, distortionStrength);
      gl.uniform1f(uChromaticAberration, chromaticAberration);
      gl.uniform1f(uSpeed, speed);

      // Render Quad
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 8. Graceful Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);

      // WebGL Context and resource release to prevent leaks
      try {
        gl.deleteTexture(texture);
        gl.deleteBuffer(buffer);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteProgram(program);

        const loseContextExt = gl.getExtension("WEBGL_lose_context");
        if (loseContextExt) {
          loseContextExt.loseContext();
        }
      } catch (err) {
        console.warn("Error cleaning up WebGL context:", err);
      }
    };
  }, [src, distortionStrength, chromaticAberration, speed]);

  // Fallback Rendering if WebGL is unavailable
  if (!webglSupported) {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${src})` }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden w-full h-full ${className}`}
    >
      {/* Background static image displayed while texture is loading to prevent flashing */}
      {!imageLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
          style={{ backgroundImage: `url(${src})` }}
        />
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
