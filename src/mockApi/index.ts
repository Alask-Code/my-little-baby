const wait = (ms = 150) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export type PublicHighlight = {
  id: string;
  title: string;
  text: string;
};

export type BabyProfile = {
  name: string;
  ageLabel: string;
  role: string;
};

export type DashboardCard = {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: 'rose' | 'amber' | 'sky' | 'emerald';
};

export type QuickAction = {
  id: string;
  label: string;
  href: string;
};

export type Reminder = {
  id: string;
  title: string;
  time: string;
  description: string;
};

export type RoutineEntry = {
  id: string;
  time: string;
  title: string;
  description: string;
  tag: string;
};

export type Milestone = {
  id: string;
  title: string;
  category: string;
  age: string;
  status: string;
  accent: 'rose' | 'amber' | 'sky' | 'emerald';
};

export type ReportStat = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  time: string;
  type: string;
  active: boolean;
};

export type Caregiver = {
  id: string;
  name: string;
  role: string;
  status: string;
  accent: 'emerald' | 'amber' | 'rose';
};

export type EducationalModule = {
  id: string;
  title: string;
  text: string;
  badge: string;
};

export type PrivacySection = {
  id: string;
  title: string;
  text: string;
};

const publicHighlights: PublicHighlight[] = [
  {
    id: 'routine',
    title: 'Rotina do bebê em um só lugar',
    text: 'Mamadas, sono, fraldas e ordenhas com histórico organizado e fácil de consultar.'
  },
  {
    id: 'timeline',
    title: 'Linha do tempo familiar',
    text: 'Acompanhe marcos, fotos e observações em um só fluxo do desenvolvimento.'
  },
  {
    id: 'education',
    title: 'Conteúdo educativo confiável',
    text: 'Aprenda sobre introdução alimentar, BLW, sinais de prontidão e higiene.'
  }
];

const babyProfile: BabyProfile = {
  name: 'Maria Cecilia',
  ageLabel: '7 meses · 1 dia',
  role: 'Responsável principal'
};

const dashboardCards: DashboardCard[] = [
  { id: 'feeding', label: 'Última mamada', value: '08:10', detail: '30 min · seio direito', tone: 'rose' },
  { id: 'diaper', label: 'Última troca', value: '07:40', detail: 'Fralda seca', tone: 'amber' },
  { id: 'sleep', label: 'Sono atual', value: '1h 20m', detail: 'Descanso do período da manhã', tone: 'sky' },
  { id: 'milk', label: 'Leite armazenado', value: '216 ml', detail: '5 lotes ativos', tone: 'emerald' }
];

const quickActions: QuickAction[] = [
  { id: 'feeding', label: 'Registrar mamada', href: '/app/routines' },
  { id: 'reminder', label: 'Lembrar ordenha', href: '/app/notifications' },
  { id: 'sleep', label: 'Registrar sono', href: '/app/routines' },
  { id: 'education', label: 'Ver conteúdo', href: '/app/alimentary-introduction' }
];

const reminders: Reminder[] = [
  { id: 'order', title: 'Ordenha programada', time: '14:30', description: 'Um lembrete para a sessão da tarde' },
  { id: 'meal', title: 'Rotina de alimentação', time: '17:00', description: 'Registrar refeição e humor' },
  { id: 'milestone', title: 'Revisar marcos', time: 'Hoje', description: 'Adicionar foto recente do desenvolvimento' }
];

const routineEntries: RoutineEntry[] = [
  {
    id: 'feeding-1',
    time: '08:10',
    title: 'Mamada · 30 min',
    description: 'Seio direito e esquerdo. Concluída sem interrupções.',
    tag: 'Amamentação'
  },
  {
    id: 'diaper-1',
    time: '07:40',
    title: 'Troca de fralda',
    description: 'Fralda seca, sem sinais de desconforto.',
    tag: 'Fralda'
  },
  {
    id: 'sleep-1',
    time: '06:30',
    title: 'Sono da manhã',
    description: 'Adormeceu após alimentação. Durou 1h20.',
    tag: 'Sono'
  },
  { id: 'mood-1', time: '06:00', title: 'Humor', description: 'Feliz e sorridente durante o banho.', tag: 'Humor' }
];

