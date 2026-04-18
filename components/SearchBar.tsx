"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, X, Sparkles } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  initialQuery = "",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    } else if (debouncedQuery && debouncedQuery.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery)}`);
    } else if (debouncedQuery.length === 0 && pathname === "/search") {
      router.push("/");
    }
  }, [debouncedQuery, router, pathname, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query && query.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (pathname === "/search") {
      router.push("/");
    }
  };

  return (
    <motion.form
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onSubmit={handleSubmit}
      className="relative w-full"
    >
      <motion.div
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <Search
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
            isFocused ? "text-emerald-500" : "text-gray-400"
          }`}
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search the Quran..."
          className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-gray-800 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-all duration-300"
          style={{
            borderColor: isFocused ? "#10b981" : "#e5e7eb",
            boxShadow: isFocused ? "0 0 0 3px rgba(16, 185, 129, 0.1)" : "none",
          }}
          autoComplete="off"
        />

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Search tips */}
        <AnimatePresence>
          {isFocused && !query && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Sparkles className="w-3 h-3" />
                <span>Try: mercy, god, lord, paradise, believe</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.form>
  );
}
