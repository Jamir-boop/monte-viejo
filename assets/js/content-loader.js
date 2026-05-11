(function () {
  const content = window.siteContent;

  if (!content) {
    return;
  }

  const text = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && typeof value === "string") {
      element.textContent = value;
    }
  };

  const image = (selector, src, alt) => {
    const element = document.querySelector(selector);
    if (!element || typeof src !== "string") {
      return;
    }

    element.src = src;
    if (typeof alt === "string") {
      element.alt = alt;
    }
  };

  const whatsappUrl = (message) => {
    const phone = content.site?.whatsappPhone || "";
    const base = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}`;

    if (!message) {
      return base;
    }

    return `${base}&text=${encodeURIComponent(message)}`;
  };

  const stylesheetUrl = (path) => {
    if (/^(https?:|data:|\/)/.test(path)) {
      return path;
    }

    if (path.startsWith("assets/")) {
      return `../${path.slice("assets/".length)}`;
    }

    return path;
  };

  const setLink = (selector, label, href) => {
    const element = document.querySelector(selector);
    if (!element) {
      return;
    }

    if (typeof label === "string") {
      element.textContent = label;
    }

    if (typeof href === "string") {
      element.href = href;
    }
  };

  const syncExclusiveCtas = () => {
    const navCta = document.querySelector(".nav-cta");
    const heroCta = document.querySelector(".hero .button");

    if (!navCta || !heroCta) {
      return;
    }

    const setNavCtaHidden = (hidden) => {
      navCta.classList.toggle("is-hidden", hidden);

      if (hidden) {
        navCta.setAttribute("aria-hidden", "true");
        navCta.setAttribute("tabindex", "-1");
        return;
      }

      navCta.removeAttribute("aria-hidden");
      navCta.removeAttribute("tabindex");
    };

    const isHeroCtaVisible = () => {
      const rect = heroCta.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
    };

    setNavCtaHidden(isHeroCtaVisible());

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        setNavCtaHidden(entries.some((entry) => entry.isIntersecting));
      });

      observer.observe(heroCta);
      return;
    }

    const update = () => setNavCtaHidden(isHeroCtaVisible());
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  const createElement = (tag, className, value) => {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    if (typeof value === "string") {
      element.textContent = value;
    }
    return element;
  };

  const renderNav = () => {
    if (!Array.isArray(content.navigation)) {
      return;
    }

    const renderLinks = (containerSelector) => {
      const container = document.querySelector(containerSelector);
      if (!container) {
        return;
      }

      container.replaceChildren();
      content.navigation.forEach((item) => {
        const link = createElement("a", "", item.label);
        link.href = item.href || "#";
        container.appendChild(link);
      });
    };

    renderLinks(".nav-links");
    renderLinks(".footer-links");
  };

  const renderStoryBlocks = () => {
    const blocks = content.story?.blocks;
    const container = document.querySelector(".story-blocks");
    if (!container || !Array.isArray(blocks)) {
      return;
    }

    container.replaceChildren();
    blocks.forEach((block) => {
      const article = createElement("article", "story-block");
      article.appendChild(createElement("h3", "", block.title));

      if (Array.isArray(block.paragraphs)) {
        block.paragraphs.forEach((paragraph) => {
          article.appendChild(createElement("p", "", paragraph));
        });
      }

      container.appendChild(article);
    });
  };

  const renderOriginSpecs = () => {
    const specs = content.catalog?.origin?.specs;
    const container = document.querySelector(".origin-list");
    if (!container || !Array.isArray(specs)) {
      return;
    }

    container.replaceChildren();
    specs.forEach((spec) => {
      const item = document.createElement("div");
      item.appendChild(createElement("dt", "", spec.label));
      item.appendChild(createElement("dd", "", spec.value));
      container.appendChild(item);
    });
  };

  const renderProducts = () => {
    const products = content.catalog?.products;
    const container = document.querySelector(".product-grid");
    if (!container || !Array.isArray(products)) {
      return;
    }

    container.replaceChildren();
    products.forEach((product) => {
      const card = createElement("a", product.featured ? "product-card featured" : "product-card");
      card.href = whatsappUrl(product.whatsappText);
      card.target = "_blank";
      card.rel = "noopener";
      card.setAttribute("aria-label", `Consultar por WhatsApp sobre ${product.title}`);

      if (product.badge) {
        card.appendChild(createElement("span", "badge", product.badge));
      }

      const img = createElement("img");
      img.src = product.image || "";
      img.alt = product.imageAlt || product.title || "";
      card.appendChild(img);
      card.appendChild(createElement("h3", "", product.title));
      card.appendChild(createElement("p", "product-copy", product.text));

      const list = createElement("ul", "product-specs");
      if (Array.isArray(product.specs)) {
        product.specs.forEach((item) => {
          list.appendChild(createElement("li", "", item));
        });
      }
      card.appendChild(list);
      card.appendChild(createElement("span", "product-cta", product.cta));
      container.appendChild(card);
    });
  };

  const renderMissionCards = () => {
    const cards = content.mission?.cards;
    const container = document.querySelector(".mission-grid");
    if (!container || !Array.isArray(cards)) {
      return;
    }

    container.replaceChildren();
    cards.forEach((card) => {
      const article = createElement("article", "value-card");
      article.appendChild(createElement("span", "eyebrow", card.eyebrow));
      article.appendChild(createElement("h3", "", card.title));
      article.appendChild(createElement("p", "", card.text));
      container.appendChild(article);
    });
  };

  const site = content.site || {};
  const hero = content.hero || {};
  const story = content.story || {};
  const catalog = content.catalog || {};
  const origin = catalog.origin || {};
  const mission = content.mission || {};
  const contact = content.contact || {};
  const footer = content.footer || {};

  if (typeof site.title === "string") {
    document.title = site.title;
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && typeof site.description === "string") {
    metaDescription.content = site.description;
  }

  image(".brand img", site.logo, "");
  text(".brand span", site.brandName);
  image(".footer-logo", site.logo, site.logoAlt || site.brandName || "");

  renderNav();

  image(".hero-bean", hero.beanImage, hero.beanAlt);
  const heroSection = document.querySelector(".hero");
  if (heroSection && typeof hero.backgroundImage === "string") {
    heroSection.style.setProperty("--hero-background", `url("${stylesheetUrl(hero.backgroundImage)}")`);
  }
  text(".hero .eyebrow", hero.eyebrow);
  text("#hero-title", hero.title);
  text(".hero-copy", hero.text);
  setLink(".hero .button", hero.buttonText, whatsappUrl(hero.whatsappText));
  setLink(".nav-cta", "WhatsApp", whatsappUrl());
  syncExclusiveCtas();

  text("#familia .section-kicker .eyebrow", story.kicker);
  text("#familia h2", story.title);
  image(".family-photo img", story.image, story.imageAlt);
  text(".family-photo .quote", story.caption);
  renderStoryBlocks();

  text("#coleccion .section-title-center .eyebrow", catalog.eyebrow);
  text("#coleccion .section-title-center h2", catalog.title);
  text("#coleccion .section-intro", catalog.intro);
  text(".origin-panel .eyebrow", origin.eyebrow);
  text(".origin-panel h3", origin.title);
  text(".origin-panel p:not(.eyebrow)", origin.text);
  renderOriginSpecs();
  renderProducts();

  text("#mision .section-kicker .eyebrow", mission.kicker);
  text("#mision h2", mission.title);
  text("#mision .section-copy", mission.text);
  renderMissionCards();

  text("#contacto h2", contact.title);
  text("#contacto p", contact.text);
  setLink("#contacto .button", contact.buttonText, whatsappUrl(contact.whatsappText));

  text(".site-footer .eyebrow", footer.eyebrow);
  text(".copyright", footer.copyright);
})();
