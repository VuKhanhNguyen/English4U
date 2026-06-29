"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/providers/theme-provider";

// --- MODE A: FLOATING LETTER CONSTELLATION ---
interface ConstellationItemProps {
  word: string;
  position: [number, number, number];
  onHover: (word: string | null) => void;
}

const ConstellationItem = ({ word, position, onHover }: ConstellationItemProps) => {
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();

  useFrame((state) => {
    if (!textRef.current) return;
    const t = state.clock.getElapsedTime();
    textRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.12;
    
    const targetScale = hovered ? 1.3 : 1.0;
    textRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const color = theme === "dark" 
    ? (hovered ? "#ffa773" : "#e2c161") 
    : (hovered ? "#000000" : "#4e4d4d");

  return (
    <group 
      ref={textRef} 
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(word);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <Text
        fontSize={0.22}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {word}
      </Text>
    </group>
  );
};

const ConstellationScene = ({ onHover }: { onHover: (word: string | null) => void }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const words = useMemo(() => [
    "STRUCTURE", "GRAMMAR", "VOCABULARY", "COLLOCATION", "PHRASAL",
    "VERB", "FORMATION", "COGNITIVE", "DESTINATION", "ENGLISH",
    "LEARNING", "FLUENCY", "IDIOMS", "EXPRESSION", "SYNTAX",
    "CLAUSE", "TENSE", "MODAL", "PASSIVE", "INFINITIVE"
  ], []);

  const items = useMemo(() => {
    const arr: { word: string; pos: [number, number, number] }[] = [];
    const count = words.length;
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4; 
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr.push({ word: words[i], pos: [x, y, z] });
    }
    return arr;
  }, [words]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, idx) => (
        <ConstellationItem 
          key={idx} 
          word={item.word} 
          position={item.pos} 
          onHover={onHover}
        />
      ))}
    </group>
  );
};

// --- MODE B: 3D GLASSMORPHIC BOOK ---
const GlassmorphicBook = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15 + Math.PI; 
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.04;
    }
  });

  const glassColor = theme === "dark" ? "#e2c161" : "#cfdaf5";
  const textColor = theme === "dark" ? "#ffa773" : "#242424";

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Light coming from within */}
      <pointLight position={[0, 0, 0.4]} intensity={2} color={glassColor} distance={4} />
      
      {/* Left Page */}
      <mesh position={[-0.7, 0, 0]}>
        <boxGeometry args={[1.3, 1.8, 0.06]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={0.9}
          roughness={0.15}
          thickness={1.0}
          clearcoat={1.0}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Right Page */}
      <mesh position={[0.7, 0, 0]}>
        <boxGeometry args={[1.3, 1.8, 0.06]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={0.9}
          roughness={0.15}
          thickness={1.0}
          clearcoat={1.0}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Book spine */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[0.08, 1.85, 0.08]} />
        <meshBasicMaterial color={theme === "dark" ? "#ffa773" : "#4e4d4d"} />
      </mesh>

      {/* Text Content */}
      <Text
        position={[-0.7, 0, 0.04]}
        fontSize={0.09}
        color={textColor}
        maxWidth={1.1}
        anchorX="center"
        anchorY="middle"
      >
        {"DESTINATION B2:\n\n* Grammar rules\n* Word formations\n* Phrasal verbs\n* Collocations"}
      </Text>

      <Text
        position={[0.7, 0, 0.04]}
        fontSize={0.09}
        color={textColor}
        maxWidth={1.1}
        anchorX="center"
        anchorY="middle"
      >
        {"COGNITIVE RETENTION:\n\nStructured grids\nreduce cognitive\nload for English\nlearners."}
      </Text>
    </group>
  );
};

// --- MODE C: 3D POINT CLOUD GLOBE ---
const PointCloudGlobe = () => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();}

