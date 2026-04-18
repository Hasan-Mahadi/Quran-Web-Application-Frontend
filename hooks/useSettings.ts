// import { useState, useEffect } from 'react';
// import { UserSettings } from '@/types';

// const DEFAULT_SETTINGS: UserSettings = {
//   arabicFont: 'Uthmanic',
//   arabicFontSize: 24,
//   translationFontSize: 16,
//   darkMode: false,
// };

// export const useSettings = () => {
//   const [settings, setSettings] = useState<UserSettings>(() => {
//     if (typeof window === 'undefined') {
//       return DEFAULT_SETTINGS;
//     }
  
//     const savedSettings = localStorage.getItem('quran-settings');
//     return savedSettings
//       ? { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) }
//       : DEFAULT_SETTINGS;
//   });
//   const [isLoaded, setIsLoaded] = useState(false);
    
//   useEffect(() => {
//     const timeoutId = window.setTimeout(() => {
//       setIsLoaded(true);
//     }, 0);

//     return () => {
//       window.clearTimeout(timeoutId);
//     };
//   }, []);
  
//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem('quran-settings', JSON.stringify(settings));
      
//       // Apply dark mode
//       if (settings.darkMode) {
//         document.documentElement.classList.add('dark');
//       } else {
//         document.documentElement.classList.remove('dark');
//       }
//     }
//   }, [settings, isLoaded]);
  
//   const updateSettings = (newSettings: Partial<UserSettings>) => {
//     setSettings(prev => ({ ...prev, ...newSettings }));
//   };
  
//   return { settings, updateSettings, isLoaded };
// };


import { useState, useEffect } from 'react';
import { UserSettings } from '@/types';

const DEFAULT_SETTINGS: UserSettings = {
  arabicFont: 'Uthmanic',
  arabicFontSize: 24,
  translationFontSize: 16,
  darkMode: false,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_SETTINGS;
    }
    
    const savedSettings = localStorage.getItem('quran-settings');
    return savedSettings
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) }
      : DEFAULT_SETTINGS;
  });
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoaded(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);
  
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('quran-settings', JSON.stringify(settings));
      
      // Apply dark mode
      if (settings.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings, isLoaded]);
  
  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };
  
  return { settings, updateSettings, isLoaded };
};