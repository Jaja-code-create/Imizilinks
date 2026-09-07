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
    var mots = ["s'installer", 'apprendre', 'avancer', 'se connecter', 'grandir'];
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

  /* ═══ Formulaire « Proposer ta contribution » : champs selon le rôle ═══ */
  var motifSel = document.getElementById('f-motif');
  if (motifSel) {
    var REGLES = {
      referent:    { blocs: ['bloc-villeres'], msg: 'Sur quoi peux-tu aider, et depuis quand es-tu installé·e ?' },
      article:     { blocs: [], msg: 'Quel sujet veux-tu traiter ?' },
      organiser:   { blocs: ['bloc-villeres'], msg: "Décris ton idée d'événement" },
      benevolat:   { blocs: ['bloc-villeres'], msg: 'Sur quoi peux-tu aider et à quelle fréquence ?' },
      partenariat: { blocs: ['bloc-structure'], msg: 'Présente ta structure et ce que tu proposes' },
      autre:       { blocs: [], msg: 'Ton message' }
    };
    var TOUS = ['bloc-villeres', 'bloc-structure'];

    var majFormulaire = function () {
      var regle = REGLES[motifSel.value] || { blocs: [], msg: 'Ton message' };
      TOUS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.toggle('on', regle.blocs.indexOf(id) > -1);
      });
      var lbl = document.getElementById('lbl-msg');
      if (lbl) lbl.textContent = regle.msg;
    };
    motifSel.addEventListener('change', majFormulaire);

    // Pré-remplissage depuis l'URL : ?motif=referent
    var motif = param('motif');
    if (motif && REGLES[motif]) { motifSel.value = motif; }
    majFormulaire();

    if (motif && REGLES[motif]) {
      var form = document.querySelector('.form-solo');
      if (form) {
        setTimeout(function () {
          window.scrollTo({ top: form.offsetTop - 90, behavior: 'smooth' });
        }, 200);
      }
    }
  }

  /* ═══ Boutons « S'inscrire » d'un événement → pré-sélection dans le formulaire ═══ */
  var evForm = document.getElementById('form-evenement');
  if (evForm) {
    var evSelect = document.getElementById('v-event');
    var choisirEvenement = function (label) {
      if (!evSelect || !label) return;
      for (var k = 0; k < evSelect.options.length; k++) {
        if (evSelect.options[k].text === label) { evSelect.selectedIndex = k; }
      }
    };
    document.querySelectorAll('a[href="#form-evenement"][data-ev]').forEach(function (lien) {
      lien.addEventListener('click', function () {
        choisirEvenement(lien.getAttribute('data-ev'));
      });
    });
    // Pré-remplissage depuis l'URL : ?ev=...
    var evParam = param('ev');
    if (evParam) {
      choisirEvenement(evParam);
      setTimeout(function () {
        window.scrollTo({ top: evForm.offsetTop - 90, behavior: 'smooth' });
      }, 200);
    }
  }

  /* ═══ Page « Merci » : message adapté au type de formulaire ═══ */
  var merciBlocs = document.querySelectorAll('[data-merci]');
  if (merciBlocs.length) {
    var type = param('type');
    var cible = document.querySelector('[data-merci="' + type + '"]');
    if (cible) {
      merciBlocs.forEach(function (p) { p.hidden = true; });
      cible.hidden = false;
    }
  }

  /* ═══ Formulaire de candidature : rappel de l'offre ═══ */
  var offreSel = document.getElementById('k-offre');
  if (offreSel) {
    var majOffre = function () {
      var opt = offreSel.options[offreSel.selectedIndex];
      var titre = document.getElementById('offre-titre');
      var detail = document.getElementById('offre-detail');
      if (offreSel.value && opt) {
        titre.textContent = opt.text;
        detail.textContent = 'Candidature transmise par ImiziLinks à cette entreprise sous 72 heures.';
      } else {
        titre.textContent = 'Sélectionne une offre ci-dessous';
        detail.textContent = 'Ta candidature sera transmise à cette entreprise par ImiziLinks.';
      }
    };
    offreSel.addEventListener('change', majOffre);
    var offre = param('offre');
    if (offre) { offreSel.value = offre; }
    majOffre();
  }

  /* ═══ Envoi des formulaires ═══
     Confirmation visuelle en attendant le branchement à un service
     de réception (Formspree, Netlify Forms ou autre). */
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      // Formulaire branché (Netlify Forms ou service externe) : envoi normal
      if (form.hasAttribute('action') || form.hasAttribute('data-netlify')) return;
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      if (!btn) return;
      var ancien = btn.textContent;
      btn.textContent = 'Message envoyé ✓';
      btn.style.background = '#736F3D';
      setTimeout(function () {
        btn.textContent = ancien;
        btn.style.background = '';
        form.reset();
        if (motifSel) motifSel.dispatchEvent(new Event('change'));
        if (offreSel) offreSel.dispatchEvent(new Event('change'));
      }, 2600);
    });
  });
})();
