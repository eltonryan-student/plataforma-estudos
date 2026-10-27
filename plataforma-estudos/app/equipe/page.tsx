'use client';
import { useRouter } from 'next/navigation';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'João Paulo',
    role: 'Desenvolvedor Frontend & UI/UX',
    description: 'Líder de desenvolvimento visual, responsável pela estruturação dos componentes em Next.js e Tailwind CSS.',
    avatar: '/equipe/joao-paulo.jpg',
  },
  {
    id: '2',
    name: 'Carlos Fernando',
    role: 'Engenheiro de Software',
    description: 'Responsável pela arquitetura de dados, integração de rotas e fluxo de persistência com LocalStorage.',
    avatar: '/equipe/carlos-fernando.jpg',
  },
  {
    id: '3',
    name: 'João Vitor',
    role: 'Especialista de Conteúdo Didático',
    description: 'Atua na curadoria, organização e padronização das 4 grandes áreas do conhecimento na plataforma.',
    avatar: '/equipe/joao-vitor.jpg',
  },
  {
    id: '4',
    name: 'Elton Ryan',
    role: 'Analista de QA & Requisitos',
    description: 'Garante o controle de qualidade, validação de regras de acesso e testes das rotas operacionais.',
    avatar: '/equipe/elton-ryan.jpg',
  },
];

export default function EquipePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Cabeçalho */}
      <header className="bg-slate-900 text-slate-100 border-b-4 border-amber-500 shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5"
          >
            ← Voltar ao Painel
          </button>
          <h1 className="text-sm font-bold tracking-wide uppercase text-amber-400">
            Quadro de Oficiais & Desenvolvedores
          </h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 mb-10 text-white shadow-xl border border-slate-800 text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold tracking-widest uppercase mb-3">
            Corpo Docente e Técnico
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">Equipe de Desenvolvimento</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Conheça os integrantes responsáveis pelo planejamento, execução e design da Plataforma de Estudos.
          </p>
        </div>

        {/* Grade de Integrantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Foto do Integrante com borda estilizada */}
              <div className="relative w-28 h-28 mb-5">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-2xl border-2 border-amber-500 shadow-md group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    // Foto padrão caso a imagem do arquivo não seja encontrada
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0f172a&color=fbbf24&size=200`;
                  }}
                />
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition">
                {member.name}
              </h3>
              <span className="px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-black uppercase tracking-wider rounded-lg mt-1 mb-3">
                {member.role}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}