const milestones: Milestone[] = [
  {
    id: 'smile',
    title: 'Sorriso social',
    category: 'Interação social',
    age: '2 a 4 meses',
    status: 'Concluído em 12/03',
    accent: 'rose'
  },
  {
    id: 'crawling',
    title: 'Engatinha',
    category: 'Motor',
    age: '7 a 11 meses',
    status: 'Em observação',
    accent: 'amber'
  },
  {
    id: 'babbling',
    title: 'Pronuncia de sílabas',
    category: 'Linguagem',
    age: '6 a 9 meses',
    status: 'Atual',
    accent: 'sky'
  },
  {
    id: 'sitting',
    title: 'Senta sem apoio',
    category: 'Motor',
    age: '5 a 8 meses',
    status: 'Concluído em 08/02',
    accent: 'emerald'
  }
];

const reportStats: ReportStat[] = [
  { id: 'feedings', label: 'Mamadas', value: '12', detail: 'Últimos 7 dias' },
  { id: 'milk', label: 'Leite ordenhado', value: '1.3L', detail: 'Acumulado semanal' },
  { id: 'sleep', label: 'Horas de sono', value: '31h', detail: 'Média por semana' },
  { id: 'diaper', label: 'Trocas de fralda', value: '24', detail: 'Em 24h' }
];

const notificationItems: NotificationItem[] = [
  { id: 'order', title: 'Ordenha da tarde', time: '14:30', type: 'Agendada', active: true },
  { id: 'meal', title: 'Registro de alimentação', time: '17:00', type: 'Recorrente', active: true },
  { id: 'review', title: 'Lembrete de revisões', time: 'Domingo', type: 'Semanal', active: false },
  { id: 'stock', title: 'Estoque de leite', time: 'Quarta', type: 'Manual', active: true }
];

const caregivers: Caregiver[] = [
  { id: 'pedro', name: 'Pedro', role: 'Pai', status: 'Conectado', accent: 'emerald' },
  { id: 'ana', name: 'Ana', role: 'Avó', status: 'Convidada', accent: 'amber' },
  { id: 'julia', name: 'Julia', role: 'Babá', status: 'Aguardando', accent: 'rose' }
];

const educationalModules: EducationalModule[] = [
  {
    id: 'start',
    title: 'Quando iniciar',
    text: 'Observe sinais de prontidão e a evolução da alimentação com orientação responsável.',
    badge: 'Prontidão'
  },
  {
    id: 'blw',
    title: 'Método BLW',
    text: 'A alimentação com toque de mãos e autocontrole exige atenção à textura e segurança.',
    badge: 'BLW'
  },
  {
    id: 'groups',
    title: 'Grupos alimentares',
    text: 'Diversifique com leguminosas, frutas, vegetais, proteínas e cereais.',
    badge: 'Nutrição'
  },
  {
    id: 'choking',
    title: 'Prevenção de engasgos',
    text: 'Evite bolinhas, alimentos duros e ofereça supervisão constante.',
    badge: 'Segurança'
  }
];

const privacySections: PrivacySection[] = [
  {
    id: 'collection',
    title: '1. Coleta de dados',
    text: 'Coletamos apenas dados necessários para o funcionamento da rotina infantil, incluindo dados do perfil do bebê, registros de alimentação, sono e fotos quando autorizadas.'
  },
  {
    id: 'usage',
    title: '2. Uso e compartilhamento',
    text: 'As informações ficam acessíveis somente para usuários autorizados da conta. Fotos e registros podem ser compartilhados somente conforme permissão definida por cada responsável.'
  },
  {
    id: 'security',
    title: '3. Segurança',
    text: 'Utilizamos medidas de segurança para proteger o acesso autenticado aos dados, incluindo controle por perfil e autenticação de usuários.'
  },
  {
    id: 'rights',
    title: '4. Direitos e controle',
    text: 'Você pode revisar, editar, excluir ou limitar a visibilidade de dados e fotos, bem como retirar permissões de responsáveis ou cuidadores.'
  }
];

export const mockApi = {
  getPublicHighlights: async () => {
    await wait();
    return publicHighlights;
  },
  getBabyProfile: async () => {
    await wait();
    return babyProfile;
  },
  getDashboardCards: async () => {
    await wait();
    return dashboardCards;
  },
  getQuickActions: async () => {
    await wait();
    return quickActions;
  },
  getReminders: async () => {
    await wait();
    return reminders;
  },
  getRoutineEntries: async () => {
    await wait();
    return routineEntries;
  },
  getMilestones: async () => {
    await wait();
    return milestones;
  },
  getReportStats: async () => {
    await wait();
    return reportStats;
  },
  getNotificationItems: async () => {
    await wait();
    return notificationItems;
  },
  getCaregivers: async () => {
    await wait();
    return caregivers;
  },
  getEducationalModules: async () => {
    await wait();
    return educationalModules;
  },
  getPrivacySections: async () => {
    await wait();
    return privacySections;
  }
};
