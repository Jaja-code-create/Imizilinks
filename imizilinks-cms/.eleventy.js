import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.dirname(fileURLToPath(import.meta.url));

export default function (eleventyConfig) {
  // Image de partage (WhatsApp, LinkedIn, Facebook, X) à partir de l'image de la page :
  // 1. sa version recadrée 1200x630 dans src/img/og/ si elle existe
  // 2. sinon la photo d'origine (cas d'un nouvel article ajouté depuis l'admin)
  // 3. sinon, page sans photo, le visuel par défaut avec le logo
  eleventyConfig.addFilter("ogImage", (image) => {
    if (!image) return "/img/og-imizilinks.png";
    const nom = path.basename(image, path.extname(image));
    const og = `/img/og/${nom}.jpg`;
    return fs.existsSync(path.join(racine, "src", og)) ? og : image;
  });

  // Fichiers copiés tels quels vers le site final
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy({ "src/favicons": "/" });

  // Collection des articles FR, triée par date décroissante
  eleventyConfig.addCollection("articles", (col) =>
    col.getFilteredByGlob("src/articles/*.md").sort((a, b) => b.date - a.date)
  );

  // Collection des articles EN, triée par date décroissante
  eleventyConfig.addCollection("articlesEn", (col) =>
    col.getFilteredByGlob("src/articles-en/*.md").sort((a, b) => b.date - a.date)
  );

  // Date lisible en français
  eleventyConfig.addFilter("dateFr", (d) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
  );

  // Date lisible en anglais
  eleventyConfig.addFilter("dateEn", (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
  );

  // Date au format ISO pour les données structurées
  eleventyConfig.addFilter("dateIso", (d) => new Date(d).toISOString().slice(0, 10));

  // Autres articles que celui affiché
  eleventyConfig.addFilter("autres", (arr, url, n) =>
    (arr || []).filter((a) => a.url !== url).slice(0, n || 2)
  );

  // Articles choisis par leur nom de fichier (champ « lies » d'un article)
  eleventyConfig.addFilter("parSlugs", (arr, slugs) =>
    (slugs || []).map((s) => (arr || []).find((a) => a.fileSlug === s)).filter(Boolean)
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
