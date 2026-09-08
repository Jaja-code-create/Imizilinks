import i18n, { routes } from "./i18n.js";

// Données calculées pour chaque page.
// - lang  : "fr" par défaut, "en" si défini dans le frontmatter ou via en/en.json
// - t     : le dictionnaire d'interface de la langue courante
// - altUrl / altLang : la page équivalente dans l'autre langue (pour le bouton)
export default {
  lang: (data) => data.lang || "fr",

  t: (data) => i18n[data.lang || "fr"],

  altLang: (data) => ((data.lang || "fr") === "fr" ? "en" : "fr"),

  altUrl: (data) => {
    const lang = data.lang || "fr";
    const other = lang === "fr" ? "en" : "fr";
    const key = data.pageKey;
    if (key && routes[key]) return routes[key][other];
    // Pas de correspondance connue : on renvoie vers l'accueil de l'autre langue
    return other === "fr" ? "/" : "/en/";
  },
};
