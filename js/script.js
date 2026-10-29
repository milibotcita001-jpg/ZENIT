/* ==================================================================
   VENTINO – Instituto de Bellas Artes
   JavaScript principal (vanilla JS, sin dependencias)
   ------------------------------------------------------------------
   Índice:
   01. Configuración editable (CONFIG)
   02. Datos de las carreras (CAREERS)
   03. Utilidades
   04. Servicio de datos (preparado para base de datos / API)
   05. Preloader + texto animado
   06. Navegación (scroll, sección activa, menú móvil)
   07. Scroll reveal + contadores
   08. Parallax, tilt, botones magnéticos, cursor
   09. Pestañas y acordeón
   10. Modales (carreras y noticias)
   11. Galería (filtros + lightbox)
   12. Formularios (validación, inscripción, contacto, suscripción)
   13. Mapa, volver arriba, inicialización
   ================================================================== */
(function () {
  "use strict";

  /* ================================================================
     01. CONFIGURACIÓN EDITABLE
     Cambia aquí los datos institucionales y los endpoints.
     ================================================================ */
  const CONFIG = {
    address: "Av. de las Artes 1020, Lima, Perú",
    phone: "+51 1 234 5678",
    email: "admision@zenit.edu",
    // Texto que se buscará en Google Maps (puede ser dirección o coordenadas "lat,lng")
    mapQuery: "Av. de las Artes 1020, Lima, Perú",

    /* Endpoints para la conexión futura con base de datos / servicio de correo.
       - Déjalos en null para guardar los envíos en localStorage (modo demo).
       - Ejemplos: "https://api.zenit.edu/inscripciones",
                   "https://formspree.io/f/XXXX", una función de Firebase,
                   Supabase REST, un script PHP, etc. */
    endpoints: {
      enroll: null,     // Formulario de inscripción
      contact: null,    // Formulario de consultas
      subscribe: null   // Newsletter (Mailchimp, Brevo, Sendinblue, etc.)
    }
  };

  /* ================================================================
     02. DATOS DE LAS CARRERAS
     Edita aquí planes de estudio, competencias y perfiles.
     ================================================================ */
  const CAREERS = {
    diseno: {
      num: "01",
      name: "Diseño Gráfico",
      tagline: "Comunicación visual · Identidad · Ilustración · Editorial · Digital",
      desc: "La carrera de Diseño Gráfico forma profesionales capaces de resolver problemas de comunicación mediante imágenes, tipografía y sistemas visuales. Combina fundamentos clásicos del diseño con herramientas digitales actuales, para crear marcas, publicaciones, ilustraciones e interfaces con identidad y propósito.",
      plan: [
        ["Fundamentos del diseño", "Dibujo y representación", "Teoría del color", "Historia del arte I", "Herramientas digitales I", "Taller de creatividad"],
        ["Comunicación visual", "Tipografía I", "Fotografía básica", "Historia del arte II", "Herramientas digitales II", "Semiótica de la imagen"],
        ["Identidad corporativa", "Tipografía II", "Ilustración I", "Diseño editorial I", "Producción gráfica", "Proyecto integrador I"],
        ["Branding estratégico", "Ilustración II", "Diseño editorial II", "Diseño de empaques", "Motion graphics I", "Marketing visual"],
        ["Diseño digital y UI", "Experiencia de usuario (UX)", "Motion graphics II", "Dirección de arte", "Diseño de información", "Proyecto integrador II"],
        ["Portafolio profesional", "Gestión de proyectos creativos", "Emprendimiento creativo", "Ética y legislación", "Prácticas profesionales", "Proyecto de titulación"]
      ],
      competencias: [
        "Desarrollar sistemas de identidad visual coherentes y memorables.",
        "Dominar la tipografía, la composición y la teoría del color.",
        "Crear ilustraciones con estilo propio en técnicas tradicionales y digitales.",
        "Diseñar publicaciones editoriales impresas y digitales.",
        "Prototipar interfaces y experiencias digitales centradas en el usuario.",
        "Dirigir proyectos creativos desde la estrategia hasta la producción."
      ],
      perfilIntro: "El egresado de Diseño Gráfico de zenit es un comunicador visual estratégico, creativo y versátil, preparado para trabajar en:",
      perfil: ["Agencias de publicidad y branding", "Estudios de diseño e ilustración", "Editoriales y medios digitales", "Equipos de producto digital (UI/UX)", "Departamentos de marketing", "Emprendimiento propio y freelance"]
    },
    plasticas: {
      num: "02",
      name: "Artes Plásticas",
      tagline: "Pintura · Dibujo artístico · Escultura · Grabado · Técnicas mixtas",
      desc: "Artes Plásticas es una carrera dedicada a la exploración de la materia, la forma y el concepto. Los estudiantes desarrollan una obra personal sólida, combinando el dominio técnico de las disciplinas tradicionales con la experimentación contemporánea y el pensamiento crítico.",
      plan: [
        ["Dibujo artístico I", "Fundamentos de la forma", "Teoría del color", "Historia del arte I", "Materiales y técnicas", "Taller de creatividad"],
        ["Dibujo artístico II", "Pintura I", "Modelado y volumen", "Historia del arte II", "Anatomía artística", "Composición"],
        ["Pintura II", "Escultura I", "Grabado I", "Arte latinoamericano", "Fotografía artística", "Proyecto integrador I"],
        ["Pintura III", "Escultura II", "Grabado II", "Técnicas mixtas", "Arte contemporáneo", "Estética y filosofía del arte"],
        ["Taller de obra personal", "Instalación y arte objeto", "Arte digital", "Curaduría y museografía", "Investigación artística", "Proyecto integrador II"],
        ["Producción de exposición", "Gestión cultural", "Portafolio y discurso artístico", "Mercado del arte", "Prácticas profesionales", "Proyecto de titulación"]
      ],
      competencias: [
        "Dominar técnicas de pintura, dibujo, escultura y grabado.",
        "Experimentar con técnicas mixtas, instalación y nuevos medios.",
        "Construir un discurso artístico propio y fundamentado.",
        "Investigar y contextualizar su obra en la historia del arte.",
        "Planificar, montar y curar exposiciones.",
        "Gestionar proyectos culturales y su carrera como artista."
      ],
      perfilIntro: "El egresado de Artes Plásticas de zenit es un artista visual con identidad, técnica y visión crítica, preparado para desempeñarse como:",
      perfil: ["Artista visual independiente", "Pintor/a, escultor/a o grabador/a", "Curador/a y museógrafo/a", "Gestor/a cultural", "Docente de arte", "Ilustrador/a y muralista"]
    },
    musica: {
      num: "03",
      name: "Música",
      tagline: "Interpretación · Instrumentos · Composición · Producción · Formación vocal",
      desc: "La carrera de Música forma intérpretes, compositores y productores con sólida base teórica y práctica. Los estudiantes desarrollan su instrumento o voz, aprenden a componer y arreglar, y dominan la producción musical en estudio, preparándose para escenarios y la industria actual.",
      plan: [
        ["Lenguaje musical I", "Instrumento principal I", "Entrenamiento auditivo I", "Historia de la música I", "Técnica vocal I", "Ensamble I"],
        ["Lenguaje musical II", "Instrumento principal II", "Armonía I", "Historia de la música II", "Piano complementario", "Ensamble II"],
        ["Armonía II", "Instrumento principal III", "Composición I", "Introducción a la producción", "Música latinoamericana", "Proyecto integrador I"],
        ["Contrapunto y arreglos", "Instrumento principal IV", "Composición II", "Producción musical I", "Formación vocal avanzada", "Ensamble III"],
        ["Orquestación", "Instrumento principal V", "Producción musical II", "Mezcla y masterización", "Música para medios", "Proyecto integrador II"],
        ["Recital de grado", "Gestión musical y derechos", "Emprendimiento musical", "Dirección de ensambles", "Prácticas profesionales", "Proyecto de titulación"]
      ],
      competencias: [
        "Interpretar repertorio diverso con técnica y expresividad.",
        "Leer, escribir y analizar música con fluidez.",
        "Componer y arreglar obras para distintos formatos.",
        "Producir, grabar, mezclar y masterizar en estudio.",
        "Desarrollar técnica vocal saludable y expresiva.",
        "Liderar ensambles y proyectos musicales profesionales."
      ],
      perfilIntro: "El egresado de Música de zenit es un músico integral, sensible y técnicamente preparado para trabajar como:",
      perfil: ["Intérprete solista o en agrupaciones", "Compositor/a y arreglista", "Productor/a musical", "Músico para cine, TV y videojuegos", "Director/a de coro o ensamble", "Docente de música"]
    },
    danza: {
      num: "04",
      name: "Danza y Artes Escénicas",
      tagline: "Danza contemporánea · Expresión corporal · Interpretación · Coreografía · Teatro",
      desc: "Danza y Artes Escénicas forma intérpretes y creadores escénicos que utilizan el cuerpo como herramienta de expresión. La carrera integra danza contemporánea, actuación, expresión corporal y creación coreográfica, desarrollando artistas completos capaces de crear y conmover en escena.",
      plan: [
        ["Técnica de danza I", "Expresión corporal I", "Conciencia corporal", "Historia de la danza", "Música para la danza", "Iniciación teatral"],
        ["Técnica de danza II", "Danza contemporánea I", "Expresión corporal II", "Actuación I", "Anatomía del movimiento", "Improvisación"],
        ["Danza contemporánea II", "Ballet complementario", "Actuación II", "Composición coreográfica I", "Voz y dicción", "Proyecto integrador I"],
        ["Danza contemporánea III", "Danzas tradicionales", "Interpretación escénica", "Composición coreográfica II", "Dramaturgia del cuerpo", "Teatro físico"],
        ["Repertorio contemporáneo", "Coreografía", "Dirección escénica", "Danza y nuevos medios", "Producción escénica", "Proyecto integrador II"],
        ["Montaje de obra de grado", "Gestión de compañías", "Pedagogía de la danza", "Emprendimiento escénico", "Prácticas profesionales", "Proyecto de titulación"]
      ],
      competencias: [
        "Dominar la técnica de danza contemporánea y otros lenguajes del movimiento.",
        "Interpretar personajes y situaciones con verdad escénica.",
        "Crear y dirigir piezas coreográficas originales.",
        "Integrar voz, cuerpo y emoción en la actuación.",
        "Producir y gestionar montajes escénicos.",
        "Trabajar en equipo dentro de compañías y colectivos."
      ],
      perfilIntro: "El egresado de Danza y Artes Escénicas de zenit es un artista escénico expresivo y versátil, preparado para desempeñarse como:",
      perfil: ["Bailarín/a profesional", "Actor/actriz de teatro", "Coreógrafo/a", "Director/a escénico/a", "Integrante de compañías nacionales e internacionales", "Docente de danza y teatro"]
    }
  };

  /* ================================================================
     03. UTILIDADES
     ================================================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  /** Muestra una notificación temporal (toast). type: "success" | "error" */
  function toast(message, type = "success") {
    const stack = $("#toastStack");
    if (!stack) return;
    const el = document.createElement("div");
    el.className = "toast" + (type === "error" ? " toast--error" : "");
    el.textContent = message;
    stack.appendChild(el);
    setTimeout(() => {
      el.classList.add("is-out");
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }, 4200);
  }

  /* ================================================================
     04. SERVICIO DE DATOS
     Punto único de conexión con la base de datos o servicio externo.
     Si CONFIG.endpoints[tipo] tiene una URL, se envía un POST JSON.
     Si no, los datos se guardan en localStorage (modo demostración).
     ================================================================ */
  const DataService = {
    async save(type, data) {
      const payload = { ...data, tipo: type, fecha_envio: new Date().toISOString() };
      const endpoint = CONFIG.endpoints[type];

      if (endpoint) {
        // ---- Conexión real (API / base de datos) ----
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Error del servidor: " + res.status);
        return res.json().catch(() => ({ ok: true }));
      }

      // ---- Modo demo: localStorage ----
      await new Promise((r) => setTimeout(r, 900)); // simula latencia de red
      const key = "zenit_" + type;
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      payload.id = "VTN-" + Date.now().toString(36).toUpperCase();
      list.push(payload);
      localStorage.setItem(key, JSON.stringify(list));
      return { ok: true, id: payload.id };
    },
    /** Consulta los registros guardados en modo demo (útil para pruebas en consola). */
    list(type) { return JSON.parse(localStorage.getItem("zenit_" + type) || "[]"); }
  };
  // Acceso desde la consola del navegador: zenit.data.list("enroll")
  window.zenit = { data: DataService, config: CONFIG };

  /* ================================================================
     05. PRELOADER + TEXTO ANIMADO
     ================================================================ */
  function initPreloader() {
    const preloader = $("#preloader");
    const bar = $("#preloaderBar");
    if (!preloader) return;
    let progress = 0;
    const minTime = prefersReduced ? 200 : 2000;
    const start = performance.now();

    const tick = setInterval(() => {
      progress = Math.min(progress + Math.random() * 18, 92);
      bar.style.width = progress + "%";
    }, 160);

    function finish() {
      const wait = Math.max(0, minTime - (performance.now() - start));
      setTimeout(() => {
        clearInterval(tick);
        bar.style.width = "100%";
        setTimeout(() => {
          preloader.classList.add("is-hidden");
          document.body.classList.remove("is-loading");
          setTimeout(() => preloader.remove(), 900);
        }, 250);
      }, wait);
    }
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    setTimeout(finish, 5000); // seguridad por si alguna imagen tarda demasiado
  }

  /** Divide el texto en letras para animarlas una a una */
  function initSplitText() {
    $$("[data-split]").forEach((el) => {
      const text = el.textContent;
      el.textContent = "";
      [...text].forEach((ch, i) => {
        const span = document.createElement("span");
        span.className = "char";
        span.style.setProperty("--i", i);
        span.textContent = ch === " " ? "\u00A0" : ch;
        span.setAttribute("aria-hidden", "true");
        el.appendChild(span);
      });
    });
  }

  /** Rota las palabras: se siente / se crea / se expresa */
  function initRotator() {
    const word = $("#rotatorWord");
    if (!word || prefersReduced) return;
    const words = ["se siente", "se crea", "se expresa"];
    let i = 0;
    setInterval(() => {
      word.classList.add("is-out");
      setTimeout(() => {
        i = (i + 1) % words.length;
        word.textContent = words[i];
        word.classList.remove("is-out");
      }, 450);
    }, 2600);
  }

  /* ================================================================
     06. NAVEGACIÓN
     ================================================================ */
  function initNavigation() {
    const header = $("#header");
    const menu = $("#navMenu");
    const toggle = $("#navToggle");
    const links = $$(".nav__link");
    const indicator = $("#navIndicator");
    const progressBar = $("#scrollProgress");
    const toTop = $("#toTop");
    const ring = $(".to-top__ring circle");
    const RING_LEN = 138.2;
    const sections = links.map((l) => $("#" + l.dataset.section)).filter(Boolean);
    let lastY = window.scrollY;

    /* --- Indicador de sección activa --- */
    function moveIndicator(link) {
      if (!indicator || !link) return;
      indicator.style.left = link.offsetLeft + 12 + "px";
      indicator.style.width = link.offsetWidth - 24 + "px";
    }
    function setActive(id) {
      links.forEach((l) => {
        const on = l.dataset.section === id;
        l.classList.toggle("active", on);
        if (on) { l.setAttribute("aria-current", "true"); moveIndicator(l); }
        else l.removeAttribute("aria-current");
      });
    }

    /* --- Eventos de scroll (con requestAnimationFrame) --- */
    let ticking = false;
    function onScroll() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? y / max : 0;

      header.classList.toggle("is-scrolled", y > 40);
      // Ocultar el menú al bajar y mostrarlo al subir
      const menuOpen = menu.classList.contains("open");
      header.classList.toggle("is-hidden", !menuOpen && y > lastY && y > 600);
      lastY = y;

      progressBar.style.transform = `scaleX(${ratio})`;
      toTop.classList.toggle("is-visible", y > 700);
      if (ring) ring.style.strokeDashoffset = RING_LEN - RING_LEN * ratio;

      // Sección activa: la última cuya parte superior pasó el 40% del viewport
      const mark = window.innerHeight * 0.4;
      let current = sections[0] && sections[0].id;
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= mark) current = s.id; });
      // "por-que", "suscripcion" no están en el menú, se mantiene la anterior
      setActive(current);
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", () => moveIndicator($(".nav__link.active")));
    onScroll();

    /* --- Hover del indicador en escritorio --- */
    links.forEach((l) => {
      l.addEventListener("mouseenter", () => moveIndicator(l));
      l.addEventListener("mouseleave", () => moveIndicator($(".nav__link.active")));
    });

    /* --- Menú hamburguesa --- */
    function closeMenu() {
      menu.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      document.body.classList.remove("no-scroll");
    }
    toggle.addEventListener("click", () => {
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      document.body.classList.toggle("no-scroll", open);
      header.classList.remove("is-hidden");
    });
    $$("a", menu).forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) closeMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 1024) closeMenu(); });

    /* --- Volver arriba --- */
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }));

    // Recalcular indicador cuando cargan las fuentes
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveIndicator($(".nav__link.active")));
  }

  /* ================================================================
     07. SCROLL REVEAL + CONTADORES
     ================================================================ */
  function initReveal() {
    const items = $$(".reveal, .process");
    if (!("IntersectionObserver" in window) || prefersReduced) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el) => io.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const p = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = $$(".counter");
    if (!("IntersectionObserver" in window)) { counters.forEach(animateCounter); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Esperar a que termine el preloader para los contadores del hero
          const run = () => animateCounter(entry.target);
          if (document.body.classList.contains("is-loading")) setTimeout(run, 2400); else run();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  }

  /* ================================================================
     08. PARALLAX, TILT, BOTONES MAGNÉTICOS Y CURSOR
     ================================================================ */
  function initParallax() {
    if (prefersReduced) return;
    const hero = $(".hero");
    const layers = $$("[data-depth]", hero);
    const media = $(".hero__media");
    const scrollEls = $$(".parallax[data-speed]");
    let mx = 0, my = 0, cx = 0, cy = 0;

    // Movimiento con el mouse en el hero (efecto de profundidad)
    if (finePointer) {
      hero.addEventListener("mousemove", (e) => {
        const r = hero.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - 0.5;
        my = (e.clientY - r.top) / r.height - 0.5;
      });
      hero.addEventListener("mouseleave", () => { mx = 0; my = 0; });
    }

    function loop() {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      const sy = window.scrollY;
      const heroVisible = sy < window.innerHeight * 1.2;

      if (heroVisible) {
        layers.forEach((el) => {
          const d = parseFloat(el.dataset.depth) || 0;
          const extraY = el === media ? sy * 0.25 : sy * d * 0.3;
          el.style.translate = `${cx * d * -60}px ${cy * d * -60 + extraY}px`;
        });
      }
      // Parallax de imágenes en el scroll
      scrollEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const speed = parseFloat(el.dataset.speed) || 0;
        const offset = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
        el.style.translate = `0 ${offset}px`;
      });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /** Tarjetas interactivas con inclinación 3D */
  function initTilt() {
    if (prefersReduced || !finePointer) return;
    $$(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /** Botones magnéticos que siguen ligeramente al cursor */
  function initMagnetic() {
    if (prefersReduced || !finePointer) return;
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /** Cursor personalizado opcional (se guarda la preferencia) */
  function initCursor() {
    const dot = $("#cursorDot");
    const ring = $("#cursorRing");
    const toggle = $("#cursorToggle");
    if (!finePointer || prefersReduced) { if (toggle) toggle.style.display = "none"; return; }

    let enabled = localStorage.getItem("zenit_cursor") !== "off";
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;

    function apply() {
      document.body.classList.toggle("cursor-on", enabled);
      toggle.classList.toggle("active", enabled);
      toggle.setAttribute("aria-pressed", String(enabled));
    }
    toggle.addEventListener("click", () => {
      enabled = !enabled;
      localStorage.setItem("zenit_cursor", enabled ? "on" : "off");
      apply();
      toast(enabled ? "Cursor artístico activado" : "Cursor artístico desactivado");
    });
    apply();

    window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    document.addEventListener("mouseover", (e) => {
      const interactive = e.target.closest("a, button, .g-item, input, select, textarea, label");
      ring.classList.toggle("is-hover", !!interactive);
    });
    (function loop() {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ================================================================
     09. PESTAÑAS Y ACORDEÓN
     ================================================================ */
  function activateTab(container, name) {
    $$(".tabs__btn", container).forEach((b) => {
      const on = b.dataset.tab === name;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", String(on));
    });
    $$(".tabs__panel", container).forEach((p) => p.classList.toggle("active", p.dataset.panel === name));
  }
  function initTabs() {
    $$("[data-tabs]").forEach((container) => {
      $$(".tabs__btn", container).forEach((btn) => {
        btn.addEventListener("click", () => activateTab(container, btn.dataset.tab));
      });
    });
  }

  function initAccordion() {
    $$(".accordion__item").forEach((item) => {
      const btn = $(".accordion__btn", item);
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        // Cierra los demás para mantener orden
        $$(".accordion__item.open", item.parentElement).forEach((o) => {
          o.classList.remove("open");
          $(".accordion__btn", o).setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ================================================================
     10. MODALES
     ================================================================ */
  let lastFocused = null;

  function openModal(modal) {
    lastFocused = document.activeElement;
    modal.hidden = false;
    modal.classList.remove("is-closing");
    document.body.classList.add("no-scroll");
    const dialog = $(".modal__dialog", modal) || modal;
    dialog.scrollTop = 0;
    setTimeout(() => { const c = $(".modal__close, .lightbox__close", modal); if (c) c.focus(); }, 50);
  }
  function closeModal(modal) {
    if (!modal || modal.hidden) return;
    const done = () => {
      modal.hidden = true;
      modal.classList.remove("is-closing");
      if (!$(".modal:not([hidden]), .lightbox:not([hidden])")) document.body.classList.remove("no-scroll");
      if (lastFocused) lastFocused.focus({ preventScroll: true });
    };
    if (prefersReduced || modal.classList.contains("lightbox")) return done();
    modal.classList.add("is-closing");
    setTimeout(done, 340);
  }

  function initModals() {
    // Cierre por botón, overlay o tecla Escape
    $$(".modal, .lightbox").forEach((modal) => {
      $$("[data-close]", modal).forEach((el) => el.addEventListener("click", () => {
        closeModal(modal);
        const target = el.dataset.goto;
        if (target) setTimeout(() => $(target).scrollIntoView({ behavior: "smooth" }), 360);
      }));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      $$(".modal:not([hidden]), .lightbox:not([hidden])").forEach(closeModal);
    });
    // Mantener el foco dentro del modal abierto (accesibilidad)
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const open = $(".modal:not([hidden]), .lightbox:not([hidden])");
      if (!open) return;
      const f = $$("button, a[href], input, select, textarea", open).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* --- Modal de carrera --- */
  function initCareers() {
    const modal = $("#careerModal");
    let currentCareer = null;

    function openCareer(id) {
      const c = CAREERS[id];
      if (!c) return;
      currentCareer = c;
      const cardImg = $(`.career-card[data-career="${id}"] img`);
      $("#cmImg").src = cardImg ? cardImg.currentSrc || cardImg.src : "";
      $("#cmImg").alt = c.name;
      $("#cmNum").textContent = c.num;
      $("#careerModalTitle").textContent = c.name;
      $("#cmTagline").textContent = c.tagline;
      $("#cmDesc").textContent = c.desc;

      // Plan de estudios por semestre
      $("#cmPlan").innerHTML = c.plan.map((subjects, i) => `
        <div class="semester">
          <h5>Semestre ${i + 1}</h5>
          <ul>${subjects.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>`).join("");
      $("#cmComp").innerHTML = c.competencias.map((s) => `<li>${s}</li>`).join("");
      $("#cmPerfilIntro").textContent = c.perfilIntro;
      $("#cmPerfil").innerHTML = c.perfil.map((s) => `<li>${s}</li>`).join("");

      activateTab($("[data-tabs]", modal), "plan");
      openModal(modal);
    }

    $$("[data-open-career]").forEach((btn) => btn.addEventListener("click", () => openCareer(btn.dataset.openCareer)));
    // Clic en la imagen de la tarjeta también abre la carrera
    $$(".career-card__media").forEach((m) => {
      m.style.cursor = "pointer";
      m.addEventListener("click", () => openCareer(m.closest(".career-card").dataset.career));
    });

    $("#cmEnroll").addEventListener("click", () => {
      closeModal(modal);
      setTimeout(() => goToEnroll(currentCareer.name), 360);
    });
    $$("[data-enroll]").forEach((btn) => btn.addEventListener("click", () => goToEnroll(btn.dataset.enroll)));
  }

  /** Lleva al formulario de inscripción con la carrera preseleccionada */
  function goToEnroll(careerName) {
    const select = $("#fCarrera");
    const card = $("#inscripcion");
    if (careerName && select) {
      select.value = careerName;
      select.dispatchEvent(new Event("change"));
    }
    card.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    card.classList.remove("is-highlight");
    void card.offsetWidth; // reinicia la animación
    card.classList.add("is-highlight");
    setTimeout(() => $("#fNombres").focus({ preventScroll: true }), 900);
    if (careerName) toast(`Carrera seleccionada: ${careerName}`);
  }

  /* --- Modal de noticias --- */
  function initNews() {
    const modal = $("#newsModal");
    $$("[data-open-news]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".news-card");
        const img = $("img", card);
        $("#nmImg").src = img.currentSrc || img.src;
        $("#nmImg").alt = img.alt;
        $("#nmCat").textContent = $(".news-card__cat", card).textContent;
        $("#nmDate").textContent = $("time", card).textContent;
        $("#newsModalTitle").textContent = $("h3", card).textContent;
        $("#nmContent").innerHTML = $(".news-card__full", card).innerHTML;
        openModal(modal);
      });
    });
  }

  /* ================================================================
     11. GALERÍA: FILTROS + LIGHTBOX
     ================================================================ */
  function initGallery() {
    const items = $$(".g-item");
    const buttons = $$(".filter-btn");
    const lb = $("#lightbox");
    const lbImg = $("#lbImg");
    const lbCaption = $("#lbCaption");
    const lbCounter = $("#lbCounter");
    let visible = items.slice();
    let index = 0;

    // Filtros por categoría
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        buttons.forEach((b) => b.classList.toggle("active", b === btn));
        items.forEach((item, i) => {
          const show = f === "all" || item.dataset.category === f;
          item.classList.toggle("is-hidden", !show);
          item.classList.remove("is-entering");
          if (show) {
            void item.offsetWidth;
            item.style.animationDelay = (i % 8) * 40 + "ms";
            item.classList.add("is-entering");
          }
        });
        visible = items.filter((it) => !it.classList.contains("is-hidden"));
      });
    });

    // Lightbox
    function show(i) {
      index = (i + visible.length) % visible.length;
      const item = visible[index];
      const img = $("img", item);
      const cap = $("figcaption", item);
      lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCaption.innerHTML = cap ? cap.innerHTML : "";
      lbCounter.textContent = `${index + 1} / ${visible.length}`;
    }
    items.forEach((item) => {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      const open = () => { show(visible.indexOf(item)); openModal(lb); };
      item.addEventListener("click", open);
      item.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    $("#lbPrev").addEventListener("click", () => show(index - 1));
    $("#lbNext").addEventListener("click", () => show(index + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lightbox__figure")) closeModal(lb); });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
    // Gestos táctiles (swipe)
    let touchX = null;
    lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  /* ================================================================
     12. FORMULARIOS
     ================================================================ */
  const RX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    name: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' ]+$/,
    doc: /^[A-Za-z0-9-]{6,15}$/,
    phone: /^\+?[\d\s()-]{7,20}$/
  };

  /** Reglas de validación por nombre de campo. Devuelven "" si es válido o el mensaje de error. */
  const RULES = {
    nombres(v) {
      if (!v) return "Ingresa tus nombres y apellidos.";
      if (!RX.name.test(v)) return "Usa solo letras y espacios.";
      if (v.split(/\s+/).filter(Boolean).length < 2) return "Ingresa al menos un nombre y un apellido.";
      return "";
    },
    nombre(v) {
      if (!v) return "Ingresa tu nombre.";
      if (v.length < 3 || !RX.name.test(v)) return "Ingresa un nombre válido.";
      return "";
    },
    documento(v) {
      if (!v) return "Ingresa tu documento de identidad.";
      if (!RX.doc.test(v)) return "Documento inválido (6 a 15 caracteres, sin espacios).";
      return "";
    },
    nacimiento(v) {
      if (!v) return "Selecciona tu fecha de nacimiento.";
      const d = new Date(v + "T00:00:00");
      if (isNaN(d)) return "Fecha inválida.";
      const today = new Date();
      if (d > today) return "La fecha no puede ser futura.";
      let age = today.getFullYear() - d.getFullYear();
      const m = today.getMonth() - d.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
      if (age < 14) return "Debes tener al menos 14 años para postular.";
      if (age > 90) return "Revisa la fecha ingresada.";
      return "";
    },
    correo(v) {
      if (!v) return "Ingresa tu correo electrónico.";
      if (!RX.email.test(v)) return "Ingresa un correo válido (ej. nombre@correo.com).";
      return "";
    },
    celular(v) {
      if (!v) return "Ingresa tu número de celular.";
      const digits = v.replace(/\D/g, "");
      if (!RX.phone.test(v) || digits.length < 7 || digits.length > 15) return "Ingresa un número válido (7 a 15 dígitos).";
      return "";
    },
    carrera(v) { return v ? "" : "Selecciona la carrera de tu interés."; },
    asunto(v) { return v ? "" : "Selecciona un asunto."; },
    mensaje(v) {
      if (!v) return "Escribe un mensaje.";
      if (v.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
      return "";
    }
  };

  function validateField(input) {
    const rule = RULES[input.name];
    if (!rule) return true;
    const field = input.closest(".field");
    const error = rule(input.value.trim());
    field.classList.toggle("has-error", !!error);
    field.classList.toggle("is-valid", !error);
    $(".field__error", field).textContent = error;
    input.setAttribute("aria-invalid", String(!!error));
    return !error;
  }

  function serialize(form) {
    const data = {};
    new FormData(form).forEach((v, k) => { data[k] = typeof v === "string" ? v.trim() : v; });
    return data;
  }

  function successMarkup(title, text, extra = "") {
    return `
      <div class="form-success" role="status">
        <svg class="form-success__icon" viewBox="0 0 90 90" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="45" cy="45" r="40" /><path d="M28 46l12 12 22-24" />
        </svg>
        <h4>${title}</h4>
        <p>${text}</p>
        ${extra}
        <button type="button" class="btn btn--outline btn--sm" data-reset-form>Enviar otro</button>
      </div>`;
  }

  /** Configura un formulario con validación en vivo y envío */
  function setupForm(form, type, { onSuccess, extraValidate } = {}) {
    if (!form) return;
    const inputs = $$("input:not([type=checkbox]), select, textarea", form);

    inputs.forEach((input) => {
      input.addEventListener("blur", () => { if (input.value) validateField(input); });
      input.addEventListener("input", () => { if (input.closest(".field").classList.contains("has-error")) validateField(input); });
      input.addEventListener("change", () => validateField(input));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let ok = true;
      let firstInvalid = null;
      inputs.forEach((input) => {
        if (!validateField(input)) { ok = false; firstInvalid = firstInvalid || input; }
      });
      if (extraValidate && !extraValidate()) { ok = false; }
      if (!ok) {
        toast("Revisa los campos marcados en rosa.", "error");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const btn = $("button[type=submit]", form);
      btn.classList.add("is-loading");
      try {
        const data = serialize(form);
        const res = await DataService.save(type, data);
        const original = form.innerHTML;
        form.innerHTML = onSuccess(data, res);
        $("[data-reset-form]", form).addEventListener("click", () => {
          form.innerHTML = original;
          setupFormAgain(form, type, { onSuccess, extraValidate });
        });
      } catch (err) {
        console.error(err);
        toast("No pudimos enviar el formulario. Inténtalo nuevamente.", "error");
      } finally {
        btn.classList.remove("is-loading");
      }
    });
  }
  // Re-inicializa listeners tras restaurar el HTML del formulario
  function setupFormAgain(form, type, opts) {
    const clone = form.cloneNode(true);
    form.replaceWith(clone);
    setupForm(clone, type, opts);
    if (clone.id === "enrollForm") initMessageCounter();
  }

  function initMessageCounter() {
    const msg = $("#fMensaje");
    const count = $("#msgCount");
    if (!msg || !count) return;
    const update = () => { count.textContent = `${msg.value.length}/500`; };
    msg.addEventListener("input", update);
    update();
  }

  function initForms() {
    // Límite de fecha de nacimiento (no futura)
    const birth = $("#fNacimiento");
    if (birth) birth.max = new Date().toISOString().split("T")[0];
    initMessageCounter();

    // ---- Inscripción ----
    setupForm($("#enrollForm"), "enroll", {
      extraValidate() {
        const terms = $("#fTerminos");
        const err = $("#terminosError");
        if (!terms) return true;
        err.textContent = terms.checked ? "" : "Debes aceptar el tratamiento de datos.";
        return terms.checked;
      },
      onSuccess(data, res) {
        toast("¡Inscripción enviada con éxito!");
        const first = data.nombres.split(" ")[0];
        return successMarkup(
          `¡Gracias, ${escapeHTML(first)}!`,
          `Recibimos tu inscripción para <strong>${escapeHTML(data.carrera)}</strong>. Te escribiremos a <strong>${escapeHTML(data.correo)}</strong> con los siguientes pasos del proceso de admisión.`,
          res && res.id ? `<p>Código de registro: <code>${res.id}</code></p>` : ""
        );
      }
    });

    // ---- Consultas ----
    setupForm($("#contactForm"), "contact", {
      onSuccess(data) {
        toast("Consulta enviada. ¡Te responderemos pronto!");
        return successMarkup(
          "Consulta recibida",
          `Gracias, ${escapeHTML(data.nombre.split(" ")[0])}. Responderemos a <strong>${escapeHTML(data.correo)}</strong> en menos de 24 horas hábiles.`
        );
      }
    });

    // ---- Suscripción ----
    const sub = $("#subscribeForm");
    const subMsg = $("#subscribeMsg");
    sub.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = $("#subEmail");
      const email = input.value.trim().toLowerCase();
      sub.classList.remove("has-error");
      subMsg.classList.remove("is-error");

      if (!email || !RX.email.test(email)) {
        void sub.offsetWidth;
        sub.classList.add("has-error");
        subMsg.classList.add("is-error");
        subMsg.textContent = email ? "Ese correo no parece válido. Revísalo, por favor." : "Escribe tu correo electrónico para suscribirte.";
        input.focus();
        return;
      }
      if (DataService.list("subscribe").some((s) => s.email === email)) {
        subMsg.textContent = "Este correo ya está suscrito. ¡Gracias por ser parte de zenit! ✦";
        return;
      }
      const btn = $("button", sub);
      btn.disabled = true;
      btn.textContent = "Enviando...";
      try {
        await DataService.save("subscribe", { email });
        subMsg.textContent = "¡Listo! Ya eres parte de la comunidad zenit. Revisa tu bandeja de entrada ✦";
        input.value = "";
        toast("Suscripción confirmada");
      } catch (err) {
        subMsg.classList.add("is-error");
        subMsg.textContent = "No pudimos completar la suscripción. Inténtalo más tarde.";
      } finally {
        btn.disabled = false;
        btn.textContent = "Suscribirme";
      }
    });
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ================================================================
     13. MAPA, DATOS DE CONTACTO E INICIALIZACIÓN
     ================================================================ */
  function initContactData() {
    // Sincroniza los datos de CONFIG con el HTML
    $$("[data-config]").forEach((el) => {
      const key = el.dataset.config;
      if (!CONFIG[key]) return;
      el.textContent = CONFIG[key];
      if (key === "phone") el.href = "tel:" + CONFIG.phone.replace(/[^\d+]/g, "");
      if (key === "email") el.href = "mailto:" + CONFIG.email;
    });
  }

  function initMap() {
    const map = $("#map");
    const btn = $("#loadMap");
    if (!map) return;
    let loaded = false;
    function load() {
      if (loaded) return;
      loaded = true;
      const iframe = document.createElement("iframe");
      // Google Maps embed sin API key. Para usar la Maps Embed API reemplaza por:
      // https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=...
      iframe.src = "https://www.google.com/maps?q=" + encodeURIComponent(CONFIG.mapQuery) + "&output=embed";
      iframe.title = "Ubicación de zenit en Google Maps";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      map.appendChild(iframe);
      iframe.addEventListener("load", () => { const p = $(".map__placeholder", map); if (p) p.remove(); });
    }
    btn.addEventListener("click", load);
    // Carga automática al acercarse a la sección (mejora rendimiento inicial)
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { load(); io.disconnect(); }
      }, { rootMargin: "200px" });
      io.observe(map);
    }
  }

  function init() {
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();

    initSplitText();
    initPreloader();
    initRotator();
    initNavigation();
    initReveal();
    initCounters();
    initParallax();
    initTilt();
    initMagnetic();
    initCursor();
    initTabs();
    initAccordion();
    initModals();
    initCareers();
    initNews();
    initGallery();
    initForms();
    initContactData();
    initMap();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
