"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Surah } from "@/types";
import { BookOpen, Clock, Star, TrendingUp } from "lucide-react";

interface SurahCardProps {
  surah: Surah;
  index: number;
}

export default function SurahCard({ surah, index }: SurahCardProps) {
  const getRevelationIcon = (type: string) => {
    return type === "Meccan" ? (
      <Star className="w-3 h-3" />
    ) : (
      <Clock className="w-3 h-3" />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link href={`/surah/${surah.id}`}>
        <div className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-300 dark:hover:border-emerald-700">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-emerald-500/10 group-hover:to-emerald-500/5 transition-all duration-700" />

          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="text-emerald-600"
            >
              <path d="M50,0 L61.8,38.2 L100,50 L61.8,61.8 L50,100 L38.2,61.8 L0,50 L38.2,38.2 Z" />
            </svg>
          </div>

          <div className="relative p-6">
            {/* Header with surah number and revelation type */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">
                    {surah.id}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  {getRevelationIcon(surah.revelationType)}
                  <span>{surah.revelationType}</span>
                  <span className="mx-1">•</span>
                  <BookOpen className="w-3 h-3" />
                  <span>{surah.numberOfAyahs} verses</span>
                </div>
              </div>

              {/* Animated badge */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-emerald-50 dark:bg-emerald-900/30 rounded-full px-2 py-1"
              >
                <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
            </div>

            {/* Arabic name with calligraphy style */}
            <div className="text-right mb-3">
              <p className="text-3xl font-arabic-classical text-gray-800 dark:text-gray-200 leading-relaxed group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {surah.name}
              </p>
            </div>

            {/* English name */}
            <div className="mb-2">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {surah.englishName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {surah.englishNameTranslation}
              </p>
            </div>

            {/* Decorative line */}
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
