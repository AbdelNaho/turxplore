export type Voyage = {
  number: string;
  duration: string;
  segment: string;
  title: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
};

export type Route = {
  name: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

export type HomeContent = {
  hero: { title: string; titleEm: string; subtitle: string; cta: string };
  marquee: string[];
  promise: { eyebrow: string; paragraphs: string[] };
  proof: string;
  voyagesHeading: { line1: string; line2: string };
  voyages: Voyage[];
  tailorMade: { headline: string; headlineEm: string; body: string; cta: string };
  routesHeading: { title: string; body: string; hint: string };
  routes: Route[];
  invite: {
    eyebrow: string;
    title: string;
    body: string;
    seasonLabel: string;
    seasonOptions: string[];
    intentLabel: string;
    intentOptions: string[];
    emailLabel: string;
    cta: string;
    confirmation: string;
  };
  contact: {
    eyebrow: string;
    travelersLabel: string;
    travelersEmail: string;
    travelersNote: string;
    advisorsLabel: string;
    advisorsEmail: string;
    advisorsNote: string;
    responseLabel: string;
    responseNote: string;
  };
};

const voyagesFr: Voyage[] = [
  {
    number: "I",
    duration: "12 jours",
    segment: "UHNW",
    title: "Les Empires de l'Ombre",
    description:
      "Des patios cachés de Marrakech aux dunes vides de Chegaga. Accès privé à la Qaraouiyine. Une nuit là où aucun autre camp ne s'est dressé.",
    price: "À partir de 9 500 $ par personne",
    image: "/images/voyage-jemaa-elfna-night.jpg",
    imageAlt: "La place Jemaa el-Fna à la nuit tombée, lumières et foule",
  },
  {
    number: "II",
    duration: "9 jours",
    segment: "HENRY et familles",
    title: "L'Atlantique Sauvage",
    description:
      "Les huîtres des parcs privés d'Oualidia. Les îles de Mogador au crépuscule. Les falaises à surf du Souss-Massa.",
    price: "À partir de 7 200 $ par personne",
    image: "/images/voyage-atlantic-coast.jpg",
    imageAlt: "Le port d'Essaouira dans la brume du soir, barques et goélands",
  },
  {
    number: "III",
    duration: "14 jours",
    segment: "Amérique latine",
    title: "El Viaje del Alma",
    description:
      "Une civilisation partagée, de l'écho de Grenade à Fès aux jardins andalous de Meknès. Entièrement privatisé, entièrement en espagnol.",
    price: "À partir de 11 000 $ par personne",
    image: "/images/voyage-fes-medina.jpg",
    imageAlt: "Ruelle couverte de la médina de Fès, marchand et passants",
  },
  {
    number: "IV",
    duration: "7 jours",
    segment: "Brésil",
    title: "Marrakech, Sem Pressa",
    description:
      "Un riad discret dans la médina, les ateliers que l'on ne visite pas sans nous, et un accompagnement entièrement en portugais.",
    price: "À partir de 2 500 $ par personne",
    image: "/images/voyage-riad-marrakech.jpg",
    imageAlt: "Patio d'un riad de Marrakech vu en plongée, mosaïques et salon extérieur",
  },
];

const voyagesEn: Voyage[] = [
  {
    number: "I",
    duration: "12 days",
    segment: "UHNW",
    title: "The Empires of Shadow",
    description:
      "From Marrakech's hidden courtyards to the empty dunes of Chegaga. Private access to the Qarawiyyin. A night where no other camp has stood.",
    price: "From $9,500 per person",
    image: "/images/voyage-jemaa-elfna-night.jpg",
    imageAlt: "Jemaa el-Fna square at night, lights and crowds",
  },
  {
    number: "II",
    duration: "9 days",
    segment: "HENRY & families",
    title: "The Wild Atlantic",
    description:
      "Oysters from private beds at Oualidia. The Mogador islands at dusk. The surf cliffs of Souss-Massa.",
    price: "From $7,200 per person",
    image: "/images/voyage-atlantic-coast.jpg",
    imageAlt: "Essaouira's harbor in the evening mist, boats and gulls",
  },
  {
    number: "III",
    duration: "14 days",
    segment: "Latin America",
    title: "El Viaje del Alma",
    description:
      "A shared civilization, from Granada's echo in Fès to the Andalusian gardens of Meknès. Fully privatized, fully in Spanish.",
    price: "From $11,000 per person",
    image: "/images/voyage-fes-medina.jpg",
    imageAlt: "A covered alley in the Fès medina, a vendor and passersby",
  },
  {
    number: "IV",
    duration: "7 days",
    segment: "Brazil",
    title: "Marrakech, Sem Pressa",
    description:
      "A discreet riad in the medina, the workshops we alone can open doors to, and a guide who speaks only Portuguese.",
    price: "From $2,500 per person",
    image: "/images/voyage-riad-marrakech.jpg",
    imageAlt: "A Marrakech riad courtyard seen from above, tilework and a seating nook",
  },
];

const routesFr: Route[] = [
  {
    name: "Le désert privé",
    subtitle: "Chegaga, Erg Chigaga, campements exclusifs",
    image: "/images/voyage-desert-camp.jpg",
    imageAlt: "Campement privé au creux des dunes",
  },
  {
    name: "Les villes impériales",
    subtitle: "Marrakech, Fès, Meknès, Rabat",
    image: "/images/voyage-riad-marrakech.jpg",
    imageAlt: "Patio d'un riad de Marrakech",
  },
  {
    name: "La côte atlantique",
    subtitle: "Essaouira, Oualidia, Mogador",
    image: "/images/voyage-atlantic-coast.jpg",
    imageAlt: "Le port d'Essaouira au crépuscule",
  },
  {
    name: "L'héritage andalou",
    subtitle: "L'écho de Grenade, en español",
    image: "/images/voyage-fes-medina.jpg",
    imageAlt: "Ruelle de la médina de Fès",
  },
  {
    name: "Le Maroc en famille",
    subtitle: "Plusieurs générations, un seul récit",
    image: "/images/route-family-rooftop.jpg",
    imageAlt: "Terrasse sur les toits de Marrakech au coucher du soleil, guirlandes lumineuses",
  },
];

const routesEn: Route[] = [
  {
    name: "The private desert",
    subtitle: "Chegaga, Erg Chigaga, exclusive camps",
    image: "/images/voyage-desert-camp.jpg",
    imageAlt: "A private camp settled among the dunes",
  },
  {
    name: "The imperial cities",
    subtitle: "Marrakech, Fès, Meknès, Rabat",
    image: "/images/voyage-riad-marrakech.jpg",
    imageAlt: "A Marrakech riad courtyard",
  },
  {
    name: "The Atlantic coast",
    subtitle: "Essaouira, Oualidia, Mogador",
    image: "/images/voyage-atlantic-coast.jpg",
    imageAlt: "Essaouira's harbor at dusk",
  },
  {
    name: "The Andalusian legacy",
    subtitle: "Granada's echo, in Spanish",
    image: "/images/voyage-fes-medina.jpg",
    imageAlt: "An alley in the Fès medina",
  },
  {
    name: "Morocco, as a family",
    subtitle: "Several generations, one story",
    image: "/images/route-family-rooftop.jpg",
    imageAlt: "A Marrakech rooftop terrace at sunset, string lights overhead",
  },
];

export const homeContent: Record<"en" | "fr", HomeContent> = {
  fr: {
    hero: {
      title: "Morocco,",
      titleEm: "Privately.",
      subtitle: "Des voyages composés pour le Maroc le plus rare, pour ceux qui le préfèrent ainsi.",
      cta: "Composer mon voyage",
    },
    marquee: [
      "Accès privé",
      "Aucun itinéraire répété",
      "Réponse en moins de 24h",
      "Français · English · Español · Português",
    ],
    promise: {
      eyebrow: "Notre conviction",
      paragraphs: [
        "On voyage au Maroc depuis des siècles. Ses monuments sont photographiés sous tous les angles, ses médinas cartographiées jusqu'à la dernière ruelle. Et pourtant, le Maroc qui compte, celui qui reste en vous, demeure invisible à qui arrive avec un itinéraire imprimé.",
        "Turxplore repose sur une autre idée. Les plus beaux voyages ne se trouvent pas. Ils se construisent. À partir d'une connaissance profonde du lieu, d'une vraie curiosité pour les gens, et du soin patient de rendre chaque détail exact.",
        "Nous ouvrons des portes qui restent fermées aux autres. Nos guides sont historiens, artisans, botanistes. Des gens qui ont une histoire à raconter, pas un script à réciter. Et nous choisissons chaque horaire pour vous offrir des lieux sans foule. Car il n'existe pas de plus grand luxe qu'un patio millénaire dans le silence complet.",
      ],
    },
    proof: "Quarante groupes par an. Aucun itinéraire répété. Réponse en moins de 24h.",
    voyagesHeading: { line1: "Quatre voyages.", line2: "Des variations infinies." },
    voyages: voyagesFr,
    tailorMade: {
      headline: "Aucun de ces voyages n'existe encore.",
      headlineEm: "Le vôtre sera composé pour vous.",
      body: "Ce sont des points de départ, pas des forfaits. Chaque itinéraire s'écrit à la main, pour vous seul, autour de ce que vous cherchez. C'est la seule façon dont nous savons travailler.",
      cta: "Commencer la conversation",
    },
    routesHeading: {
      title: "Par où commencer",
      body: "Cinq portes d'entrée. Choisissez celle qui vous appelle, nous composerons votre version.",
      hint: "Faites glisser",
    },
    routes: routesFr,
    invite: {
      eyebrow: "Composer votre voyage",
      title: "Parlez-nous du voyage que vous imaginez.",
      body: "Pas de menu déroulant, pas de formulaire interminable. Deux gestes, puis une phrase. Nous lisons chaque message nous-mêmes.",
      seasonLabel: "Quelle saison vous attire ?",
      seasonOptions: ["Printemps", "Été", "Automne", "Hiver", "Pas encore décidé"],
      intentLabel: "Que cherchez-vous au Maroc ?",
      intentOptions: ["Le silence", "La culture", "L'aventure", "Réunir les miens"],
      emailLabel: "Votre email",
      cta: "Commencer la conversation",
      confirmation:
        "Merci. Nous lisons chaque message nous-mêmes, et nous revenons vers vous très vite. Votre voyage n'existe pas encore. Nous allons le composer avec vous.",
    },
    contact: {
      eyebrow: "Le contact",
      travelersLabel: "Voyageurs",
      travelersEmail: "a.nahome@turxplore.com",
      travelersNote: "WhatsApp +212 697 047 692, en français, anglais, espagnol, portugais",
      advisorsLabel: "Conseillers en voyage",
      advisorsEmail: "journeys@turxplore.com",
      advisorsNote: "Signature · Ensemble · Indépendants",
      responseLabel: "Notre engagement",
      responseNote:
        "Chaque demande traitée en moins de 24h. Chaque client traité comme s'il était le seul.",
    },
  },
  en: {
    hero: {
      title: "Morocco,",
      titleEm: "Privately.",
      subtitle: "Journeys composed for the rarest Morocco, for those who prefer it that way.",
      cta: "Compose My Journey",
    },
    marquee: [
      "Private access",
      "No itinerary ever repeated",
      "Response in under 24 hours",
      "English · Français · Español · Português",
    ],
    promise: {
      eyebrow: "Our conviction",
      paragraphs: [
        "Morocco has been traveled for centuries. Its monuments photographed from every angle, its medinas mapped to the last alley. And yet the Morocco that matters, the one that stays with you, remains invisible to anyone who arrives holding a printed itinerary.",
        "Turxplore rests on a different idea. The finest journeys are not found. They are built — from a deep knowledge of place, a genuine curiosity about people, and the patient care of getting every detail exactly right.",
        "We open doors that stay closed to others. Our guides are historians, artisans, botanists — people with a story to tell, not a script to recite. And we time every arrival to give you places without crowds, because there is no greater luxury than a thousand-year-old courtyard in complete silence.",
      ],
    },
    proof: "Forty groups a year. No itinerary ever repeated. Response in under 24 hours.",
    voyagesHeading: { line1: "Four journeys.", line2: "Infinite variations." },
    voyages: voyagesEn,
    tailorMade: {
      headline: "None of these journeys exist yet.",
      headlineEm: "Yours will be composed for you.",
      body: "These are starting points, not packages. Every itinerary is written by hand, for you alone, around what you are looking for. It is the only way we know how to work.",
      cta: "Begin the conversation",
    },
    routesHeading: {
      title: "Where to begin",
      body: "Five doors in. Choose the one that calls to you, and we will compose your version of it.",
      hint: "Drag to explore",
    },
    routes: routesEn,
    invite: {
      eyebrow: "Compose your journey",
      title: "Tell us about the journey you are imagining.",
      body: "No dropdown, no endless form. Two taps, then a sentence. We read every message ourselves.",
      seasonLabel: "Which season calls to you?",
      seasonOptions: ["Spring", "Summer", "Autumn", "Winter", "Not decided yet"],
      intentLabel: "What are you looking for in Morocco?",
      intentOptions: ["Silence", "Culture", "Adventure", "Gathering my people"],
      emailLabel: "Your email",
      cta: "Begin the conversation",
      confirmation:
        "Thank you. We read every message ourselves, and we will write back very soon. Your journey does not exist yet. We will compose it with you.",
    },
    contact: {
      eyebrow: "Contact",
      travelersLabel: "Travelers",
      travelersEmail: "a.nahome@turxplore.com",
      travelersNote: "WhatsApp +212 697 047 692, in English, French, Spanish, Portuguese",
      advisorsLabel: "Travel advisors",
      advisorsEmail: "journeys@turxplore.com",
      advisorsNote: "Signature · Ensemble · Independents",
      responseLabel: "Our commitment",
      responseNote: "Every enquiry answered in under 24 hours. Every client treated as if they were our only one.",
    },
  },
};
