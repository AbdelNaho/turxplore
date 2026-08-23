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
  reassurances: string[];
  promise: { eyebrow: string; paragraphs: string[] };
  proof: string;
  voyagesHeading: { line1: string; line2: string };
  voyages: Voyage[];
  tailorMade: { headline: string; headlineEm: string; body: string; cta: string };
  routesHeading: { title: string; body: string; hint: string };
  routes: Route[];
  leadMagnets: {
    eyebrow: string;
    title: string;
    titleEm: string;
    body: string;
    emailLabel: string;
    cta: string;
    confirmation: string;
    errorNote: string;
    items: { key: "carnet" | "cartes"; title: string; description: string; image: string; imageAlt: string }[];
  };
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
    errorNote: string;
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
    image: "/images/voyage-atlantique-sauvage.jpg",
    imageAlt: "Barques bleues devant la Sqala d'Essaouira au crépuscule",
  },
  {
    number: "III",
    duration: "14 jours",
    segment: "Amérique latine",
    title: "El Viaje del Alma",
    description:
      "Une civilisation partagée, de l'écho de Grenade à Fès aux jardins andalous de Meknès. Entièrement privatisé, entièrement en espagnol.",
    price: "À partir de 11 000 $ par personne",
    image: "/images/voyage-hassan-ii-mosque.jpg",
    imageAlt: "La mosquée Hassan II à Casablanca, vue sous l'arche",
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
    image: "/images/voyage-atlantique-sauvage.jpg",
    imageAlt: "Blue fishing boats before Essaouira's Sqala at dusk",
  },
  {
    number: "III",
    duration: "14 days",
    segment: "Latin America",
    title: "El Viaje del Alma",
    description:
      "A shared civilization, from Granada's echo in Fès to the Andalusian gardens of Meknès. Fully privatized, fully in Spanish.",
    price: "From $11,000 per person",
    image: "/images/voyage-hassan-ii-mosque.jpg",
    imageAlt: "The Hassan II Mosque in Casablanca, framed through an archway",
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
    image: "/images/route-desert-prive.jpg",
    imageAlt: "Dunes dorées du Sahara à l'heure dorée, ciel nuageux",
  },
  {
    name: "Les villes impériales",
    subtitle: "Marrakech, Fès, Meknès, Rabat",
    image: "/images/route-villes-imperiales.jpg",
    imageAlt: "Fontaine en zellige et lanterne dans un riad marocain",
  },
  {
    name: "La côte atlantique",
    subtitle: "Essaouira, Oualidia, Mogador",
    image: "/images/route-cote-atlantique.jpg",
    imageAlt: "La Sqala d'Essaouira sous un ciel bleu, une mouette en vol",
  },
  {
    name: "L'héritage andalou",
    subtitle: "L'écho de Grenade, en español",
    image: "/images/route-heritage-andalou.jpg",
    imageAlt: "Arcades zellige de la Kasbah de Tanger, vue sur la ville blanche",
  },
  {
    name: "Le Maroc en famille",
    subtitle: "Plusieurs générations, un seul récit",
    image: "/images/route-family-rooftop.jpg",
    imageAlt: "Terrasse sur les toits de Marrakech au coucher du soleil, guirlandes lumineuses",
  },
];

