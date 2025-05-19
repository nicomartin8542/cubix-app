import React from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "text-primary-600",
  className = "",
}) => {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    hidden: { y: "0%" },
    visible: {
      y: ["0%", "-50%", "0%"],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`flex items-center justify-center space-x-1 ${sizeMap[size]}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`block rounded-full ${color} ${
              size === "sm"
                ? "h-1.5 w-1.5"
                : size === "md"
                ? "h-2 w-2"
                : "h-3 w-3"
            }`}
            variants={dotVariants}
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Componente de página de carga completa
export const FullPageLoader: React.FC<{ text?: string }> = ({
  text = "Cargando...",
}) => (
  <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
    <LoadingSpinner size="lg" className="mb-4" />
    <p className="text-gray-600 dark:text-gray-300 font-medium mt-4 animate-pulse">
      {text}
    </p>
  </div>
);

// Componente de carga de botón
export const ButtonLoader: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => (
  <div className="flex items-center justify-center">
    <LoadingSpinner size={size} color="text-current" />
  </div>
);
