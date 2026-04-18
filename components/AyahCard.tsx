// 'use client';

// import { Ayah } from '@/types';
// import { useSettings } from '@/hooks/useSettings';

// interface AyahCardProps {
//   ayah: Ayah;
//   index: number;
// }

// export default function AyahCard({ ayah, index }: AyahCardProps) {
//   const { settings } = useSettings();
  
//   const arabicFonts: Record<string, string> = {
//     Uthmanic: 'font-arabic-uthmanic',
//     IndoPak: 'font-arabic-indopak',
//   };
  
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 mb-4 border border-gray-200 dark:border-gray-700">
//       <div className="flex justify-between items-start mb-4">
//         <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
//           Verse {ayah.verse}
//         </span>
//       </div>
      
//       <div className={`${arabicFonts[settings.arabicFont]} text-right mb-6 leading-loose`}>
//         <p style={{ fontSize: `${settings.arabicFontSize}px` }} className="text-gray-800 dark:text-gray-200">
//           {ayah.text}
//         </p>
//       </div>
      
//       <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
//         <p style={{ fontSize: `${settings.translationFontSize}px` }} className="text-gray-600 dark:text-gray-300 leading-relaxed">
//           {ayah.translation}
//         </p>
//       </div>
//     </div>
//   );
// }


'use client';

import { motion } from 'framer-motion';
import { Ayah } from '@/types';
import { useSettings } from '@/hooks/useSettings';
import { Bookmark, Share2, Volume2, Copy } from 'lucide-react';
import { useState } from 'react';

interface AyahCardProps {
  ayah: Ayah;
  index: number;
  surahName?: string;
}

export default function AyahCard({ ayah, index, surahName }: AyahCardProps) {
  const { settings } = useSettings();
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const arabicFonts: Record<string, string> = {
    Uthmanic: 'font-arabic-uthmanic',
    IndoPak: 'font-arabic-indopak',
    Classical: 'font-arabic-classical',
  };
  
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    // Show toast notification (you can implement this)
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.02 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-300 dark:hover:border-emerald-700 overflow-hidden"
    >
      {/* Decorative verse number circle */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6">
        {/* Verse Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">{ayah.verse}</span>
              </div>
              {isHovered && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"
                />
              )}
            </div>
            
            {surahName && (
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {surahName}
              </span>
            )}
          </div>
          
          {/* Action buttons on hover */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
            className="flex gap-2"
          >
            <button
              onClick={() => copyToClipboard(ayah.text)}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
              title="Copy Arabic"
            >
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => copyToClipboard(ayah.translation)}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
              title="Copy Translation"
            >
              <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </motion.div>
        </div>
        
        {/* Arabic Text */}
        <div className={`${arabicFonts[settings.arabicFont]} text-right mb-8 leading-loose rtl`}>
          <p 
            style={{ fontSize: `${settings.arabicFontSize}px` }} 
            className="text-gray-800 dark:text-gray-200 transition-all duration-300"
          >
            {ayah.text}
          </p>
        </div>
        
        {/* Translation */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p 
            style={{ fontSize: `${settings.translationFontSize}px` }} 
            className="text-gray-600 dark:text-gray-300 leading-relaxed ltr"
          >
            {ayah.translation}
          </p>
        </div>
        
        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </motion.div>
  );
}