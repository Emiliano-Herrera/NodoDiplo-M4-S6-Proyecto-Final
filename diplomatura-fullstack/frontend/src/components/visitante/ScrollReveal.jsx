import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'up', 
  className = '',
  once = true,
  threshold = 0.2
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, threshold, amount: 0.2 });

  const animations = {
    up: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotateX: 90 },
      visible: { opacity: 1, rotateX: 0 },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  };

  const animation = animations[direction] || animations.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animation}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98], // Curva de easing más suave
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}