const voyagesEs: Voyage[] = [
  {
    number: "I",
    duration: "12 días",
    segment: "UHNW",
    title: "Los Imperios de la Sombra",
    description:
      "De los patios ocultos de Marrakech a las dunas vacías de Chegaga. Acceso privado a la Qarawiyyin. Una noche donde ningún otro campamento se ha alzado.",
    price: "Desde 9.500 $ por persona",
    image: "/images/voyage-jemaa-elfna-night.jpg",
    imageAlt: "La plaza Jemaa el-Fna al caer la noche, luces y multitud",
  },
  {
    number: "II",
    duration: "9 días",
    segment: "HENRY y familias",
    title: "El Atlántico Salvaje",
    description:
      "Las ostras de los criaderos privados de Oualidia. Las islas de Mogador al atardecer. Los acantilados de surf de Souss-Massa.",
    price: "Desde 7.200 $ por persona",
    image: "/images/voyage-atlantique-sauvage.jpg",
    imageAlt: "Barcas azules frente a la Sqala de Essaouira al atardecer",
  },
  {
    number: "III",
    duration: "14 días",
    segment: "América Latina",
    title: "El Viaje del Alma",
    description:
      "Una civilización compartida, desde el eco de Granada en Fez hasta los jardines andaluces de Meknes. Totalmente privatizado, totalmente en español.",
    price: "Desde 11.000 $ por persona",
    image: "/images/voyage-hassan-ii-mosque.jpg",
    imageAlt: "La mezquita Hassan II en Casablanca, enmarcada bajo el arco",
  },
  {
    number: "IV",
    duration: "7 días",
    segment: "Brasil",
    title: "Marrakech, Sem Pressa",
    description:
      "Un riad discreto en la medina, los talleres a los que solo nosotros podemos abrirle las puertas, y un guía que habla únicamente portugués.",
    price: "Desde 2.500 $ por persona",
    image: "/images/voyage-riad-marrakech.jpg",
    imageAlt: "Patio de un riad de Marrakech visto desde arriba, azulejos y rincón con asientos",
  },
];

const voyagesPt: Voyage[] = [
  {
    number: "I",
    duration: "12 dias",
    segment: "UHNW",
    title: "Os Impérios da Sombra",
    description:
      "Dos pátios ocultos de Marrakech às dunas vazias de Chegaga. Acesso privado à Qarawiyyin. Uma noite onde nenhum outro acampamento já se ergueu.",
    price: "A partir de US$ 9.500 por pessoa",
    image: "/images/voyage-jemaa-elfna-night.jpg",
    imageAlt: "A praça Jemaa el-Fna ao cair da noite, luzes e multidão",
  },
  {
    number: "II",
    duration: "9 dias",
    segment: "HENRY e famílias",
    title: "O Atlântico Selvagem",
    description:
      "As ostras dos criadouros privados de Oualidia. As ilhas de Mogador ao entardecer. As falésias de surfe do Souss-Massa.",
    price: "A partir de US$ 7.200 por pessoa",
    image: "/images/voyage-atlantique-sauvage.jpg",
    imageAlt: "Barcos azuis diante da Sqala de Essaouira ao entardecer",
  },
  {
    number: "III",
    duration: "14 dias",
    segment: "América Latina",
    title: "El Viaje del Alma",
    description:
      "Uma civilização compartilhada, do eco de Granada em Fez aos jardins andaluzes de Meknes. Totalmente privativo, totalmente em espanhol.",
    price: "A partir de US$ 11.000 por pessoa",
    image: "/images/voyage-hassan-ii-mosque.jpg",
    imageAlt: "A Mesquita Hassan II em Casablanca, emoldurada por um arco",
  },
  {
    number: "IV",
    duration: "7 dias",
    segment: "Brasil",
    title: "Marrakech, Sem Pressa",
    description:
      "Um riad discreto na medina, os ateliês aos quais só nós temos acesso, e um guia que fala somente português.",
    price: "A partir de US$ 2.500 por pessoa",
    image: "/images/voyage-riad-marrakech.jpg",
    imageAlt: "Pátio de um riad de Marrakech visto de cima, azulejos e cantinho com assentos",
  },
];

const routesEn: Route[] = [
  {
    name: "The private desert",
    subtitle: "Chegaga, Erg Chigaga, exclusive camps",
    image: "/images/route-desert-prive.jpg",
    imageAlt: "Golden Sahara dunes at golden hour, clouded sky",
  },
  {
    name: "The imperial cities",
    subtitle: "Marrakech, Fès, Meknès, Rabat",
    image: "/images/route-villes-imperiales.jpg",
    imageAlt: "A zellige mosaic fountain and lantern in a Moroccan riad",
  },
  {
    name: "The Atlantic coast",
    subtitle: "Essaouira, Oualidia, Mogador",
    image: "/images/route-cote-atlantique.jpg",
    imageAlt: "Essaouira's Sqala fortress under a blue sky, a seagull in flight",
  },
  {
    name: "The Andalusian legacy",
    subtitle: "Granada's echo, in Spanish",
    image: "/images/route-heritage-andalou.jpg",
    imageAlt: "Zellige-tiled arcades of the Tangier Kasbah, overlooking the white city",
  },
  {
    name: "Morocco, as a family",
    subtitle: "Several generations, one story",
    image: "/images/route-family-rooftop.jpg",
    imageAlt: "A Marrakech rooftop terrace at sunset, string lights overhead",
  },
];

