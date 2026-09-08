// Identifiant de build : sert à « casser » le cache des fichiers /style.css
// et /script.js à chaque déploiement (href="/style.css?v=...").
export default {
  version: Date.now().toString(36),
};
