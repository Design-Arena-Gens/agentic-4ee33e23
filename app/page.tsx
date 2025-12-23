'use client';

import { useState, useEffect } from 'react';
import { generateDailySEOData, regenerateSEOData, SEOData } from '@/lib/seoGenerator';

export default function Home() {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSeoData(generateDailySEOData());
    setIsLoading(false);
  }, []);

  const handleRegenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSeoData(regenerateSEOData());
      setIsLoading(false);
    }, 500);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading || !seoData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-800 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Summoning today&apos;s horror SEO data...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">💀</span>
            <h1 className="text-3xl md:text-5xl font-bold horror-glow flicker-text">
              Horror YouTube SEO Agent
            </h1>
            <span className="text-4xl">👻</span>
          </div>
          <p className="text-gray-400 text-lg mb-2">
            Daily High-Ranking, Viral & Searchable SEO Data
          </p>
          <p className="text-red-700 text-sm">
            🇺🇸 Optimized for USA Audience | Horror • Paranormal • Scary Stories
          </p>
        </header>

        {/* Date & Topic Banner */}
        <div className="card-horror rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Today&apos;s Date</p>
              <p className="text-xl font-semibold text-white">{seoData.date}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm uppercase tracking-wider">Topic of the Day</p>
              <p className="text-xl font-semibold text-red-500 horror-glow">{seoData.topicOfTheDay}</p>
            </div>
          </div>
          <div className="blood-line my-4"></div>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-800">
              🎯 Search Volume: {seoData.searchVolume}
            </span>
            <span className="px-3 py-1 rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-800">
              📊 Competition: {seoData.competitionLevel}
            </span>
          </div>
        </div>

        {/* Regenerate Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleRegenerate}
            className="copy-btn px-8 py-3 text-lg flex items-center gap-2 mx-auto"
          >
            <span>🔄</span>
            <span>Generate New Content</span>
          </button>
        </div>

        {/* Keywords Section */}
        <section className="card-horror rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🔑</span> Viral Ranking Keywords (10)
            </h2>
            <button
              onClick={() => copyToClipboard(seoData.keywords.join(', '), 'keywords')}
              className="copy-btn text-sm"
            >
              {copiedField === 'keywords' ? '✓ Copied!' : '📋 Copy All'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {seoData.keywords.map((keyword, index) => (
              <span
                key={index}
                className="keyword-tag cursor-pointer"
                onClick={() => copyToClipboard(keyword, `keyword-${index}`)}
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>

        {/* Titles Section */}
        <section className="card-horror rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📺</span> SEO Optimized YouTube Titles (3)
            </h2>
            <button
              onClick={() => copyToClipboard(seoData.titles.join('\n\n'), 'titles')}
              className="copy-btn text-sm"
            >
              {copiedField === 'titles' ? '✓ Copied!' : '📋 Copy All'}
            </button>
          </div>
          <div className="space-y-3">
            {seoData.titles.map((title, index) => (
              <div
                key={index}
                className="p-4 bg-black/30 rounded-lg border border-gray-800 hover:border-red-900 transition-all cursor-pointer group"
                onClick={() => copyToClipboard(title, `title-${index}`)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">{index + 1}.</span>
                  <p className="text-white group-hover:text-red-400 transition-colors">{title}</p>
                </div>
                <p className="text-xs text-gray-600 mt-2 ml-6">Click to copy</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shorts Titles Section */}
        <section className="card-horror rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📱</span> YouTube Shorts Titles (5)
            </h2>
            <button
              onClick={() => copyToClipboard(seoData.shortsTitles.join('\n'), 'shorts')}
              className="copy-btn text-sm"
            >
              {copiedField === 'shorts' ? '✓ Copied!' : '📋 Copy All'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {seoData.shortsTitles.map((title, index) => (
              <div
                key={index}
                className="p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-red-900 transition-all cursor-pointer"
                onClick={() => copyToClipboard(title, `short-${index}`)}
              >
                <p className="text-gray-300 text-sm">{title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Description Section */}
        <section className="card-horror rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📝</span> SEO Description (150-200 words)
            </h2>
            <button
              onClick={() => copyToClipboard(seoData.description, 'description')}
              className="copy-btn text-sm"
            >
              {copiedField === 'description' ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-gray-800">
            <pre className="whitespace-pre-wrap text-gray-300 text-sm font-sans leading-relaxed">
              {seoData.description}
            </pre>
          </div>
        </section>

        {/* Tags Section */}
        <section className="card-horror rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🏷️</span> SEO Tags ({seoData.tags.length})
            </h2>
            <button
              onClick={() => copyToClipboard(seoData.tags.join(', '), 'tags')}
              className="copy-btn text-sm"
            >
              {copiedField === 'tags' ? '✓ Copied!' : '📋 Copy All'}
            </button>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-gray-800">
            <p className="text-gray-300 text-sm leading-relaxed">
              {seoData.tags.join(', ')}
            </p>
          </div>
        </section>

        {/* Hashtags Section */}
        <section className="card-horror rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>#️⃣</span> Trending Hashtags (5)
            </h2>
            <button
              onClick={() => copyToClipboard(seoData.hashtags.join(' '), 'hashtags')}
              className="copy-btn text-sm"
            >
              {copiedField === 'hashtags' ? '✓ Copied!' : '📋 Copy All'}
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {seoData.hashtags.map((hashtag, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-lg bg-red-900/30 text-red-400 border border-red-800 cursor-pointer hover:bg-red-900/50 transition-all"
                onClick={() => copyToClipboard(hashtag, `hashtag-${index}`)}
              >
                {hashtag}
              </span>
            ))}
          </div>
        </section>

        {/* Optimization Tips */}
        <section className="card-horror rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <span>💡</span> Today&apos;s Optimization Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-black/30 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-red-400 mb-2">🔍 YouTube Search</h3>
              <p className="text-gray-400 text-sm">Use exact keywords in first 60 characters of title. Include primary keyword in first line of description.</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-red-400 mb-2">📊 Suggested Videos</h3>
              <p className="text-gray-400 text-sm">Match tags with top performing videos in your niche. Use similar thumbnail styles and title patterns.</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-red-400 mb-2">🏠 Browse Features</h3>
              <p className="text-gray-400 text-sm">Post during peak hours (6-9 PM EST). High CTR in first hour boosts browse feature placement.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 text-sm py-8">
          <div className="blood-line mb-6"></div>
          <p>🎃 Horror YouTube SEO Agent | Fresh Content Generated Daily</p>
          <p className="mt-2">Optimized for: YouTube Search • Suggested Videos • Browse Features</p>
          <p className="mt-4 text-xs text-gray-700">
            Power Words Used: True Story • Real Incident • Scary • Terrifying • Based on True Events • Haunted • Police Report
          </p>
        </footer>
      </div>
    </main>
  );
}
