# ImiziLinks — Mise en ligne et gestion du contenu

Ce dossier contient ton site et son tableau de bord d'administration.
Une fois la mise en ligne faite, tu gères tout depuis une page web, sans
jamais rouvrir un fichier.

**Le déroulé : trois comptes à créer (GitHub, Netlify, et ton domaine à
brancher), puis c'est terminé.** Compte une heure la première fois.

---

## Étape 1 — Créer un compte GitHub

GitHub est l'endroit où vivent les fichiers de ton site. C'est aussi lui qui
permet au tableau de bord de fonctionner : quand tu publies une offre, elle
est enregistrée là.

1. Va sur **github.com** et clique sur **Sign up**.
2. Crée ton compte (gratuit) avec ton adresse email.
3. Une fois connectée, clique sur le **+** en haut à droite → **New repository**.
4. Remplis :
   - **Repository name** : `imizilinks`
   - Coche **Private** si tu ne veux pas que le code soit public
   - Ne coche rien d'autre
5. Clique sur **Create repository**.

Tu arrives sur une page qui dit « Quick setup ». Laisse-la ouverte.

### Envoyer les fichiers sur GitHub

Sur cette même page, clique sur le lien **uploading an existing file**.

1. Fais glisser **tout le contenu du dossier `imizilinks-cms`** dans la zone
   (pas le dossier lui-même : ouvre-le et sélectionne tout ce qu'il y a
   dedans, y compris les dossiers `src` et les fichiers cachés).
2. En bas, écris un message court comme « Première version du site ».
3. Clique sur **Commit changes**.

> **Important :** si ton ordinateur masque les fichiers commençant par un
> point, active leur affichage. Les fichiers `.eleventy.js` et `.gitignore`
> sont indispensables.
> Sur Mac : `Cmd + Maj + .` dans le Finder.
> Sur Windows : onglet Affichage → cocher « Éléments masqués ».

---

## Étape 2 — Mettre le site en ligne avec Netlify

1. Va sur **netlify.com** et clique sur **Sign up**.
2. Choisis **Sign up with GitHub** — c'est le plus simple, ça relie
   directement les deux comptes.
3. Une fois connectée : **Add new site** → **Import an existing project**.
4. Choisis **GitHub**, autorise l'accès, puis sélectionne le dépôt
   `imizilinks`.
5. Netlify affiche les réglages de construction. Ils sont **déjà remplis
   automatiquement** grâce au fichier `netlify.toml` :
   - Build command : `npm run build`
   - Publish directory : `_site`
   Ne change rien.
6. Clique sur **Deploy**.

Attends deux minutes. Ton site est en ligne à une adresse du type
`https://un-nom-aleatoire.netlify.app`. Clique dessus pour vérifier.

---

## Étape 3 — Brancher imizilinks.fr

1. Dans Netlify : **Domain management** → **Add a domain**.
2. Saisis `imizilinks.fr` et valide.
3. Netlify te propose deux méthodes. La plus simple est de **déléguer le
   domaine à Netlify** : il t'affiche quatre adresses de serveurs de noms du
   type `dns1.p01.nsone.net`.
4. Connecte-toi chez le vendeur où tu as acheté le domaine (OVH, Gandi,
   Namecheap…), va dans la gestion des **serveurs DNS** ou **nameservers**, et
   remplace ceux qui sont là par les quatre de Netlify.
5. Enregistre.

Le changement prend entre une heure et 24 heures. Ensuite, dans Netlify,
active **HTTPS** (bouton *Verify DNS configuration* puis *Provision
certificate*). C'est gratuit et automatique.

---

## Étape 4 — Activer ton tableau de bord

C'est l'étape qui te donne la main sur le contenu.

### 4a. Activer la connexion

1. Dans Netlify : **Site configuration** → **Identity** → **Enable Identity**.
2. Toujours dans Identity, va dans **Registration** et choisis
   **Invite only**. Ça évite que n'importe qui puisse créer un compte.
3. Descends jusqu'à **Services** → **Git Gateway** → **Enable Git Gateway**.
   Autorise l'accès à GitHub si c'est demandé.

### 4b. Créer ton accès

1. Onglet **Identity** → **Invite users**.
2. Saisis ton adresse email et envoie l'invitation.
3. Tu reçois un email. **Clique sur le lien depuis un navigateur** et définis
   ton mot de passe.

### 4c. Se connecter

