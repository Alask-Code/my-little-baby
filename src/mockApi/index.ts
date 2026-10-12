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
  birthDate: string;
  ageLabel: string;
  role: string;
  sex?: string;
  notes?: string;
  volumeUnit?: string;
  notifications?: string;
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
  date: string;
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
    title: 'Conteúdo educativo em desenvolvimento',
    text: 'Exemplos introdutórios sobre alimentação, ainda sem fontes e revisão clínica cadastradas.'
  }
];

const getLocalDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getTodayDateString = () => getLocalDate();

const formatBabyAge = (birthDate: string, referenceDate = new Date()) => {
  const [year, month, day] = birthDate.split('-').map(Number);
  const birth = new Date(year, month - 1, day);
  const reference = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

  if (
    !year ||
    !month ||
    !day ||
    birth.getFullYear() !== year ||
    birth.getMonth() !== month - 1 ||
    birth.getDate() !== day ||
    birth > reference
  ) {
    throw new Error('A data de nascimento deve ser válida e não pode estar no futuro.');
  }

  let months = (reference.getFullYear() - birth.getFullYear()) * 12 + reference.getMonth() - birth.getMonth();
  const getMonthAnchor = (monthCount: number) => {
    const anchorMonth = new Date(birth.getFullYear(), birth.getMonth() + monthCount, 1);
    const lastDayOfMonth = new Date(anchorMonth.getFullYear(), anchorMonth.getMonth() + 1, 0).getDate();
    return new Date(anchorMonth.getFullYear(), anchorMonth.getMonth(), Math.min(birth.getDate(), lastDayOfMonth));
  };
  if (reference < getMonthAnchor(months)) months -= 1;

  const monthAnchor = getMonthAnchor(months);
  const days =
    (Date.UTC(reference.getFullYear(), reference.getMonth(), reference.getDate()) -
      Date.UTC(monthAnchor.getFullYear(), monthAnchor.getMonth(), monthAnchor.getDate())) /
    86400000;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0) {
    return `${years} ${years === 1 ? 'ano' : 'anos'} · ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
  }

  return `${months} ${months === 1 ? 'mês' : 'meses'} · ${days} ${days === 1 ? 'dia' : 'dias'}`;
};

const babyProfile: BabyProfile = {
  name: 'Maria Cecilia',
  birthDate: '2026-03-11',
  ageLabel: formatBabyAge('2026-03-11'),
  role: 'Responsável principal'
};

const defaultDashboardCards: DashboardCard[] = [
  { id: 'feeding', label: 'Última mamada', value: '08:10', detail: '30 min · seio direito', tone: 'rose' },
  { id: 'diaper', label: 'Última troca', value: '07:40', detail: 'Fralda seca', tone: 'amber' },
  { id: 'sleep', label: 'Último sono', value: '06:30', detail: 'Sono da manhã · 1h20', tone: 'sky' },
  {
    id: 'milk',
    label: 'Estoque de exemplo',
    value: '216 ml',
    detail: 'Valor fictício · controle indisponível',
    tone: 'emerald'
  }
];

const quickActions: QuickAction[] = [
  { id: 'feeding', label: 'Registrar mamada', href: '/app/routines' },
  { id: 'reminder', label: 'Lembrar ordenha', href: '/app/notifications' },
  { id: 'sleep', label: 'Registrar sono', href: '/app/routines' },
  { id: 'education', label: 'Ver conteúdo', href: '/app/alimentary-introduction' }
];

const routineEntries: RoutineEntry[] = [
  {
    id: 'feeding-1',
    date: getLocalDate(),
    time: '08:10',
    title: 'Mamada · 30 min',
    description: 'Seio direito e esquerdo. Concluída sem interrupções.',
    tag: 'Amamentação'
  },
  {
    id: 'diaper-1',
    date: getLocalDate(),
    time: '07:40',
    title: 'Troca de fralda',
    description: 'Fralda seca, sem sinais de desconforto.',
    tag: 'Fralda'
  },
  {
    id: 'sleep-1',
    date: getLocalDate(),
    time: '06:30',
    title: 'Sono da manhã',
    description: 'Adormeceu após alimentação. Durou 1h20.',
    tag: 'Sono'
  },
  {
    id: 'mood-1',
    date: getLocalDate(),
    time: '06:00',
    title: 'Humor',
    description: 'Feliz e sorridente durante o banho.',
    tag: 'Humor'
  }
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

const sortRoutineEntries = (entries: RoutineEntry[]) =>
  [...entries].sort((first, second) => `${second.date}T${second.time}`.localeCompare(`${first.date}T${first.time}`));

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
    title: 'Dados utilizados nesta prévia',
    text: 'Os perfis e registros exibidos são exemplos fictícios. Os dados que você inserir ficam apenas na memória desta página e são perdidos ao recarregar.'
  },
  {
    id: 'usage',
    title: 'Sem conta ou compartilhamento real',
    text: 'Cadastro, login, convites e permissões são apenas demonstrações visuais. Não existe autenticação, conta de usuário, API de compartilhamento ou autorização de acesso.'
  },
  {
    id: 'security',
    title: 'Sem armazenamento seguro',
    text: 'Esta versão não salva dados em servidor nem fornece armazenamento privado de fotos. Não insira informações pessoais ou de saúde reais de crianças.'
  },
  {
    id: 'rights',
    title: 'Próximos passos para produção',
    text: 'Antes de uso real, será necessário implementar e validar autenticação, autorização no servidor, armazenamento privado, gestão de consentimento, exportação e exclusão de dados.'
  }
];

let demoBabyProfile = { ...babyProfile };
let demoRoutineEntries = [...routineEntries];
let demoMilestones = [...milestones];
let demoNotificationItems = [...notificationItems];
let demoCaregivers = [...caregivers];

export const mockApi = {
  getPublicHighlights: async () => {
    await wait();
    return publicHighlights;
  },
  getBabyProfile: async () => {
    await wait();
    return { ...demoBabyProfile };
  },
  getDashboardCards: async () => {
    await wait();
    const latestEntryFor = (tag: string) => demoRoutineEntries.find((entry) => entry.tag === tag);
    return defaultDashboardCards.map((card) => {
      const tagByCard: Record<string, string> = {
        feeding: 'Amamentação',
        diaper: 'Fralda',
        sleep: 'Sono'
      };
      const latestEntry = tagByCard[card.id] ? latestEntryFor(tagByCard[card.id]) : undefined;

      return latestEntry
        ? { ...card, value: latestEntry.time, detail: latestEntry.description || latestEntry.title }
        : card;
    });
  },
  getQuickActions: async () => {
    await wait();
    return quickActions;
  },
  getReminders: async () => {
    await wait();
    return demoNotificationItems
      .filter(({ active }) => active)
      .map(({ id, title, time, type }) => ({
        id,
        title,
        time,
        description: `${type} · lembrete de demonstração`
      }));
  },
  getRoutineEntries: async () => {
    await wait();
    return sortRoutineEntries(demoRoutineEntries);
  },
  addRoutineEntry: (entry: RoutineEntry) => {
    demoRoutineEntries = sortRoutineEntries([...demoRoutineEntries, entry]);
  },
  getMilestones: async () => {
    await wait();
    return [...demoMilestones];
  },
  addMilestone: (milestone: Milestone) => {
    demoMilestones = [milestone, ...demoMilestones];
  },
  getReportStats: async () => {
    await wait();
    const counts = demoRoutineEntries.reduce<Record<string, number>>(
      (totals, entry) => ({ ...totals, [entry.tag]: (totals[entry.tag] ?? 0) + 1 }),
      {}
    );

    return Object.entries(counts).map(([tag, count]) => ({
      id: tag,
      label: tag,
      value: String(count),
      detail: `${count} ${count === 1 ? 'registro' : 'registros'} na demonstração`
    }));
  },
  getNotificationItems: async () => {
    await wait();
    return [...demoNotificationItems];
  },
  addNotification: (notification: NotificationItem) => {
    demoNotificationItems = [notification, ...demoNotificationItems];
  },
  toggleNotification: (id: string) => {
    demoNotificationItems = demoNotificationItems.map((notification) =>
      notification.id === id ? { ...notification, active: !notification.active } : notification
    );
  },
  getCaregivers: async () => {
    await wait();
    return [...demoCaregivers];
  },
  addCaregiver: (caregiver: Caregiver) => {
    demoCaregivers = [caregiver, ...demoCaregivers];
  },
  updateBabyName: (name: string) => {
    demoBabyProfile = { ...demoBabyProfile, name };
  },
  updateBabyProfile: (
    name: string,
    birthDate: string,
    preferences: Pick<BabyProfile, 'sex' | 'notes' | 'volumeUnit' | 'notifications'>
  ) => {
    demoBabyProfile = { ...demoBabyProfile, ...preferences, name, birthDate, ageLabel: formatBabyAge(birthDate) };
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
