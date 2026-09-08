// ══════════════════════════════════════════════════════════════════════
//  Traductions de l'interface (navigation, pied de page, formulaires…)
//  et table de correspondance des URL entre le français et l'anglais.
//
//  Accès dans les gabarits : {{ t.nav.home }}  (t = i18n[lang], voir _data)
//  Le contenu éditorial (articles, FAQ, offres, événements) est traduit
//  ailleurs : voir faq.json, evenements.json, offres.json, articles-en/.
// ══════════════════════════════════════════════════════════════════════

// Correspondance des pages entre les deux langues.
// key : identifiant logique de page (frontmatter `pageKey`)
// fr / en : URL finale dans chaque langue
export const routes = {
  home:        { fr: "/",                  en: "/en/" },
  entraide:    { fr: "/entraide/",         en: "/en/support/" },
  opportunites:{ fr: "/opportunites/",     en: "/en/opportunities/" },
  evenements:  { fr: "/evenements/",       en: "/en/events/" },
  impact:      { fr: "/notre-impact/",     en: "/en/our-impact/" },
  blog:        { fr: "/blog/",             en: "/en/blog/" },
  rejoindre:   { fr: "/nous-rejoindre/",   en: "/en/join-us/" },
  candidater:  { fr: "/candidater/",       en: "/en/apply/" },
  merci:       { fr: "/merci/",            en: "/en/thank-you/" },
  legal:       { fr: "/mentions-legales/", en: "/en/legal-notice/" },
};

const fr = {
  htmlLang: "fr",
  localeOg: "fr_FR",
  langName: "Français",
  otherLangCode: "EN",
  otherLangLabel: "English",
  switchToOther: "Switch to English",

  nav: {
    home: "Accueil",
    actions: "Nos actions",
    impact: "Notre impact",
    blog: "Blog",
    join: "Nous rejoindre",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    skip: "Aller au contenu",
    ddEntraide: "Entraide",
    ddEntraideDesc: "Attestation d'hébergement, démarches, référents",
    ddOpportunites: "Opportunités",
    ddOpportunitesDesc: "Offres d'emploi de nos entreprises partenaires",
    ddEvenements: "Événements",
    ddEvenementsDesc: "Forums, webinaires et rencontres",
  },

  footer: {
    actionsTitle: "Nos actions",
    fEntraide: "Entraide et démarches",
    fOffres: "Offres d'emploi",
    fEvenements: "Événements",
    fImpact: "Notre impact",
    guidesTitle: "Guides pratiques",
    allGuides: "Tous les guides",
    contactTitle: "Contact",
    join: "Nous rejoindre",
    rights: "Tous droits réservés",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
  },

  faq: {
    eyebrow: "Questions fréquentes",
  },

  footerDesc: "Tes racines, tes liens. La communauté d'Afrique de l'Est en France : entraide pour les démarches, offres d'emploi de nos entreprises partenaires, événements et guides pratiques.",
};

const en = {
  htmlLang: "en",
  localeOg: "en_GB",
  langName: "English",
  otherLangCode: "FR",
  otherLangLabel: "Français",
  switchToOther: "Passer en français",

  nav: {
    home: "Home",
    actions: "What we do",
    impact: "Our impact",
    blog: "Blog",
    join: "Join us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
    ddEntraide: "Support",
    ddEntraideDesc: "Proof of accommodation, admin paperwork, local contacts",
    ddOpportunites: "Opportunities",
    ddOpportunitesDesc: "Jobs from our partner companies",
    ddEvenements: "Events",
    ddEvenementsDesc: "Career forums, webinars and meet-ups",
  },

  footer: {
    actionsTitle: "What we do",
    fEntraide: "Support & paperwork",
    fOffres: "Job offers",
    fEvenements: "Events",
    fImpact: "Our impact",
    guidesTitle: "Practical guides",
    allGuides: "All guides",
    contactTitle: "Contact",
    join: "Join us",
    rights: "All rights reserved",
    legal: "Legal notice",
    privacy: "Privacy policy",
  },

  faq: {
    eyebrow: "Frequently asked questions",
  },

  footerDesc: "Your roots, your connections. The East African community in France: help with admin paperwork, jobs from our partner companies, events and practical guides.",
};

export default { fr, en };