const routesEs: Route[] = [
  {
    name: "El desierto privado",
    subtitle: "Chegaga, Erg Chigaga, campamentos exclusivos",
    image: "/images/route-desert-prive.jpg",
    imageAlt: "Dunas doradas del Sahara a la hora dorada, cielo con nubes",
  },
  {
    name: "Las ciudades imperiales",
    subtitle: "Marrakech, Fez, Meknes, Rabat",
    image: "/images/route-villes-imperiales.jpg",
    imageAlt: "Fuente de azulejos zellige y farol en un riad marroquí",
  },
  {
    name: "La costa atlántica",
    subtitle: "Essaouira, Oualidia, Mogador",
    image: "/images/route-cote-atlantique.jpg",
    imageAlt: "La Sqala de Essaouira bajo un cielo azul, una gaviota en vuelo",
  },
  {
    name: "El legado andalusí",
    subtitle: "El eco de Granada, en español",
    image: "/images/route-heritage-andalou.jpg",
    imageAlt: "Arcadas de azulejos de la Kasbah de Tánger, vista sobre la ciudad blanca",
  },
  {
    name: "Marruecos en familia",
    subtitle: "Varias generaciones, una sola historia",
    image: "/images/route-family-rooftop.jpg",
    imageAlt: "Terraza en los tejados de Marrakech al atardecer, guirnaldas de luces",
  },
];

const routesPt: Route[] = [
  {
    name: "O deserto privado",
    subtitle: "Chegaga, Erg Chigaga, acampamentos exclusivos",
    image: "/images/route-desert-prive.jpg",
    imageAlt: "Dunas douradas do Saara na hora dourada, céu com nuvens",
  },
  {
    name: "As cidades imperiais",
    subtitle: "Marrakech, Fez, Meknes, Rabat",
    image: "/images/route-villes-imperiales.jpg",
    imageAlt: "Fonte de azulejos zellige e lanterna em um riad marroquino",
  },
  {
    name: "A costa atlântica",
    subtitle: "Essaouira, Oualidia, Mogador",
    image: "/images/route-cote-atlantique.jpg",
    imageAlt: "A Sqala de Essaouira sob um céu azul, uma gaivota em voo",
  },
  {
    name: "O legado andaluz",
    subtitle: "O eco de Granada, em espanhol",
    image: "/images/route-heritage-andalou.jpg",
    imageAlt: "Arcadas de azulejos da Kasbah de Tânger, vista sobre a cidade branca",
  },
  {
    name: "Marrocos em família",
    subtitle: "Várias gerações, uma só história",
    image: "/images/route-family-rooftop.jpg",
    imageAlt: "Terraço nos telhados de Marrakech ao pôr do sol, luzes decorativas",
  },
];

