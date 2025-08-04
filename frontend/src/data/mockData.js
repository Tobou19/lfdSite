// Mock data pour le centre de santé (LFD)-Services

export const mockData = {
  // Données pour la page d'accueil
  hero: {
    title: "Retrouvez votre bien-être naturellement",
    subtitle: "Centre de santé spécialisé dans le traitement des maladies chroniques par l'alimentation vivante",
    description: "Découvrez une approche révolutionnaire pour traiter diabète, hypertension, inflammation chronique et troubles digestifs grâce aux nourritures et boissons vivantes.",
    cta: "Prendre rendez-vous",
    secondaryCta: "Découvrir nos services"
  },

  // Services principaux
  services: [
    {
      id: 1,
      title: "Consultation Nutritionnelle",
      description: "Bilan personnalisé et plan alimentaire adapté à vos besoins spécifiques.",
      icon: "clipboard-list",
      duration: "90 min",
      price: "120€"
    },
    {
      id: 2,
      title: "Jus Thérapeutiques",
      description: "Protocoles de jus frais pressés à froid pour détoxifier et régénérer.",
      icon: "droplets",
      duration: "Programme 7-21 jours",
      price: "À partir de 180€"
    },
    {
      id: 3,
      title: "Alimentation Vivante",
      description: "Apprentissage des techniques de préparation d'aliments crus et fermentés.",
      icon: "leaf",
      duration: "Atelier 3h",
      price: "85€"
    },
    {
      id: 4,
      title: "Suivi Personnalisé",
      description: "Accompagnement sur mesure avec ajustements réguliers du protocole.",
      icon: "user-check",
      duration: "3-6 mois",
      price: "Pack à partir de 450€"
    }
  ],

  // Équipe médicale
  team: [
    {
      id: 1,
      name: "Dr. Marie Dubois",
      role: "Médecin Nutritionniste",
      speciality: "Maladies métaboliques",
      experience: "15 ans d'expérience",
      description: "Spécialisée dans le traitement du diabète et de l'obésité par l'alimentation vivante.",
      image: "doctor-1.jpg"
    },
    {
      id: 2,
      name: "Pierre Martin",
      role: "Naturopathe",
      speciality: "Détoxification",
      experience: "12 ans d'expérience",
      description: "Expert en protocoles de détoxification et régénération cellulaire.",
      image: "naturopath-1.jpg"
    },
    {
      id: 3,
      name: "Sophie Leclerc",
      role: "Nutritionniste",
      speciality: "Alimentation vivante",
      experience: "8 ans d'expérience",
      description: "Formatrice en techniques culinaires d'aliments crus et fermentation.",
      image: "nutritionist-1.jpg"
    },
    {
      id: 4,
      name: "Dr. Jean Moreau",
      role: "Médecin Généraliste",
      speciality: "Médecine intégrative",
      experience: "20 ans d'expérience",
      description: "Pionnier de l'approche intégrative alliant médecine conventionnelle et naturelle.",
      image: "doctor-2.jpg"
    }
  ],

  // Témoignages
  testimonials: [
    {
      id: 1,
      name: "Christine Laroche",
      age: 52,
      condition: "Diabète type 2",
      testimonial: "Après 6 mois de suivi, mon taux d'hémoglobine glyquée est passé de 8.5% à 6.2%. Je n'avais jamais imaginé pouvoir réduire mes médicaments autant !",
      result: "HbA1c: 8.5% → 6.2%",
      duration: "6 mois"
    },
    {
      id: 2,
      name: "Michel Petit",
      age: 45,
      condition: "Hypertension",
      testimonial: "Les protocoles de jus et l'alimentation vivante ont transformé ma vie. Ma tension est maintenant normale sans médicaments.",
      result: "Tension: 16/10 → 12/8",
      duration: "4 mois"
    },
    {
      id: 3,
      name: "Anne Dupont",
      age: 38,
      condition: "Troubles digestifs chroniques",
      testimonial: "Après des années de souffrance, j'ai enfin retrouvé un confort digestif. L'équipe m'a accompagnée avec bienveillance.",
      result: "Disparition des symptômes",
      duration: "3 mois"
    },
    {
      id: 4,
      name: "Robert Silva",
      age: 60,
      condition: "Inflammation chronique",
      testimonial: "Mes douleurs articulaires ont considérablement diminué. Je me sens plus énergique qu'il y a 10 ans !",
      result: "Réduction de 80% des douleurs",
      duration: "5 mois"
    }
  ],

  // Articles de blog
  blogArticles: [
    {
      id: 1,
      title: "Les 10 super-aliments pour combattre l'inflammation",
      excerpt: "Découvrez les aliments aux propriétés anti-inflammatoires puissantes pour soulager naturellement vos douleurs chroniques.",
      author: "Dr. Marie Dubois",
      date: "2024-01-15",
      readTime: "8 min",
      category: "Nutrition",
      image: "article-1.jpg"
    },
    {
      id: 2,
      title: "Protocole de jus pour réguler la glycémie",
      excerpt: "Un guide complet pour utiliser les jus de légumes dans la gestion naturelle du diabète type 2.",
      author: "Pierre Martin",
      date: "2024-01-10",
      readTime: "12 min",
      category: "Protocoles",
      image: "article-2.jpg"
    },
    {
      id: 3,
      title: "Fermentation : les bienfaits pour votre microbiote",
      excerpt: "Comment les aliments fermentés peuvent révolutionner votre santé digestive et immunitaire.",
      author: "Sophie Leclerc",
      date: "2024-01-05",
      readTime: "10 min",
      category: "Santé digestive",
      image: "article-3.jpg"
    }
  ],

  // Informations de contact
  contact: {
    address: "123 Rue de la Santé, 75013 Paris",
    phone: "+33 1 23 45 67 89",
    email: "lfdservicescommunications@gmail.com",
    hours: {
      monday: "Lundi: 7h00 - 15h00",
      tuesday: "Mardi: Fermé",
      weekdays: "Mercredi - Vendredi: 5h00 - 18h00",
      saturday: "Samedi: 5h00 - 20h00",
      sunday: "Dimanche: Fermé"
    },
    coordinates: {
      lat: 48.8566,
      lng: 2.3522
    }
  },

  // Statistiques du centre
  stats: [
    {
      number: "500+",
      label: "Bénéficiaires accompagnés"
    },
    {
      number: "15",
      label: "Années d'expérience"
    },
    {
      number: "99%",
      label: "Taux de satisfaction"
    },
    {
      number: "92%",
      label: "Amélioration des biomarqueurs"
    }
  ],

  // À propos du centre
  about: {
    mission: "Notre mission est de révolutionner l'approche des maladies chroniques en proposant des solutions naturelles basées sur l'alimentation vivante et les thérapies nutritionnelles avancées.",
    vision: "Être le centre de référence en France pour le traitement naturel des maladies chroniques par l'alimentation thérapeutique.",
    values: [
      {
        title: "Approche holistique",
        description: "Nous considérons la personne dans sa globalité, pas seulement les symptômes."
      },
      {
        title: "Science & nature",
        description: "Nous allions les dernières recherches scientifiques aux bienfaits des aliments naturels."
      },
      {
        title: "Accompagnement personnalisé",
        description: "Chaque protocole est adapté aux besoins spécifiques de chaque bénéficiaire."
      },
      {
        title: "Éducation thérapeutique",
        description: "Nous formons nos bénéficiaires à devenir autonomes dans leur santé."
      }
    ],
    history: "Fondé en 2009 par le Missionnaire Dr. John, le centre (LFD)-Services est né de la conviction que l'alimentation peut être notre meilleur remède. Après avoir observé les limites des approches conventionnelles, notre équipe a développé des protocoles uniques combinant nutrition thérapeutique, alimentation vivante et suivi médical rigoureux à travers notament des séances psychoénergétiques."
  }
};