Va sur **imizilinks.fr/admin/** (ou l'adresse Netlify si le domaine n'est pas
encore actif). Connecte-toi avec ton email et ton mot de passe.

Tu vois maintenant un menu à gauche :

| Rubrique | Ce que tu peux y faire |
|---|---|
| **Offres d'emploi** | Ajouter, modifier, supprimer une offre |
| **Événements** | Gérer ton agenda |
| **Articles du blog** | Écrire et modifier tes guides |
| **Questions fréquentes** | Modifier les questions de chaque page |
| **Villes et référents** | Gérer la liste des villes |
| **Réglages du site** | Emails, réseaux sociaux, pied de page |

**Chaque fois que tu cliques sur Publish, le site se reconstruit tout seul.
Compte une à deux minutes avant de voir le changement en ligne.**

---

## Étape 5 — Recevoir les messages et les CV

Les formulaires sont déjà branchés sur Netlify Forms. Il reste à activer la
réception par email vers **contact@imizilinks.fr**.

1. Dans Netlify : **Forms**. Après le premier envoi depuis le site, quatre
   formulaires apparaissent :
   - `entraide` — demandes d'aide (page Entraide)
   - `inscription-evenement` — inscriptions aux événements (page Événements)
   - `candidature` — dépôts de CV (page Opportunités)
   - `contribuer` — référents, contributeurs, partenariats (page Nous rejoindre)
2. Pour **chacun** des quatre : clique sur le formulaire → **Settings** →
   **Form notifications** → **Add notification** → **Email notification**.
3. Dans « Email to notify », mets **contact@imizilinks.fr** et enregistre.
   Répète l'opération pour les quatre formulaires.

Tu recevras chaque message à contact@imizilinks.fr, et les CV seront
téléchargeables depuis l'interface Netlify (onglet Forms → `candidature`).

**Astuce :** tu peux mettre plusieurs adresses en créant plusieurs
notifications sur le même formulaire.

**Attention à la limite du forfait gratuit :** 100 envois par mois, et 10 Mo
de fichiers joints au total. Si tu reçois beaucoup de candidatures, il faudra
passer à un forfait payant ou basculer les CV vers un autre service.

---

## Étape 6 — Déclarer le site à Google

1. Va sur **Google Search Console** et ajoute la propriété `imizilinks.fr`.
2. Valide la propriété. Netlify permet la validation par enregistrement DNS.
3. Dans **Sitemaps**, soumets : `https://imizilinks.fr/sitemap.xml`
4. Utilise **Inspection de l'URL** pour demander l'indexation des pages
   principales sans attendre.

Compte deux à quatre semaines pour voir les premières pages apparaître, et
plusieurs mois pour se positionner sur des recherches concurrentielles.

---

## Comment ajouter une offre d'emploi

1. Va sur `imizilinks.fr/admin/`
2. Clique sur **Offres d'emploi** → **Liste des offres**
3. En bas de la liste, clique sur **Add une offre**
4. Remplis les champs. Deux points d'attention :
   - **Identifiant technique** : en minuscules, sans accent ni espace, avec
     des tirets. Exemple : `comptable-nantes`. C'est ce qui relie l'offre au
     formulaire de candidature.
   - **Type de contrat (pour Google)** : à remplir si tu veux que l'offre
     puisse apparaître dans Google for Jobs.
5. Clique sur **Publish** en haut.

Pour **supprimer** une offre : clique sur les trois points à droite de la
ligne concernée → **Remove**, puis **Publish**.

Pour **réordonner** : fais glisser les lignes.

---

## Comment ajouter un événement

Même principe : **Événements** → **Agenda** → **Add un événement**.

Deux champs à ne pas négliger :
- **Lieu et horaires** : si tu écris « En ligne » dedans, le site le déclare
  automatiquement comme événement en ligne auprès de Google.
- **Libellé pour le formulaire d'inscription** : c'est le texte que verront
  les personnes dans la liste déroulante quand elles s'inscrivent.

---

## Comment écrire un article

1. **Articles du blog** → **New un article**
2. Remplis le titre, la catégorie, la description, le chapeau
3. **Image de couverture** : tu peux téléverser une nouvelle photo ou
   reprendre une existante
4. Rédige le contenu dans l'éditeur. La barre d'outils te permet de mettre en
   gras, de créer des titres et des listes.
   - Utilise **Titre 2** pour les grandes parties
   - Le format **Citation** crée un encadré mis en avant sur fond beige
5. Descends jusqu'à **Questions fréquentes** et ajoute trois à cinq questions.
   C'est ce qui donne le plus de résultats en référencement : Google peut les
   afficher directement dans ses résultats de recherche.
6. **Publish**

L'adresse de l'article est construite automatiquement depuis son titre. Un
titre « Renouveler son titre de séjour étudiant » donne l'adresse
`imizilinks.fr/blog/renouveler-son-titre-de-sejour-etudiant/`.

### Écrire un titre et une description efficaces

- **Titre** : 60 caractères maximum, avec les mots que les gens tapent.
  « Renouveler son titre de séjour étudiant : la procédure 2027 » est meilleur
  que « Mon expérience de renouvellement ».
- **Description** : 150 à 160 caractères, une promesse concrète. C'est le texte
  affiché sous le titre dans Google, il détermine si on clique ou pas.

---

## À faire avant l'ouverture au public

- [ ] **Remplacer les six offres d'emploi** — ce sont des exemples. Publier de
      fausses offres avec les données structurées peut être sanctionné par
      Google et nuit à ta crédibilité auprès des candidats.
- [ ] **Remplacer les cinq événements** par tes vraies dates.
- [ ] **Compléter les mentions légales** — les champs entre crochets sont une
      obligation légale (forme juridique, adresse, directrice de publication,
      hébergeur : Netlify).
- [ ] **Renseigner les réseaux sociaux** dans Réglages du site.
- [ ] **Vérifier que l'adresse `contact@imizilinks.fr` existe** et que tu
      relèves bien cette boîte.
- [ ] **Activer les notifications email** sur les quatre formulaires Netlify
      (`entraide`, `inscription-evenement`, `candidature`, `contribuer`) vers
      `contact@imizilinks.fr` — voir Étape 5.
- [ ] **Tester les quatre formulaires** depuis le site en ligne et vérifier que
      tu reçois bien les emails à `contact@imizilinks.fr`.

---

## Ce qui est en place pour le référencement

- Une adresse distincte par page, lisible et contenant les mots-clés
- Titres et descriptions uniques, rédigés autour des recherches réelles
- Un seul titre principal par page, hiérarchie cohérente
- Données structurées : Organization, WebSite, FAQPage, Article, JobPosting,
  Event, BreadcrumbList, ItemList
- 64 questions fréquentes réparties sur toutes les pages
- Maillage interne entre les pages et les guides
- Balises de partage pour les réseaux sociaux
- Sitemap et robots.txt régénérés automatiquement à chaque publication
- Images optimisées, avec texte alternatif et chargement différé
- Mise en cache longue durée configurée dans `netlify.toml`
- Accessibilité : lien d'évitement, contrastes, navigation au clavier

---

## Pour progresser dans Google

Par ordre d'impact réel :

1. **Publier régulièrement** — un guide par mois sur une démarche précise.
   C'est le levier le plus puissant à ta disposition, et le tableau de bord
   est fait pour ça.
2. **Obtenir des liens depuis d'autres sites** — annuaires associatifs,
   universités, associations étudiantes, partenaires. C'est le second facteur
   le plus déterminant.
3. **Viser les recherches longues** — « comment obtenir une attestation
   d'hébergement à Lyon » se positionne beaucoup plus vite que « attestation
   hébergement », et amène des gens qui ont vraiment besoin de toi.
4. **Suivre les résultats dans Search Console** — regarde quelles requêtes
   amènent des visiteurs, et quelles pages sont vues sans être cliquées. Une
   page beaucoup vue mais peu cliquée signale une description à réécrire.
5. **Mettre à jour les guides existants** — quand une procédure change,
   modifie l'article. Google valorise le contenu maintenu à jour.

---

## Modifier l'apparence

Tout ce qui touche au contenu passe par le tableau de bord. Pour la mise en
forme, il faut passer par les fichiers :

- **Couleurs** : `src/style.css`, tout en haut dans le bloc `:root`
- **Textes des pages fixes** (accueil, entraide, opportunités) :
  les fichiers `.njk` dans `src/`
- **Menu et pied de page** : `src/_includes/base.njk`

Après modification, envoie le fichier sur GitHub : Netlify reconstruit tout
seul.

---

## En cas de problème

**Le tableau de bord affiche une erreur de connexion**
Vérifie que Identity et Git Gateway sont bien activés dans Netlify, et que ton
compte utilisateur est confirmé (onglet Identity, statut de l'utilisateur).

**Une publication n'apparaît pas sur le site**
Va dans Netlify → **Deploys**. Si la dernière construction est en rouge,
clique dessus pour lire l'erreur. Le plus souvent, c'est un champ obligatoire
resté vide.

**Une image ne s'affiche pas**
Elle doit être téléversée depuis le tableau de bord, pas collée depuis une
adresse externe.

**Le site est en ligne mais le domaine ne fonctionne pas**
Le changement de serveurs DNS prend jusqu'à 24 heures. Patiente, puis vérifie
dans Netlify que le domaine est bien marqué comme *Netlify DNS*.
