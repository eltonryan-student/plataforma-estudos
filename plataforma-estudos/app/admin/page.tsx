'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import initialContentsData from '../../data/contents.json';
import { ContentItem } from '../../types';

const initialContents = initialContentsData as ContentItem[];

export default function AdminPage() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<ContentItem, 'id'>>({
    title: '', discipline: '', area: 'Exatas', level: 'ENEM', grade: '', topic: '', explanation: '', example: ''
  });

  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('study_contents');
    setContents(saved ? JSON.parse(saved) : initialContents);
  }, []);

  const saveToStorage = (updated: ContentItem[]) => {
    setContents(updated);
    localStorage.setItem('study_contents', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.discipline || !form.explanation) return alert('Preencha os campos obrigatórios!');

    if (editingId) {
      saveToStorage(contents.map(item => item.id === editingId ? { id: editingId, ...form } : item));
    } else {
      saveToStorage([...contents, { id: Date.now().toString(), ...form }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ title: '', discipline: '', area: 'Exatas', level: 'ENEM', grade: '', topic: '', explanation: '', example: '' });
    setEditingId(null);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setForm({ title: item.title, discipline: item.discipline, area: item.area, level: item.level, grade: item.grade, topic: item.topic, explanation: item.explanation, example: item.example });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <header className="bg-slate-900 text-slate-100 border-b-4 border-amber-500 shadow-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/dashboard')} className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold uppercase">← Voltar</button>
          <h1 className="text-sm font-bold text-amber-400 uppercase">Gerenciamento CRUD</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold">{editingId ? '✏️ Editar Conteúdo' : '➕ Cadastrar Novo Conteúdo'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Título *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="px-4 py-2.5 border rounded-xl text-sm" />
            <input type="text" placeholder="Disciplina *" value={form.discipline} onChange={e => setForm({...form, discipline: e.target.value})} className="px-4 py-2.5 border rounded-xl text-sm" />
            <select value={form.area} onChange={e => setForm({...form, area: e.target.value as any})} className="px-4 py-2.5 border rounded-xl text-sm bg-white">
              <option value="Exatas">Exatas</option><option value="Natureza">Natureza</option><option value="Humanas">Humanas</option><option value="Linguagens">Linguagens</option>
            </select>
            <select value={form.level} onChange={e => setForm({...form, level: e.target.value as any})} className="px-4 py-2.5 border rounded-xl text-sm bg-white">
              <option value="ENEM">ENEM</option><option value="MILITARES">MILITARES</option><option value="UNIVERSITÁRIOS">UNIVERSITÁRIOS</option>
            </select>
            <input type="text" placeholder="Série / Ano" value={form.grade} onChange={e => setForm({...form, grade: e.target.value})} className="px-4 py-2.5 border rounded-xl text-sm" />
            <input type="text" placeholder="Tópico" value={form.topic} onChange={e => setForm({...form, topic: e.target.value})} className="px-4 py-2.5 border rounded-xl text-sm" />
            <textarea rows={2} placeholder="Explicação Didática *" value={form.explanation} onChange={e => setForm({...form, explanation: e.target.value})} className="md:col-span-2 px-4 py-2.5 border rounded-xl text-sm" />
            <textarea rows={2} placeholder="Exemplo Prático" value={form.example} onChange={e => setForm({...form, example: e.target.value})} className="md:col-span-2 px-4 py-2.5 border rounded-xl text-sm" />
          </div>
          <div className="flex justify-end gap-3">
            {editingId && <button type="button" onClick={resetForm} className="px-4 py-2 bg-slate-200 rounded-xl text-xs font-bold">Cancelar</button>}
            <button type="submit" className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase">{editingId ? 'Salvar' : 'Cadastrar'}</button>
          </div>
        </form>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-3">
          <h2 className="text-xl font-bold mb-4">Cadastrados ({contents.length})</h2>
          {contents.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 border rounded-xl bg-slate-50">
              <div>
                <div className="flex gap-2 mb-1"><span className="text-[10px] font-bold px-2 bg-blue-100 text-blue-900 rounded">{item.area}</span><span className="text-[10px] font-bold px-2 bg-amber-100 text-amber-900 rounded">{item.level}</span></div>
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.discipline} • {item.grade}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="px-3 py-1.5 text-xs font-bold text-blue-900 bg-blue-50 rounded-lg">Editar</button>
                <button onClick={() => saveToStorage(contents.filter(c => c.id !== item.id))} className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 rounded-lg">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}