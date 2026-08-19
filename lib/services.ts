// TheKhanDev — Software Services & Academic Support pricing (PKR).
// IMPORTANT: nothing here is free — every product/service has a real price range.

export interface ServiceItem {
  id: string;
  name: string;
  nameHinglish: string;
  description: string;
  priceMin: number;
  priceMax: number;
  icon: string;
  color: string;
  deliveryTime: string;
}

export const SOFTWARE_SERVICES: ServiceItem[] = [
  {
    id: 'svc-website',
    name: 'Business Website Development',
    nameHinglish: 'Business Website Banwana',
    description: 'Fully responsive, modern business/portfolio website with admin panel, SEO setup, and free 3 months support.',
    priceMin: 35000,
    priceMax: 120000,
    icon: 'globe-outline',
    color: '#4b8bbe',
    deliveryTime: '1-3 hafte',
  },
  {
    id: 'svc-ecommerce',
    name: 'E-Commerce Store',
    nameHinglish: 'Online Store (E-Commerce)',
    description: 'Complete online store with payment gateway, cart, inventory, and order management dashboard.',
    priceMin: 60000,
    priceMax: 200000,
    icon: 'cart-outline',
    color: '#ffd43b',
    deliveryTime: '3-6 hafte',
  },
  {
    id: 'svc-mobile-app',
    name: 'Mobile App (Android + iOS)',
    nameHinglish: 'Mobile App Development',
    description: 'Cross-platform React Native / Flutter app for Android & iOS, published to Play Store & App Store.',
    priceMin: 80000,
    priceMax: 200000,
    icon: 'phone-portrait-outline',
    color: '#34d399',
    deliveryTime: '4-8 hafte',
  },
  {
    id: 'svc-custom-software',
    name: 'Custom Software / ERP System',
    nameHinglish: 'Custom Software ya ERP',
    description: 'Tailored desktop/web software for business operations — inventory, HR, billing, custom workflows.',
    priceMin: 90000,
    priceMax: 200000,
    icon: 'business-outline',
    color: '#a78bfa',
    deliveryTime: '6-10 hafte',
  },
  {
    id: 'svc-ai-chatbot',
    name: 'AI Chatbot & Automation',
    nameHinglish: 'AI Chatbot / Automation Bot',
    description: 'Custom AI-powered chatbot for WhatsApp/website with automated replies, lead capture, and integrations.',
    priceMin: 40000,
    priceMax: 150000,
    icon: 'chatbubbles-outline',
    color: '#fb923c',
    deliveryTime: '2-5 hafte',
  },
  {
    id: 'svc-desktop-app',
    name: 'Desktop Application',
    nameHinglish: 'Desktop App Development',
    description: 'Windows/Mac desktop application for internal tools, POS systems, or data management.',
    priceMin: 45000,
    priceMax: 140000,
    icon: 'desktop-outline',
    color: '#38bdf8',
    deliveryTime: '3-6 hafte',
  },
  {
    id: 'svc-api-integration',
    name: 'API Development & Integration',
    nameHinglish: 'API Banana / Integrate Karna',
    description: 'REST/GraphQL API design, third-party integrations (payment, SMS, maps), and backend architecture.',
    priceMin: 29000,
    priceMax: 90000,
    icon: 'git-network-outline',
    color: '#f87171',
    deliveryTime: '1-4 hafte',
  },
  {
    id: 'svc-uiux',
    name: 'UI/UX Design + Full Product Build',
    nameHinglish: 'UI/UX Design + Poora Product',
    description: 'End-to-end design + development package: wireframes, prototypes, and a fully built product.',
    priceMin: 70000,
    priceMax: 200000,
    icon: 'color-palette-outline',
    color: '#2dd4bf',
    deliveryTime: '4-9 hafte',
  },
];

export const ACADEMIC_SERVICES: ServiceItem[] = [
  {
    id: 'acad-fyp',
    name: 'Final Year Project (FYP) Development',
    nameHinglish: 'Final Year Project (FYP)',
    description: 'Complete FYP build with documentation, source code, and viva preparation support.',
    priceMin: 5000,
    priceMax: 10000,
    icon: 'school-outline',
    color: '#4b8bbe',
    deliveryTime: '2-4 hafte',
  },
  {
    id: 'acad-assignment',
    name: 'Programming Assignment Help',
    nameHinglish: 'Assignment Work (Python/Java/C++)',
    description: 'Assignment solutions with clean, well-commented code and explanation notes.',
    priceMin: 1500,
    priceMax: 5000,
    icon: 'document-text-outline',
    color: '#ffd43b',
    deliveryTime: '2-5 din',
  },
  {
    id: 'acad-thesis',
    name: 'Thesis / Research Writing Assistance',
    nameHinglish: 'Thesis / Research Assistance',
    description: 'Research support, literature review, methodology guidance, and thesis formatting.',
    priceMin: 6000,
    priceMax: 10000,
    icon: 'library-outline',
    color: '#a78bfa',
    deliveryTime: '2-3 hafte',
  },
  {
    id: 'acad-research-support',
    name: 'Research Paper Support',
    nameHinglish: 'Research Paper Support',
    description: 'Data analysis, plagiarism-free writing help, and citation formatting (APA/IEEE).',
    priceMin: 3000,
    priceMax: 8000,
    icon: 'analytics-outline',
    color: '#34d399',
    deliveryTime: '1-2 hafte',
  },
  {
    id: 'acad-presentation',
    name: 'Presentation & Report Formatting',
    nameHinglish: 'Presentation / Report Banwana',
    description: 'Professional slide decks and report formatting for university submissions.',
    priceMin: 1500,
    priceMax: 4000,
    icon: 'easel-outline',
    color: '#fb923c',
    deliveryTime: '1-3 din',
  },
  {
    id: 'acad-viva-prep',
    name: 'Viva / Defense Mentoring',
    nameHinglish: 'Viva Prep & Mentoring',
    description: 'One-on-one mentoring sessions to prepare for project defense / viva questions.',
    priceMin: 2000,
    priceMax: 6000,
    icon: 'people-circle-outline',
    color: '#38bdf8',
    deliveryTime: '1 hafta',
  },
];

export function formatPkr(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

export function formatPriceRange(item: ServiceItem): string {
  return `${formatPkr(item.priceMin)} – ${formatPkr(item.priceMax)}`;
}
