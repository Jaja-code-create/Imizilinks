export default function (eleventyConfig) {
  // Fichiers copiés tels quels vers le site final
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_redirects");

  // Collection des articles, triée par date décroissante
  eleventyConfig.addCollection("articles", (col) =>
    col.getFilteredByGlob("src/articles/*.md").sort((a, b) => b.date - a.date)
  );

  // Date lisible en français
  eleventyConfig.addFilter("dateFr", (d) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
  );

  // Date au format ISO pour les données structurées
  eleventyConfig.addFilter("dateIso", (d) => new Date(d).toISOString().slice(0, 10));

  // Autres articles que celui affiché
  eleventyConfig.addFilter("autres", (arr, url, n) =>
    (arr || []).filter((a) => a.url !== url).slice(0, n || 2)
  );

  // Identifiant technique à partir d'un titre (utilisé pour les offres)
  eleventyConfig.addFilter("slug", (s) =>
    String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