export const homeContent: Record<"en" | "fr" | "es" | "pt-BR", HomeContent> = {
  fr: {
    hero: {
      title: "Morocco,",
      titleEm: "Edited.",
      subtitle: "Des voyages composés pour le Maroc le plus rare, pour ceux qui le préfèrent ainsi.",
      cta: "Composer mon voyage",
    },
    reassurances: [
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
      hint: "Utilisez les flèches",
    },
    routes: routesFr,
    leadMagnets: {
      eyebrow: "Emporter le Maroc",
      title: "Deux carnets,",
      titleEm: "pour patienter.",
      body: "Le Maroc en images et en repères, avant même votre premier échange avec nous. Laissez votre email, nous vous les envoyons à l'instant.",
      emailLabel: "Votre email",
      cta: "Recevoir",
      confirmation: "Envoyé. Vérifiez votre boîte mail (et vos spams, au cas où).",
      errorNote: "Ce message n'est pas arrivé. Réessayez, ou écrivez directement à journeys@turxplore.com.",
      items: [
        {
          key: "carnet",
          title: "Le Carnet du Maroc",
          description: "Un carnet de route à feuilleter avant le voyage. Quand partir, coutumes, et le Maroc en images.",
          image: "/images/cover-carnet-maroc-fr.jpg",
          imageAlt: "Couverture du Carnet du Maroc",
        },
        {
          key: "cartes",
          title: "Cartes & Médinas",
          description: "Le Royaume d'un coup d'œil, et les médinas de Fès et Marrakech par quartiers de métier.",
          image: "/images/cover-cartes-medinas-fr.jpg",
          imageAlt: "Couverture des Cartes & Médinas",
        },
      ],
    },
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
      errorNote: "Ce message n'est pas arrivé. Réessayez, ou écrivez directement à journeys@turxplore.com.",
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
      titleEm: "Edited.",
      subtitle: "Journeys composed for the rarest Morocco, for those who prefer it that way.",
      cta: "Compose My Journey",
    },
    reassurances: [
      "Private access",
      "No itinerary ever repeated",
      "Response in under 24 hours",
      "English · Français · Español · Português",
    ],
    promise: {
      eyebrow: "Our conviction",
      paragraphs: [
        "Morocco has been traveled for centuries. Its monuments photographed from every angle, its medinas mapped to the last alley. And yet the Morocco that matters, the one that stays with you, remains invisible to anyone who arrives holding a printed itinerary.",
        "Turxplore rests on a different idea. The finest journeys are not found. They are built from a deep knowledge of place, a genuine curiosity about people, and the patient care of getting every detail exactly right.",
        "We open doors that stay closed to others. Our guides are historians, artisans, botanists, people with a story to tell, not a script to recite. And we time every arrival to give you places without crowds, because there is no greater luxury than a thousand-year-old courtyard in complete silence.",
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
      hint: "Use the arrows",
    },
    routes: routesEn,
    leadMagnets: {
      eyebrow: "Take Morocco with you",
      title: "Two guides,",
      titleEm: "while you wait.",
      body: "Morocco in images and orientation, before your first conversation with us. Leave your email, and we will send them right away.",
      emailLabel: "Your email",
      cta: "Send it to me",
      confirmation: "Sent. Check your inbox (and your spam folder, just in case).",
      errorNote: "That message did not arrive. Please try again, or write directly to journeys@turxplore.com.",
      items: [
        {
          key: "carnet",
          title: "The Morocco Notebook",
          description: "A keepsake to leaf through before you travel. When to go, customs, and Morocco in pictures.",
          image: "/images/cover-carnet-maroc-en.jpg",
          imageAlt: "Cover of The Morocco Notebook",
        },
        {
          key: "cartes",
          title: "Maps & Medinas",
          description: "The Kingdom at a glance, and the Fès and Marrakech medinas laid out by craft quarter.",
          image: "/images/cover-cartes-medinas-en.jpg",
          imageAlt: "Cover of Maps & Medinas",
        },
      ],
    },
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
      errorNote: "That message did not reach us. Please try again, or write directly to journeys@turxplore.com.",
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
  es: {
    hero: {
      title: "Morocco,",
      titleEm: "Edited.",
      subtitle: "Viajes compuestos para el Marruecos más singular, para quienes lo prefieren así.",
      cta: "Componer mi viaje",
    },
    reassurances: [
      "Acceso privado",
      "Ningún itinerario se repite",
      "Respuesta en menos de 24 horas",
      "Español · English · Français · Português",
    ],
    promise: {
      eyebrow: "Nuestra convicción",
      paragraphs: [
        "Se viaja a Marruecos desde hace siglos. Sus monumentos han sido fotografiados desde todos los ángulos, sus medinas cartografiadas hasta el último callejón. Y sin embargo, el Marruecos que realmente importa, el que permanece en uno, sigue siendo invisible para quien llega con un itinerario impreso.",
        "Turxplore se apoya en otra idea. Los viajes más hermosos no se encuentran. Se construyen. A partir de un conocimiento profundo del lugar, una curiosidad genuina por las personas, y el cuidado paciente de hacer que cada detalle sea exacto.",
        "Abrimos puertas que permanecen cerradas para otros. Nuestros guías son historiadores, artesanos, botánicos. Personas con una historia que contar, no un guion que recitar. Y elegimos cada horario para ofrecerle lugares sin multitudes. Porque no existe mayor lujo que un patio milenario en completo silencio.",
      ],
    },
    proof: "Cuarenta grupos al año. Ningún itinerario se repite. Respuesta en menos de 24 horas.",
    voyagesHeading: { line1: "Cuatro viajes.", line2: "Variaciones infinitas." },
    voyages: voyagesEs,
    tailorMade: {
      headline: "Ninguno de estos viajes existe todavía.",
      headlineEm: "El suyo será compuesto para usted.",
      body: "Estos son puntos de partida, no paquetes. Cada itinerario se escribe a mano, solo para usted, en torno a lo que busca. Es la única forma en que sabemos trabajar.",
      cta: "Comenzar la conversación",
    },
    routesHeading: {
      title: "Por dónde empezar",
      body: "Cinco puertas de entrada. Elija la que le llame, nosotros compondremos su versión.",
      hint: "Use las flechas",
    },
    routes: routesEs,
    leadMagnets: {
      eyebrow: "Llévese Marruecos",
      title: "Dos guías,",
      titleEm: "mientras espera.",
      body: "Marruecos en imágenes y en referencias, antes incluso de nuestra primera conversación. Déjenos su email y se los enviamos al instante.",
      emailLabel: "Su email",
      cta: "Recibir",
      confirmation: "Enviado. Revise su bandeja de entrada (y la de spam, por si acaso).",
      errorNote: "Ese mensaje no llegó. Inténtelo de nuevo, o escriba directamente a journeys@turxplore.com.",
      items: [
        {
          key: "carnet",
          title: "El Cuaderno de Marruecos",
          description: "Un cuaderno de viaje para hojear antes de partir. Cuándo ir, costumbres, y Marruecos en imágenes.",
          image: "/images/cover-carnet-maroc-es.jpg",
          imageAlt: "Portada del Cuaderno de Marruecos",
        },
        {
          key: "cartes",
          title: "Mapas y Medinas",
          description: "El Reino de un vistazo, y las medinas de Fez y Marrakech por barrios de oficio.",
          image: "/images/cover-cartes-medinas-es.jpg",
          imageAlt: "Portada de Mapas y Medinas",
        },
      ],
    },
    invite: {
      eyebrow: "Componer su viaje",
      title: "Cuéntenos el viaje que imagina.",
      body: "Sin menú desplegable, sin formulario interminable. Dos gestos, y una frase. Leemos cada mensaje nosotros mismos.",
      seasonLabel: "¿Qué estación le atrae?",
      seasonOptions: ["Primavera", "Verano", "Otoño", "Invierno", "Aún no decidido"],
      intentLabel: "¿Qué busca en Marruecos?",
      intentOptions: ["El silencio", "La cultura", "La aventura", "Reunir a los míos"],
      emailLabel: "Su email",
      cta: "Comenzar la conversación",
      confirmation:
        "Gracias. Leemos cada mensaje nosotros mismos, y le responderemos muy pronto. Su viaje aún no existe. Lo compondremos con usted.",
      errorNote: "Ese mensaje no llegó. Inténtelo de nuevo, o escriba directamente a journeys@turxplore.com.",
    },
    contact: {
      eyebrow: "Contacto",
      travelersLabel: "Viajeros",
      travelersEmail: "a.nahome@turxplore.com",
      travelersNote: "WhatsApp +212 697 047 692, en español, francés, inglés, portugués",
      advisorsLabel: "Asesores de viaje",
      advisorsEmail: "journeys@turxplore.com",
      advisorsNote: "Signature · Ensemble · Independientes",
      responseLabel: "Nuestro compromiso",
      responseNote: "Cada solicitud atendida en menos de 24 horas. Cada cliente tratado como si fuera el único.",
    },
  },
  "pt-BR": {
    hero: {
      title: "Morocco,",
      titleEm: "Edited.",
      subtitle: "Viagens compostas para o Marrocos mais raro, para quem prefere assim.",
      cta: "Compor minha viagem",
    },
    reassurances: [
      "Acesso privado",
      "Nenhum roteiro repetido",
      "Resposta em menos de 24 horas",
      "Português · English · Français · Español",
    ],
    promise: {
      eyebrow: "Nossa convicção",
      paragraphs: [
        "Viaja-se a Marrocos há séculos. Seus monumentos fotografados de todos os ângulos, suas medinas mapeadas até o último beco. E, no entanto, o Marrocos que importa, aquele que permanece em você, continua invisível para quem chega com um roteiro impresso.",
        "A Turxplore se apoia em outra ideia. As viagens mais belas não se encontram. Elas se constroem. A partir de um conhecimento profundo do lugar, uma curiosidade genuína pelas pessoas, e o cuidado paciente de acertar cada detalhe.",
        "Abrimos portas que permanecem fechadas para outros. Nossos guias são historiadores, artesãos, botânicos. Pessoas com uma história para contar, não um roteiro para recitar. E escolhemos cada horário para lhe oferecer lugares sem multidões. Porque não existe luxo maior do que um pátio milenar em silêncio completo.",
      ],
    },
    proof: "Quarenta grupos por ano. Nenhum roteiro repetido. Resposta em menos de 24 horas.",
    voyagesHeading: { line1: "Quatro viagens.", line2: "Variações infinitas." },
    voyages: voyagesPt,
    tailorMade: {
      headline: "Nenhuma dessas viagens existe ainda.",
      headlineEm: "A sua será composta para você.",
      body: "Estes são pontos de partida, não pacotes. Cada roteiro é escrito à mão, só para você, em torno do que você procura. É a única forma que sabemos trabalhar.",
      cta: "Começar a conversa",
    },
    routesHeading: {
      title: "Por onde começar",
      body: "Cinco portas de entrada. Escolha a que fala com você, nós composeremos sua versão.",
      hint: "Use as setas",
    },
    routes: routesPt,
    leadMagnets: {
      eyebrow: "Leve o Marrocos com você",
      title: "Dois guias,",
      titleEm: "enquanto você espera.",
      body: "O Marrocos em imagens e em referências, antes mesmo da nossa primeira conversa. Deixe seu email, nós os enviamos na hora.",
      emailLabel: "Seu email",
      cta: "Receber",
      confirmation: "Enviado. Confira sua caixa de entrada (e o spam, por precaução).",
      errorNote: "Essa mensagem não chegou. Tente novamente, ou escreva diretamente para journeys@turxplore.com.",
      items: [
        {
          key: "carnet",
          title: "O Caderno do Marrocos",
          description: "Um caderno de viagem para folhear antes da partida. Quando ir, costumes, e o Marrocos em imagens.",
          image: "/images/cover-carnet-maroc-pt-BR.jpg",
          imageAlt: "Capa do Caderno do Marrocos",
        },
        {
          key: "cartes",
          title: "Mapas e Medinas",
          description: "O Reino em uma só vista, e as medinas de Fez e Marrakech organizadas por bairro de ofício.",
          image: "/images/cover-cartes-medinas-pt-BR.jpg",
          imageAlt: "Capa de Mapas e Medinas",
        },
      ],
    },
    invite: {
      eyebrow: "Compor sua viagem",
      title: "Conte-nos sobre a viagem que você imagina.",
      body: "Sem menu suspenso, sem formulário interminável. Dois toques, e uma frase. Nós mesmos lemos cada mensagem.",
      seasonLabel: "Qual estação combina com você?",
      seasonOptions: ["Primavera", "Verão", "Outono", "Inverno", "Ainda não decidi"],
      intentLabel: "O que você procura em Marrocos?",
      intentOptions: ["O silêncio", "A cultura", "A aventura", "Reunir os meus"],
      emailLabel: "Seu email",
      cta: "Começar a conversa",
      confirmation:
        "Obrigado. Nós mesmos lemos cada mensagem, e responderemos muito em breve. Sua viagem ainda não existe. Vamos compô-la com você.",
      errorNote: "Essa mensagem não chegou até nós. Tente novamente, ou escreva diretamente para journeys@turxplore.com.",
    },
    contact: {
      eyebrow: "Contato",
      travelersLabel: "Viajantes",
      travelersEmail: "a.nahome@turxplore.com",
      travelersNote: "WhatsApp +212 697 047 692, em português, inglês, francês, espanhol",
      advisorsLabel: "Consultores de viagem",
      advisorsEmail: "journeys@turxplore.com",
      advisorsNote: "Signature · Ensemble · Independentes",
      responseLabel: "Nosso compromisso",
      responseNote: "Cada solicitação respondida em menos de 24 horas. Cada cliente tratado como se fosse o único.",
    },
  },
};
