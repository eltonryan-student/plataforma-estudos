'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ContentItem } from '../../../types';

export default function StudyPage() {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const saved = localStorage.getItem('study_contents');
    if (saved) {
      const contents: ContentItem[] = JSON.parse(saved);
      const found = contents.find((c) => c.id === params.id);
      if (found) setContent(found);
    }
  }, [params.id]);

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Conteúdo não encontrado.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className={`border-b ${darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white/80'} sticky top-0 z-10 backdrop-blur-md px-4 py-3`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/dashboard')}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition ${
              darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            ← Voltar
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setFontSize((prev) => Math.max(12, prev - 2))}
                title="Diminuir fonte"
                className="px-2 py-1 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition font-bold"
              >
                A-
              </button>
              <span className="text-xs font-semibold px-2">{fontSize}px</span>
              <button
                onClick={() => setFontSize((prev) => Math.min(24, prev + 2))}
                title="Aumentar fonte"
                className="px-2 py-1 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition font-bold"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Alternar tema"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${darkMode ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-700'}`}
            >
              {darkMode ? '☀️ Claro' : '🌙 Escuro'}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
          {content.discipline} • {content.grade}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-3 mb-2">{content.title}</h1>
        <p className="text-sm opacity-70 mb-8">Tópico: {content.topic}</p>

        <div className="space-y-6" style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}>
          <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">Explicação Teórica</h2>
            <p className="opacity-90 whitespace-pre-line">{content.explanation}</p>
          </section>

          <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold mb-3 text-emerald-600 dark:text-emerald-400">Exemplo Prático</h2>
            <p className="opacity-90 whitespace-pre-line">{content.example}</p>
          </section>
        </div>
      </main>
    </div>
  );
}