import React, { useRef, useState } from 'react';

interface ProductImage3DProps {
  emoji: string;
  className?: string;
  intensity?: number; // 0-1, default 0.3
  scale?: number; // default 1.05
  showShadow?: boolean; // default true
}

export default function ProductImage3D({ 
  emoji, 
  className = '', 
  intensity = 0.3,
  scale = 1.05,
  showShadow = true
}: ProductImage3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateY = (mouseX / (rect.width / 2)) * 15 * intensity;
    const rotateX = -(mouseY / (rect.height / 2)) * 15 * intensity;
    
    // Calculate glare position (percentage)
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setTransform('');
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Touch support for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;

    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const touchX = touch.clientX - centerX;
    const touchY = touch.clientY - centerY;
    
    const rotateY = (touchX / (rect.width / 2)) * 15 * intensity;
    const rotateX = -(touchY / (rect.height / 2)) * 15 * intensity;
    
    const glareX = ((touch.clientX - rect.left) / rect.width) * 100;
    const glareY = ((touch.clientY - rect.top) / rect.height) * 100;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleTouchEnd = () => {
    setTransform('');
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: transform,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic shadow */}
      {showShadow && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovering ? 0.3 : 0,
            boxShadow: `
              ${(glarePosition.x - 50) * 0.3}px ${(glarePosition.y - 50) * 0.3}px 30px rgba(0,0,0,0.3),
              ${(glarePosition.x - 50) * 0.1}px ${(glarePosition.y - 50) * 0.1}px 10px rgba(0,0,0,0.2)
            `,
          }}
        />
      )}
      
      {/* Glare/shine effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)`,
        }}
      />
      
      {/* Edge highlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 0.5 : 0,
          background: `linear-gradient(${
            Math.atan2(glarePosition.y - 50, glarePosition.x - 50) * (180 / Math.PI) + 90
          }deg, rgba(255,255,255,0.3) 0%, transparent 50%)`,
        }}
      />
      
      {/* Content */}
      <div 
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <span 
          className="text-4xl sm:text-5xl select-none transition-transform duration-200"
          style={{
            transform: isHovering ? 'translateZ(30px) scale(1.05)' : 'translateZ(0)',
            filter: isHovering ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' : 'none',
          }}
        >
          {emoji}
        </span>
      </div>
    </div>
  );
}
