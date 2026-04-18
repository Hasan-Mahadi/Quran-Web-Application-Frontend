'use client';

import { motion } from 'framer-motion';
import { Code, Heart } from 'lucide-react';
import { useState } from 'react';

export default function DeveloperBadge() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="https://github.com/Hasan-Mahadi"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <Code className="w-4 h-4" />
        <span className="text-sm font-medium">Developer</span>
        {isHovered && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1"
          >
            <Heart className="w-3 h-3 fill-red-500 text-red-500" />
            <span className="text-xs">Feed Back To Hasan Mahadi</span>
          </motion.div>
        )}
      </div>
    </motion.a>
  );
}