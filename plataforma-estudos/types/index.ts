export interface ContentItem {
  id: string;
  title: string;
  discipline: string;
  area: 'Exatas' | 'Natureza' | 'Humanas' | 'Linguagens';
  level: 'ENEM' | 'MILITARES' | 'UNIVERSITÁRIOS';
  grade: string;
  topic: string;
  explanation: string;
  example: string;
}

export interface User {
  email: string;
  name: string;
}