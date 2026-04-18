// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { api } from '@/services/api';
// import { SearchResult } from '@/types';
// import SearchBar from '@/components/SearchBar';
// import Link from 'next/link';
// import { ArrowLeft } from 'lucide-react';

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const query = searchParams.get('q') || '';
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [loading, setLoading] = useState(false);
  
//   useEffect(() => {
//     const performSearch = async () => {
//       if (!query || query.length < 2) {
//         setResults([]);
//         return;
//       }
      
//       setLoading(true);
//       try {
//         const data = await api.searchAyahs(query);
//         setResults(data);
//       } catch (error) {
//         console.error('Search failed:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     performSearch();
//   }, [query]);
  
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Header */}
//       <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
//         <div className="max-w-4xl mx-auto px-4 py-6">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.back()}
//               className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <div className="flex-1">
//               <SearchBar initialQuery={query} />
//             </div>
//           </div>
//         </div>
//       </header>
      
//       {/* Results */}
//       <main className="max-w-4xl mx-auto px-4 py-12">
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
//             <p className="mt-4 text-gray-600 dark:text-gray-400">Searching...</p>
//           </div>
//         ) : results.length > 0 ? (
//           <>
//             <div className="mb-6">
//               <p className="text-gray-600 dark:text-gray-400">
//                 Found {results.length} results for &quot;{query}&quot;
//               </p>
//             </div>
//             <div className="space-y-4">
//               {results.map((result, index) => (
//                 <Link key={index} href={`/surah/${result.surahId}`}>
//                   <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer">
//                     <div className="flex justify-between items-start mb-3">
//                       <div>
//                         <h3 className="font-semibold text-gray-800 dark:text-white">
//                           Surah {result.surahName}
//                         </h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           Verse {result.verseNumber}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                       {result.translation.split(new RegExp(`(${query})`, 'gi')).map((part, i) => 
//                         part.toLowerCase() === query.toLowerCase() ? (
//                           <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 text-gray-900 dark:text-gray-100 px-0.5 rounded">
//                             {part}
//                           </mark>
//                         ) : (
//                           part
//                         )
//                       )}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </>
//         ) : query && query.length >= 2 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 dark:text-gray-400">No results found for &ldquo;{query}&ldquo;</p>
//           </div>
//         ) : null}
//       </main>
//     </div>
//   );
// }


'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { SearchResult } from '@/types';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import { Search } from "lucide-react";

// Loading component
function SearchLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      <span className="ml-3 text-gray-600 dark:text-gray-400">Searching...</span>
    </div>
  );
}

// No results component
function NoResults({ query }: { query: string }) {
  return (
    <div className="text-center py-20">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          No results found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          We couldn&#39;t find any verses matching &ldquo;{query}&quot;
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
          Try searching with different keywords or shorter terms
        </p>
      </div>
    </div>
  );
}

// Results component
function SearchResults({ results, query }: { results: SearchResult[]; query: string }) {
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 text-gray-900 dark:text-gray-100 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Found <span className="font-semibold text-emerald-600 dark:text-emerald-400">{results.length}</span> results for &ldquo;{query}&#34;
        </p>
      </div>
      
      {results.map((result, index) => (
        <Link key={index} href={`/surah/${result.surahId}`}>
          <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-full p-2">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Surah {result.surahName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Verse {result.verseNumber}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {highlightText(result.translation, query)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Main search page component
function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  useEffect(() => {
    const performSearch = async () => {
      if (!query || query.length < 2) {
        setResults([]);
        setSearched(false);
        return;
      }
      
      setLoading(true);
      setSearched(true);
      try {
        const data = await api.searchAyahs(query);
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [query]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="flex-1">
              <SearchBar initialQuery={query} />
            </div>
          </div>
        </div>
      </header>
      
      {/* Results Area */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {!query && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Search the Quran
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter keywords above to search through Quran translations
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-500">Try:</span>
              <button 
                onClick={() => router.push('/search?q=mercy')}
                className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
              >
                mercy
              </button>
              <button 
                onClick={() => router.push('/search?q=god')}
                className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
              >
                god
              </button>
              <button 
                onClick={() => router.push('/search?q=lord')}
                className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
              >
                lord
              </button>
              <button 
                onClick={() => router.push('/search?q=paradise')}
                className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
              >
                paradise
              </button>
            </div>
          </div>
        )}
        
        {searched && loading && <SearchLoading />}
        
        {searched && !loading && query && results.length === 0 && (
          <NoResults query={query} />
        )}
        
        {searched && !loading && results.length > 0 && (
          <SearchResults results={results} query={query} />
        )}
      </main>
    </div>
  );
}

// Main export with Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}