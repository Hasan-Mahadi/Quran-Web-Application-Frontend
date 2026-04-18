'use client';

import { Heart, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Quran App. All rights reserved.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-gray-500 dark:text-gray-400 text-sm">Developed with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">by</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Hasan Mahadi
            </span>
            <Code className="w-4 h-4 text-gray-400" />
          </motion.div>
          
          <div className="flex gap-4">
            <a 
              href="https://github.com/Hasan-Mahadi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm"
            >
              GitHub
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}