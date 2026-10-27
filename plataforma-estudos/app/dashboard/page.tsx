'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import initialContentsData from '../../data/contents.json';
import { ContentItem } from '../../types';

const initialContents = initialContentsData as ContentItem[];

export default function DashboardPage() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas');
  const [selectedLevel, setSelectedLevel] = useState('ENEM');
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Garante que os conteúdos prontos do JSON sejam carregados e atualizados automaticamente
    const saved = localStorage.getItem('study_contents');
    if (!saved) {
      setContents(initialContents);
      localStorage.setItem('study_contents', JSON.stringify(initialContents));
    } else {
      const parsed = JSON.parse(saved);
      // Se houver menos itens salvos do que os novos padrões, atualiza automaticamente
      if (parsed.length < initialContents.length) {
        setContents(initialContents);
        localStorage.setItem('study_contents', JSON.stringify(initialContents));
      } else {
        setContents(parsed);
      }
    }

    const savedFavs = localStorage.getItem('study_favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const updatedFavs = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavs);
    localStorage.setItem('study_favorites', JSON.stringify(updatedFavs));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const areas = ['Todas', 'Exatas', 'Natureza', 'Humanas', 'Linguagens'];
  const levels = ['ENEM', 'MILITARES', 'UNIVERSITÁRIOS'];

  const filteredContents = contents.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesArea = selectedArea === 'Todas' || item.area === selectedArea;
    const matchesLevel = item.level === selectedLevel;

    return matchesSearch && matchesArea && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Barra Superior Institucional */}
      <header className="bg-slate-900 text-slate-100 border-b-4 border-amber-500 shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-inner">
              🛡️
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide uppercase text-amber-400">Plataforma de Estudos</h1>
              <p className="text-xs text-slate-400 tracking-wider">Ensino, Disciplina e Excelência Acadêmica</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.push('/admin')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5 shadow-sm"
            >
              ⚙️ Gerenciar CRUD
            </button>
            <button
              onClick={() => router.push('/equipe')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5 shadow-sm"
            >
              🎖️ Equipe
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-900/50 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5 shadow-sm"
            >
              🔒 Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Banner de Boas-vindas */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 mb-8 text-white shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold tracking-widest uppercase mb-3">
              Quartel-General do Saber
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Painel de Instrução e Consulta</h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Escolha o nível de aprofundamento e selecione a grande área para iniciar seus estudos imediatamente.
            </p>
          </div>
        </div>

        {/* Abas de Nível de Aprofundamento (ENEM, MILITARES, UNIVERSITÁRIOS) */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-2 justify-center">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`flex-1 min-w-[140px] py-3 px-6 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-sm ${
                selectedLevel === lvl
                  ? 'bg-blue-900 text-amber-400 border border-amber-500/40 shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              🎯 {lvl}
            </button>
          ))}
        </div>

        {/* Barra de Pesquisa e Filtros por Área */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="🔍 Pesquisar por título, tópico ou conteúdo didático..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm transition"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition shadow-sm ${
                  selectedArea === area
                    ? 'bg-slate-900 text-white border border-slate-700 shadow'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                📚 {area}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de Cards de Conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider rounded-lg">
                        {item.area}
                      </span>
                      <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider rounded-lg">
                        {item.level}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-2 rounded-xl text-base transition ${
                        isFav ? 'bg-amber-100 text-amber-600 shadow-inner' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                      }`}
                      title="Favoritar"
                    >
                      {isFav ? '★' : '☆'}
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-900 transition">{item.title}</h3>
                  <p className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1">
                    <span>📌</span> {item.discipline} • {item.grade} • {item.topic}
                  </p>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-6 leading-relaxed">{item.explanation}</p>
                </div>
                <button
                  onClick={() => router.push(`/study/${item.id}`)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-blue-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  📖 Iniciar Leitura
                </button>
              </div>
            );
          })}
        </div>

        {filteredContents.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm mt-4">
            <p className="text-slate-500 text-base font-medium">Nenhum conteúdo encontrado para este nível e área.</p>
          </div>
        )}
      </main>
    </div>
  );
}