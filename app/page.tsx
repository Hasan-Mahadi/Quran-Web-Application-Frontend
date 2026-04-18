// "use client";

// import { useState, useEffect } from "react";
// import { api } from "@/services/api";
// import { Surah } from "@/types";
// import SurahCard from "@/components/SurahCard";
// import SettingsPanel from "@/components/SettingsPanel";
// import SearchBar from "@/components/SearchBar";
// import { Settings } from "lucide-react";

// export default function Home() {
//   const [surahs, setSurahs] = useState<Surah[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);

//   useEffect(() => {
//     const fetchSurahs = async () => {
//       try {
//         console.log("Fetching surahs...");
//         const data = await api.getSurahs();
//         console.log("Received surahs:", data.length);
//         setSurahs(data);
//         setError(null);
//       } catch (error) {
//         console.error("Failed to fetch surahs:", error);
//         setError(
//           "Failed to load surahs. Please make sure the backend server is running on port 5000",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSurahs();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//               Holy Quran
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">Loading...</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(12)].map((_, i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//                   <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
//                   <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-6">
//           <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
//               Connection Error
//             </h2>
//             <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Please make sure:
//             </p>
//             <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 list-disc list-inside">
//               <li>Backend server is running on port 5000</li>
//               <li>Run: cd ../backend && npm run dev</li>
//               <li>Check console for more details</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//         <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             {/* <div className="flex flex-col items-center gap-4">
//               <div className="text-center sm:text-left">
//                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                   Holy Quran
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
//                   Read and explore the divine guidance
//                 </p>
//               </div>
//               <div className="flex items-center gap-3 w-full sm:w-auto">
//                 <div className="w-full max-w-4xl mx-auto">
//                   <SearchBar />
//                 </div>
//                 <button
//                   onClick={() => setIsSettingsOpen(true)}
//                   className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                   aria-label="Settings"
//                 >
//                   <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
//                 </button>
//               </div>
//             </div> */}

//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               {/* LEFT: Title */}
//               <div className="text-center sm:text-left flex-1">
//                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                   Holy Quran
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
//                   Read & explore the guidance of the Quran From Allah.
//                 </p>
//               </div>

//               {/* CENTER: Search */}
//               <div className="w-full sm:max-w-xl flex-1 flex justify-center ">
//                 <SearchBar />
//               </div>

//               {/* RIGHT: Settings */}
//               <div className="flex justify-end flex-1">
//                 <button
//                   onClick={() => setIsSettingsOpen(true)}
//                   className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                 >
//                   <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {surahs.map((surah) => (
//               <SurahCard key={surah.id} surah={surah} />
//             ))}
//           </div>
//         </main>
//       </div>

//       <SettingsPanel
//         isOpen={isSettingsOpen}
//         onClose={() => setIsSettingsOpen(false)}
//       />
//     </>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/services/api';
import { Surah } from '@/types';
import SurahCard from '@/components/SurahCard';
import SettingsPanel from '@/components/SettingsPanel';
import SearchBar from '@/components/SearchBar';
import { Settings, Menu, X, BookMarked, BookOpen, Sparkles } from 'lucide-react';

export default function Home() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const data = await api.getSurahs();
        setSurahs(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch surahs:', error);
        setError('Failed to load surahs. Please make sure the backend server is running on port 5000');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-emerald-600 mx-auto"></div>
            <BookMarked className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-600 animate-pulse" />
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-arabic-uthmanic text-lg">Loading the Holy Quran...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 backdrop-blur-sm">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-3">Connection Error</h2>
            <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
            <div className="text-left text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-black/20 rounded-lg p-4">
              <p className="font-semibold mb-2">Quick Fix:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Start backend: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">cd backend && npm run dev</code></li>
                <li>Ensure port 5000 is not blocked</li>
                <li>Check console for details</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
        {/* Animated Background Pattern */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Logo and Title */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                    <BookMarked className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold gradient-text">
                    Quran App
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Read & Reflect</p>
                </div>
              </motion.div>

              {/* Search Bar - Centered */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full lg:max-w-2xl"
              >
                <SearchBar onSearch={setSearchQuery} />
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">114 Chapters</span>
                <Sparkles className="w-4 h-4" />
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-bold mb-4 font-arabic-uthmanic"
              >
                ٱلْقُرْآنَ ٱلْكَرِيم
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg lg:text-xl text-emerald-100 max-w-2xl mx-auto"
              >
                &quot;Read! And your Lord is the Most Generous&quot;
              </motion.p>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-emerald-200 mt-2"
              >
                Surah Al-Alaq 96:3
              </motion.p>
            </div>
          </div>
          
          {/* Decorative bottom curve */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-gray-50 dark:text-gray-900">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
            </svg>
          </div>
        </section>

        {/* Surah Grid */}
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-center"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing results for: <span className="font-semibold text-emerald-600 dark:text-emerald-400">&quot;{searchQuery}&quot;</span>
              </p>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {surahs.map((surah, index) => (
              <SurahCard key={surah.id} surah={surah} index={index} />
            ))}
          </div>
          
          {/* Footer Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold gradient-text">{surahs.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Chapters</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">6,236</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Verses</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">30</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Juz</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">14</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Sajdah</div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}