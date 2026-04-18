'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Surah } from '@/types';
import AyahCard from '@/components/AyahCard';
import SettingsPanel from '@/components/SettingsPanel';
import { ArrowLeft, Settings } from 'lucide-react';
import Link from 'next/link';

export default function SurahPage() {
  const params = useParams();
  const router = useRouter();
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const surahId = parseInt(params.id as string);
  
  useEffect(() => {
    const fetchSurah = async () => {
      try {
        console.log('Fetching surah:', surahId);
        const data = await api.getSurahById(surahId);
        console.log('Fetched data:', data);
        setSurah(data);
      } catch (error) {
        console.error('Failed to fetch surah:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (surahId) {
      fetchSurah();
    }
  }, [surahId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!surah) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Surah not found</h2>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </header>
        
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-2">{surah.englishName}</h1>
            <p className="text-xl text-emerald-100 mb-2">{surah.name}</p>
            <p className="text-emerald-100">
              {surah.englishNameTranslation} • {surah.revelationType} • {surah.numberOfAyahs} Verses
            </p>
          </div>
        </div>
        
        <main className="max-w-4xl mx-auto px-4 py-12">
          {surah.ayahs?.map((ayah, index) => (
            <AyahCard key={index} ayah={ayah} index={index} />
          ))}
        </main>
      </div>
      
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}