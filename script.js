(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     HERO: Typewriter in JS (keeps <span class="accent">)
  ========================================================= */
  const h1El = document.getElementById("h1");
  const h2El = document.getElementById("h2");
  const pEl = document.getElementById("p1");
  const heroLines = [h1El, h2El, pEl].filter(Boolean);

  function buildSegments(el) {
    // We preserve inline markup by recreating same element tags/classes
    const segments = [];
    el.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const content = node.textContent;
        if (content && content.length > 0) segments.push({ kind: "text", content });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Example we care about: <span class="accent">...</span>
        const tag = node.tagName.toLowerCase();
        const cls = node.getAttribute("class") || "";
        const content = node.textContent;
        if (content && content.length > 0) segments.push({ kind: "element", tag, cls, content });
      }
    });

    // If element has no childNodes (rare), fallback to its textContent
    if (segments.length === 0) {
      const content = el.textContent || "";
      if (content.length > 0) segments.push({ kind: "text", content });
    }

    return segments;
  }

  function typewriterPreserveMarkup(el, speedMs = 35) {
    return new Promise((resolve) => {
      const segments = buildSegments(el);
      const combined = segments.map((s) => s.content).join("");

      const lengths = segments.map((s) => s.content.length);
      const cumulative = [];
      lengths.reduce((acc, n, idx) => {
        const next = acc + n;
        cumulative[idx] = next;
        return next;
      }, 0);

      // Rebuild empty markup
      el.innerHTML = "";

      const targetTextNodes = [];
      const segmentTexts = segments.map(() => "");

      segments.forEach((seg) => {
        if (seg.kind === "text") {
          const t = document.createTextNode("");
          el.appendChild(t);
          targetTextNodes.push(t);
        } else {
          const wrapper = document.createElement(seg.tag);
          if (seg.cls) wrapper.setAttribute("class", seg.cls);
          const t = document.createTextNode("");
          wrapper.appendChild(t);
          el.appendChild(wrapper);
          targetTextNodes.push(t);
        }
      });

      if (combined.length === 0) {
        resolve();
        return;
      }

      let i = 0;
      const intervalId = window.setInterval(() => {
        const ch = combined.charAt(i);

        // Find segment index for current global char index
        let segIndex = 0;
        while (segIndex < cumulative.length && i >= cumulative[segIndex]) segIndex++;

        // Append char
        segmentTexts[segIndex] += ch;
        targetTextNodes[segIndex].textContent = segmentTexts[segIndex];

        i++;
        if (i >= combined.length) {
          window.clearInterval(intervalId);
          resolve();
        }
      }, speedMs);
    });
  }

    let heroTyped = false;
  async function startHeroTypingOnce() {
    if (heroTyped) return;
    if (prefersReducedMotion) return;
    if (!heroLines.length) return;

    heroTyped = true;

    // On cache toutes les lignes au départ
    heroLines.forEach((el) => {
      el.style.visibility = "hidden";
    });

    const baseSpeed = window.innerWidth <= 480 ? 28 : 35;

    for (let i = 0; i < heroLines.length; i++) {
      const el = heroLines[i];

      // On rend visible UNIQUEMENT la ligne en cours
      el.style.visibility = "visible";

      const segments = buildSegments(el);
      const totalLen = segments.map((s) => s.content.length).reduce((a, b) => a + b, 0);
      const speed = Math.max(18, baseSpeed - Math.min(10, Math.floor(totalLen / 60)));

      await typewriterPreserveMarkup(el, speed);

      // petite pause avant la phrase suivante
      await new Promise((r) => window.setTimeout(r, 160));
    }
  }

  /* =========================================================
     Binary generation (JS: no need for 100 divs in HTML)
  ========================================================= */
  const binaryContainer = document.querySelector(".animation-hero");
  if (binaryContainer) {
    // Avoid duplicating if script runs twice
    binaryContainer.innerHTML = "";

    const count = 45;
    for (let i = 0; i < count; i++) {
      const bit = document.createElement("div");
      bit.className = "binary";
      bit.textContent = Math.random() > 0.5 ? "1" : "0";

      bit.style.top = `${Math.random() * 92}%`;
      bit.style.left = `${Math.random() * 92}%`;
      bit.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;

      binaryContainer.appendChild(bit);
    }
  }

  /* =========================================================
     Apparition progressive (IntersectionObserver)
  ========================================================= */
  const revealElements = document.querySelectorAll(".apparition");
  const heroContainer = document.querySelector(".hero-conteneur.apparition");

  function activate(el) {
    el.classList.add("active");
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          activate(entry.target);

          // Start typing when hero becomes visible
          if (heroContainer && entry.target === heroContainer) {
            startHeroTypingOnce();
          }

          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => io.observe(el));
  } else {
    // Fallback
    const apparitionOnScroll = () => {
      revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          activate(el);
          if (heroContainer && el === heroContainer) startHeroTypingOnce();
        }
      });
    };

    window.addEventListener("scroll", apparitionOnScroll, { passive: true });
    apparitionOnScroll();
  }

  /* =========================================================
     Menu burger + scroll lock
  ========================================================= */
  const setScrollLocked = (locked) => {
    document.body.style.overflow = locked ? "hidden" : "";
  };

  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".liens-navigation");
  const navLinks = document.querySelectorAll(".liens-navigation a");

  const isMenuOpen = () => !!navMenu && navMenu.classList.contains("active");

  const closeMenu = () => {
    if (!burger || !navMenu) return;
    burger.classList.remove("active");
    navMenu.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
    setScrollLocked(false);
  };

  const toggleMenu = () => {
    if (!burger || !navMenu) return;
    burger.classList.toggle("active");
    navMenu.classList.toggle("active");
    const open = isMenuOpen();
    burger.setAttribute("aria-expanded", String(open));
    setScrollLocked(open);
  };

  if (burger && navMenu) {
    burger.addEventListener("click", toggleMenu);
    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (e) => {
      if (!isMenuOpen()) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (burger.contains(target) || navMenu.contains(target)) return;
      closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  /* =========================================================
     Modal image
  ========================================================= */
  const modal = document.getElementById("modalImageContainer");
  const modalImage = document.getElementById("imageModal");
  const closeModalBtn = document.querySelector(".modal .fermer");
  const projectImages = document.querySelectorAll(".carte-projet img");

  const isModalOpen = () => !!modal && modal.classList.contains("show");

  const openModal = (img) => {
    if (!modal || !modalImage) return;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    modalImage.src = img.src;
    modalImage.alt = img.alt || "";
    setScrollLocked(true);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    setScrollLocked(isMenuOpen()); // keep locked if menu is open
  };

  projectImages.forEach((img) => img.addEventListener("click", () => openModal(img)));

  closeModalBtn?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC: modal first, then menu
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (isModalOpen()) closeModal();
    else if (isMenuOpen()) closeMenu();
  });
})();