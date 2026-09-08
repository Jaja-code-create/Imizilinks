/* ImiziLinks — script commun à toutes les pages */
(function () {
  'use strict';

  /* ═══ Barre de navigation au défilement ═══ */
  var nav = document.getElementById('nav');
  if (nav) {
    var majNav = function () { nav.classList.toggle('scrolled', window.scrollY > 50); };
    majNav();
    window.addEventListener('scroll', majNav);
  }

  /* ═══ Menu mobile ═══ */
  var burger = document.getElementById('burger');
  var navMenu = document.getElementById('navMenu');
  if (burger && navMenu) {
    burger.addEventListener('click', function () {
      var ouvert = navMenu.classList.toggle('open');
      burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
    });
  }

  /* ═══ Sous-menu « Nos actions » sur mobile ═══ */
  var ddBtn = document.getElementById('ddBtn');
  var ddItem = document.getElementById('ddItem');
  if (ddBtn && ddItem) {
    ddBtn.addEventListener('click', function (e) {
      if (window.innerWidth <= 820) {
        e.preventDefault();
        var ouvert = ddItem.classList.toggle('open-dd');
        ddBtn.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      }
    });
  }

  /* ═══ Mot qui défile dans le titre d'accueil ═══ */
  var cycle = document.getElementById('cycle');
  if (cycle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var langue = (document.documentElement.lang || 'fr').slice(0, 2);
    var mots = langue === 'en'
      ? ['settle in', 'learn', 'move forward', 'connect', 'grow']
      : ["s'installer", 'apprendre', 'avancer', 'se connecter', 'grandir'];
    var i = 0;
    setInterval(function () {
      cycle.style.opacity = 0;
      setTimeout(function () {
        i = (i + 1) % mots.length;
        cycle.textContent = mots[i];
        cycle.style.opacity = 1;
      }, 400);
    }, 2800);
  }

  /* ═══ Questions fréquentes ═══ */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var rep = item.querySelector('.faq-a');
      var ouvert = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (autre) {
        autre.classList.remove('open');
        autre.querySelector('.faq-a').style.maxHeight = null;
        autre.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!ouvert) {
        item.classList.add('open');
        rep.style.maxHeight = rep.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ═══ Apparition des blocs au défilement ═══ */
  var blocs = document.querySelectorAll('.reveal');
  if (window.IntersectionObserver && blocs.length) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    blocs.forEach(function (b) { obs.observe(b); });
  } else {
    blocs.forEach(function (b) { b.classList.add('in'); });
  }

  /* ═══ Lecture des paramètres d'URL ═══ */
  function param(nom) {
    return new URLSearchParams(window.location.search).get(nom);
  }

  /* ═══ Formulaire Nous rejoindre : arrivée depuis « Demander une relecture » ═══
     ?motif=relecture-cv (ou ?motif=emploi) : on présélectionne le rôle
     « Demander une relecture de mon CV » et on met en avant le champ CV. */
  var roleSel = document.getElementById('r-role');
  if (roleSel) {
    var motif = param('motif');
    if (motif === 'relecture-cv' || motif === 'emploi') {
      for (var r = 0; r < roleSel.options.length; r++) {
        if (roleSel.options[r].value === 'Demander une relecture de mon CV'
          || roleSel.options[r].value === 'Ask for a review of my CV') {
          roleSel.selectedIndex = r;
          break;
        }
      }
      var blocCv = document.getElementById('bloc-cv');
      if (blocCv) {
        blocCv.classList.add('mis-en-avant');
        setTimeout(function () {
          blocCv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  }

  /* ═══ Formulaire Événement : pré-sélection depuis l'URL ?ev=... ═══
     Si l'événement vient du bouton « S'inscrire », le champ est verrouillé.
     Un select désactivé n'est pas envoyé : on ajoute un champ caché miroir. */
  var evSel = document.getElementById('v-event');
  if (evSel) {
    var ev = param('ev');
    if (ev) {
      for (var k = 0; k < evSel.options.length; k++) {
        if (evSel.options[k].text === ev || evSel.options[k].value === ev) {
          evSel.selectedIndex = k;
          evSel.disabled = true;
          evSel.classList.add('is-locked');
          var miroir = document.createElement('input');
          miroir.type = 'hidden';
          miroir.name = evSel.name;
          miroir.value = evSel.options[k].value || evSel.options[k].text;
          evSel.parentNode.appendChild(miroir);
          var enEv = (document.documentElement.lang || 'fr').slice(0, 2) === 'en';
          var chg = document.createElement('a');
          chg.href = (enEv ? '/en/events/' : '/evenements/') + '#form';
          chg.className = 'lien-changer';
          chg.textContent = enEv ? 'Change event' : 'Changer d’événement';
          chg.addEventListener('click', function (e) {
            e.preventDefault();
            evSel.disabled = false;
            evSel.classList.remove('is-locked');
            if (miroir.parentNode) miroir.parentNode.removeChild(miroir);
            chg.parentNode.removeChild(chg);
          });
          evSel.parentNode.appendChild(chg);
          break;
        }
      }
    }
  }

  /* ═══ Formulaire de candidature : rappel de l'offre ═══ */
  var offreSel = document.getElementById('k-offre');
  if (offreSel) {
    var enApp = (document.documentElement.lang || 'fr').slice(0, 2) === 'en';
    var txtEmpty = enApp ? 'Select an offer below' : 'Sélectionne une offre ci-dessous';
    var txtEmptyD = enApp ? 'Your application will be passed to this company by ImiziLinks.' : 'Ta candidature sera transmise à cette entreprise par ImiziLinks.';
    var txtFilledD = enApp ? 'Application passed by ImiziLinks to this company within 72 hours.' : 'Candidature transmise par ImiziLinks à cette entreprise sous 72 heures.';
    var majOffre = function () {
      var opt = offreSel.options[offreSel.selectedIndex];
      var titre = document.getElementById('offre-titre');
      var detail = document.getElementById('offre-detail');
      if (offreSel.value && opt) {
        titre.textContent = opt.text;
        detail.textContent = txtFilledD;
      } else {
        titre.textContent = txtEmpty;
        detail.textContent = txtEmptyD;
      }
    };
    offreSel.addEventListener('change', majOffre);
    var offre = param('offre');
    if (offre) { offreSel.value = offre; }
    majOffre();
  }

  /* ═══ Envoi des formulaires ═══
     Tous les formulaires du site sont branchés sur Netlify Forms
     (data-netlify="true" + action="/merci/"). L'envoi est donc natif :
     le navigateur poste vers Netlify qui redirige ensuite vers /merci/.
     On se contente d'un retour visuel sur le bouton pendant l'envoi. */
  document.querySelectorAll('form[data-netlify]').forEach(function (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type=submit]');
      if (!btn) return;
      // Différé : désactiver le bouton pendant le submit lui-même
      // peut annuler l'envoi sur certains navigateurs.
      var sending = (document.documentElement.lang || 'fr').slice(0, 2) === 'en' ? 'Sending…' : 'Envoi…';
      setTimeout(function () { btn.disabled = true; btn.textContent = sending; }, 0);
    });
  });

  /* ═══ Page « Notre impact » : modal de contact partenariat ═══
     Chaque bouton [data-modal="..."] ouvre la modal et pré-remplit le motif.
     Le formulaire est un vrai formulaire Netlify (envoi natif vers /merci/). */
  var modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    var modalTitre = document.getElementById('modalTitre');
    var modalSub = document.getElementById('modalSub');
    var motifSelP = document.getElementById('p-motif');
    var modalClose = document.getElementById('modalClose');

    var enModal = (document.documentElement.lang || 'fr').slice(0, 2) === 'en';
    var CONTEXTES = enModal ? {
      partenariat:   { titre: "Become an ImiziLinks partner", sous: "Tell us in a few words who you are and what you have in mind. We'll get back to you within 72 hours to arrange a conversation.", motif: "Become a partner" },
      action:        { titre: "Suggest an action", sous: "A workshop, a recruitment day, an event at your offices, an idea we haven't thought of yet: describe it and we'll discuss it.", motif: "Suggest an action" },
      accueil:       { titre: "Welcome a community member", sous: "An internship, apprenticeship or role to open? Tell us the kind of profile you're looking for and we'll identify the supported candidates who fit.", motif: "Welcome a member" },
      offres:        { titre: "Relay your job offers", sous: "Your roles shared with a targeted community, with applications checked and presented by us.", motif: "Relay offers" },
      mentorat:      { titre: "Mobilise your teams", sous: "Mentoring, mock interviews, career workshops: tell us how many staff could get involved and on which topics.", motif: "Mobilise my teams" },
      environnement: { titre: "Grow our solidarity forest", sous: "Find out how working with ImiziLinks can help grow our Tree-Nation solidarity forest. Plantings are funded and tracked by ImiziLinks, within the limit of our dedicated budget; they can be tied to a partnership or a hire.", motif: "Environmental contribution" }
    } : {
      partenariat:   { titre: "Devenir partenaire d'ImiziLinks", sous: "Dites-nous en quelques mots qui vous êtes et ce que vous avez en tête. Nous revenons vers vous sous 72 heures pour convenir d'un échange.", motif: "Devenir partenaire" },
      action:        { titre: "Proposer une action", sous: "Un atelier, une journée de recrutement, un événement dans vos locaux, une idée à laquelle nous n'avons pas encore pensé : décrivez-la, nous en discutons.", motif: "Proposer une action" },
      accueil:       { titre: "Accueillir un membre de la communauté", sous: "Un stage, une alternance ou un poste à ouvrir ? Précisez le type de profil recherché, nous identifions les candidats accompagnés qui correspondent.", motif: "Accueillir un membre" },
      offres:        { titre: "Relayer vos offres d'emploi", sous: "Vos postes diffusés auprès d'une communauté ciblée, avec des candidatures vérifiées et présentées par nos soins.", motif: "Relayer des offres" },
      mentorat:      { titre: "Mobiliser vos équipes", sous: "Mentorat, entretiens blancs, ateliers métiers : dites-nous combien de collaborateurs pourraient s'impliquer et sur quels sujets.", motif: "Mobiliser mes équipes" },
      environnement: { titre: "Faire grandir notre forêt solidaire d'arbres", sous: "Découvrez comment votre collaboration avec ImiziLinks peut contribuer à faire grandir notre forêt solidaire Tree-Nation. Les plantations sont financées et suivies par ImiziLinks, dans la limite de notre budget dédié ; elles peuvent être associées à un partenariat ou à un recrutement.", motif: "Contribution environnementale" }
    };

    var ouvrirModal = function (cle) {
      var ctx = CONTEXTES[cle] || CONTEXTES.partenariat;
      if (modalTitre) modalTitre.textContent = ctx.titre;
      if (modalSub) modalSub.textContent = ctx.sous;
      if (motifSelP) motifSelP.value = ctx.motif;
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      var firstField = document.getElementById('p-prenom');
      if (firstField) setTimeout(function () { firstField.focus(); }, 120);
    };
    var fermerModal = function () {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () { ouvrirModal(btn.getAttribute('data-modal')); });
    });
    if (modalClose) modalClose.addEventListener('click', fermerModal);
    modalOverlay.addEventListener('click', function (e) { if (e.target === modalOverlay) fermerModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modalOverlay.classList.contains('open')) fermerModal(); });
  }
})();
