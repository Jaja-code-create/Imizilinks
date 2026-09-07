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

  /* ═══ Formulaire de contact : champs selon le motif ═══ */
  var motifSel = document.getElementById('f-motif');
  if (motifSel) {
    var REGLES = {
      aide:        { blocs: ['bloc-arrivee', 'bloc-besoin'], msg: 'Décris ta situation' },
      emploi:      { blocs: ['bloc-secteur', 'bloc-villeres'], msg: 'Parle-nous de ton parcours' },
      event:       { blocs: ['bloc-event'], msg: 'Une question ou une précision ? (facultatif)' },
      referent:    { blocs: ['bloc-villeres'], msg: 'Sur quoi peux-tu aider ?' },
      article:     { blocs: [], msg: 'Quel sujet veux-tu traiter ?' },
      organiser:   { blocs: ['bloc-villeres'], msg: "Décris ton idée d'événement" },
      partenariat: { blocs: [], msg: 'Présente ta structure et ton projet' },
      autre:       { blocs: [], msg: 'Ton message' }
    };
    var TOUS = ['bloc-arrivee', 'bloc-besoin', 'bloc-event', 'bloc-secteur', 'bloc-villeres'];

    var majFormulaire = function () {
      var regle = REGLES[motifSel.value] || { blocs: [], msg: 'Ton message' };
      TOUS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.toggle('on', regle.blocs.indexOf(id) > -1);
      });
      var lbl = document.getElementById('lbl-msg');
      if (lbl) lbl.textContent = regle.msg;
      var msg = document.getElementById('f-msg');
      if (msg) msg.required = (motifSel.value !== 'event');
    };
    motifSel.addEventListener('change', majFormulaire);

    // Pré-remplissage depuis l'URL : ?motif=aide  ou  ?motif=event&ev=...
    var motif = param('motif');
    if (motif) { motifSel.value = motif; }
    majFormulaire();

    var ev = param('ev');
    if (ev) {
      var evSel = document.getElementById('f-event');
      if (evSel) {
        for (var k = 0; k < evSel.options.length; k++) {
          if (evSel.options[k].text === ev) { evSel.selectedIndex = k; }
        }
      }
    }
    if (motif) {
      var form = document.querySelector('.form-solo');
      if (form) {
        setTimeout(function () {
          window.scrollTo({ top: form.offsetTop - 90, behavior: 'smooth' });
        }, 200);
      }
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
