import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plataforma de Estudos',
  description: 'Plataforma web para consulta e leitura de conteúdos didáticos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}