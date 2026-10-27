'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Simulação de login bem-sucedido salvando no LocalStorage
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-100">
      {/* Lado esquerdo: Painel Institucional / Acadêmico */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white border-r-4 border-amber-500">
        <div>
          <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Quartel-General do Saber
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-4 text-slate-100">
            Plataforma de Estudos
          </h1>
          <p className="text-slate-300 text-sm max-w-md leading-relaxed">
            Consulte conteúdos didáticos estruturados por grandes áreas, aprofunde seus conhecimentos para o ENEM, carreiras militares e vestibulares universitários.
          </p>
        </div>
        <div className="text-xs text-slate-400 tracking-wider">
          Ensino, Disciplina e Excelência Acadêmica.
        </div>
      </div>

      {/* Lado direito: Formulário de Login */}
      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Acesso Restrito
            </h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
              Entre com suas credenciais de aluno
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aluno@escola.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-blue-950 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg transition-all"
            >
              Entrar na Plataforma
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}