// --- CUSTOM EARTH TEXTURE GENERATOR (100% Procedural & Offline-friendly) ---
const useEarthTexture = (theme: string) => {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // 1. Draw Ocean Base
    if (theme === "dark") {
      ctx.fillStyle = "#040612"; // Obsidian dark space void
    } else {
      ctx.fillStyle = "#1e3f66"; // Deep blue ocean
    }
    ctx.fillRect(0, 0, 1024, 512);

    // Continent coordinate definitions (scaled equirectangular map)
    const greenland = [[310, 40], [360, 35], [370, 70], [330, 95], [305, 75]];
    const northAmerica = [[80, 80], [120, 60], [180, 50], [290, 60], [300, 100], [280, 140], [295, 180], [250, 220], [225, 255], [215, 255], [210, 215], [195, 195], [160, 200], [130, 170], [105, 180], [100, 140], [70, 120]];
    const southAmerica = [[225, 255], [240, 255], [280, 280], [315, 310], [285, 390], [240, 450], [230, 450], [220, 390], [210, 310], [220, 280]];
    const eurasia = [[380, 70], [420, 50], [500, 50], [600, 40], [700, 50], [800, 40], [900, 50], [950, 80], [930, 140], [890, 170], [910, 200], [870, 240], [800, 230], [770, 250], [730, 255], [710, 220], [670, 225], [630, 240], [590, 220], [510, 190], [460, 195], [440, 150], [390, 120]];
    const africa = [[460, 195], [510, 190], [530, 210], [580, 200], [600, 220], [620, 270], [590, 330], [550, 395], [535, 395], [490, 320], [455, 280], [445, 230]];
    const australia = [[800, 310], [850, 290], [900, 310], [920, 350], [880, 400], [810, 380], [795, 340]];

    const drawContinent = (pts: number[][], baseColor: string, strokeColor?: string) => {
      if (pts.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
      ctx.closePath();
      
      if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 14;
        ctx.stroke();
        ctx.lineWidth = 6;
        ctx.strokeStyle = theme === "dark" ? "rgba(255, 167, 115, 0.4)" : "#6fbce7";
        ctx.stroke();
      }
      
      ctx.fillStyle = baseColor;
      ctx.fill();
    };

    // Style configuration
    let landColor = "#52b742"; // lush green
    let highlightColor = "#f0df8e"; // beige-sand
    let strokeColor = "#2c5c8f"; // shallow water shelf
    let iceColor = "#ffffff";

    if (theme === "dark") {
      landColor = "#0d111d"; // dark obsidian-slate
      highlightColor = "#e2c161"; // stardust gold
      strokeColor = "rgba(226, 193, 97, 0.25)"; // glowing gold outlines
      iceColor = "#f6f3f1";
    }

    // 2. Draw continents with glow strokes
    const continents = [greenland, northAmerica, southAmerica, eurasia, africa, australia];
    continents.forEach(c => drawContinent(c, landColor, strokeColor));

    // 3. Draw mountain / desert highlights inside the continents
    let mountColor = highlightColor;
    if (theme !== "dark") mountColor = "#b89047"; // light brown for land details in light mode

    // North America highlights
    drawContinent([[120, 95], [180, 90], [170, 140], [130, 130]], mountColor);
    // South America highlights
    drawContinent([[230, 280], [250, 280], [240, 350], [230, 350]], mountColor);
    // Africa highlights (Sahara)
    drawContinent([[480, 210], [560, 210], [570, 240], [480, 240]], theme === "dark" ? highlightColor : "#e5c158");
    // Eurasia highlights (Himalayas/Gobi)
    drawContinent([[620, 120], [740, 110], [780, 140], [640, 145]], mountColor);
    // Australia highlights (Outback)
    drawContinent([[830, 320], [880, 320], [870, 360], [820, 350]], theme === "dark" ? highlightColor : "#e5c158");

    // 4. Draw Antarctica polar ice cap at the bottom
    ctx.fillStyle = iceColor;
    ctx.fillRect(0, 460, 1024, 52);

    // Create CanvasTexture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, [theme]);
};

// --- MODE C: 3D POINT CLOUD GLOBE ---
const SolidEarthGlobe = () => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const earthTexture = useEarthTexture(theme);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y = t * 0.05;
      globeGroupRef.current.rotation.x = Math.sin(t * 0.06) * 0.03;
    }
  });

  const primaryColor = theme === "dark" ? "#e2c161" : "#3b82f6";
  const secondaryColor = theme === "dark" ? "#ffa773" : "#3d3d3d";
  const glowColor = theme === "dark" ? "#e2c161" : "#60a5fa";

  return (
    <group ref={globeGroupRef}>
      {/* Light pointing directly at globe */}
      <pointLight position={[3, 3, 3]} intensity={1.5} color={glowColor} distance={8} />

      {/* Solid Earth Sphere */}
      <mesh>
        <sphereGeometry args={[2.0, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.65}
          metalness={theme === "dark" ? 0.25 : 0.05}
        />
      </mesh>

      {/* Nodes / Connections */}
      <mesh position={[0.2, 1.5, 1.25]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={secondaryColor} />
      </mesh>
      <mesh position={[1.4, 0.8, -1.0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={secondaryColor} />
      </mesh>
      <mesh position={[-1.2, 0.5, 1.4]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={secondaryColor} />
      </mesh>

      {/* Atmosphere outer glow */}
      <mesh>
        <sphereGeometry args={[2.08, 32, 32]} />
        <meshPhysicalMaterial
          color={primaryColor}
          transmission={0.9}
          roughness={0.2}
          thickness={0.5}
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
};

// --- MAIN CANVAS CONTAINER ---
interface ThreeDCanvasProps {
  mode: "constellation" | "book" | "globe";
  onHoverWord: (word: string | null) => void;
}

export default function ThreeDCanvas({ mode, onHoverWord }: ThreeDCanvasProps) {
  const { theme } = useTheme();
  const [canvasKey, setCanvasKey] = useState(0);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    return () => {
      // Force lose WebGL context on unmount to prevent leaks, checking if context is active
      if (glRef.current) {
        try {
          const glContext = glRef.current.getContext();
          if (glContext && typeof glContext.isContextLost === "function" && !glContext.isContextLost()) {
            const loseContextExt = glContext.getExtension('WEBGL_lose_context');
            if (loseContextExt) {
              loseContextExt.loseContext();
            }
          }
          glRef.current.dispose();
        } catch (err) {
          console.error("Failed to release WebGL context in ThreeDCanvas:", err);
        }
      }
    };
  }, [canvasKey]);

  return (
    <div className="w-full h-full relative" key={canvasKey}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          glRef.current = gl;
          const canvasEl = gl.domElement;
          const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn("ThreeDCanvas WebGL Context Lost. Remounting canvas...");
            canvasEl.removeEventListener("webglcontextlost", handleContextLost);
            setCanvasKey((prev) => prev + 1);
          };
          canvasEl.addEventListener("webglcontextlost", handleContextLost, false);
        }}
      >
        <ambientLight intensity={theme === "dark" ? 0.7 : 0.9} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} />
        <pointLight position={[-4, -4, -4]} intensity={0.4} />

        {mode === "constellation" && (
          <ConstellationScene onHover={onHoverWord} />
        )}
        
        {mode === "book" && (
          <GlassmorphicBook />
        )}

        {mode === "globe" && (
          <SolidEarthGlobe />
        )}

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.3}
        />
      </Canvas>
    </div>
  );
}

