"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/hooks/useSettings";
import {
  X,
  Moon,
  Sun,
  Type,
  Maximize2,
  Minimize2,
  Palette,
  Eye,
} from "lucide-react";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings } = useSettings();

  const fonts = [
    { value: "Uthmanic", label: "Uthmanic Hafs", preview: "بِسْمِ اللَّهِ" },
    { value: "IndoPak", label: "Indo-Pak", preview: "بِسْمِ اللَّهِ" },
    { value: "Classical", label: "Classical", preview: "بِسْمِ اللَّهِ" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold gradient-text">Settings</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Customize your reading experience
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Dark Mode Toggle */}
              {/* <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    {settings.darkMode ? (
                      <Moon className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Sun className="w-5 h-5 text-amber-500" />
                    )}
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Switch theme</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.darkMode ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <motion.span
                      animate={{ x: settings.darkMode ? 24 : 2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </motion.button>
                </label>
              </div> */}

              {/* Dark Mode Toggle */}
              <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <label className="flex items-center justify-between cursor-pointer">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3">
                    {settings.darkMode ? (
                      <Moon className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Sun className="w-5 h-5 text-amber-500" />
                    )}

                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        Dark Mode
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Switch theme
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE TOGGLE */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      updateSettings({ darkMode: !settings.darkMode })
                    }
                    className={`relative w-14 h-7 rounded-full transition-colors duration-300 shadow-inner ${
                      settings.darkMode ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    {/* TRACK GLOW */}
                    <span className="absolute inset-0 rounded-full opacity-20 bg-white" />

                    {/* KNOB */}
                    <motion.span
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{
                        x: settings.darkMode ? 24 : 0,
                      }}
                    />
                  </motion.button>
                </label>
              </div>

              {/* Arabic Font Selection */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-3">
                  <Palette className="w-4 h-4" />
                  <span>Arabic Font Style</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {fonts.map((font) => (
                    <motion.button
                      key={font.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateSettings({ arabicFont: font.value })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        settings.arabicFont === font.value
                          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-emerald-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">
                            {font.label}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {font.preview}
                          </p>
                        </div>
                        {settings.arabicFont === font.value && (
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Arabic Font Size */}
              <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Arabic Size
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {settings.arabicFontSize}px
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Minimize2 className="w-4 h-4 text-gray-500" />
                  <input
                    type="range"
                    min="16"
                    max="40"
                    value={settings.arabicFontSize}
                    onChange={(e) =>
                      updateSettings({
                        arabicFontSize: parseInt(e.target.value),
                      })
                    }
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${((settings.arabicFontSize - 16) / 24) * 100}%, #e5e7eb ${((settings.arabicFontSize - 16) / 24) * 100}%, #e5e7eb 100%)`,
                    }}
                  />
                  <Maximize2 className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Translation Font Size */}
              <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Translation Size
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {settings.translationFontSize}px
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Minimize2 className="w-4 h-4 text-gray-500" />
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={settings.translationFontSize}
                    onChange={(e) =>
                      updateSettings({
                        translationFontSize: parseInt(e.target.value),
                      })
                    }
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${((settings.translationFontSize - 12) / 12) * 100}%, #e5e7eb ${((settings.translationFontSize - 12) / 12) * 100}%, #e5e7eb 100%)`,
                    }}
                  />
                  <Maximize2 className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Reset Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  updateSettings({
                    arabicFont: "Uthmanic",
                    arabicFontSize: 24,
                    translationFontSize: 16,
                    darkMode: false,
                  });
                }}
                className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300"
              >
                Reset to Default
              </motion.button>

              {/* Quranic Quote */}
              <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  &quot;Indeed, this Quran guides to that which is most
                  suitable&quot;
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                  Surah Al-Isra 17:9
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
