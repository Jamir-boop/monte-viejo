(function () {
  const site = window.siteContent?.site;
  const campaign = window.siteContent?.campaign;

  if (!site || !campaign) {
    return;
  }

  const text = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && typeof value === "string") {
      element.textContent = value;
    }
  };

  document.querySelectorAll("[data-campaign]").forEach((element) => {
    const value = campaign[element.dataset.campaign];
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-campaign-src]").forEach((element) => {
    const value = campaign[element.dataset.campaignSrc];
    if (typeof value === "string") {
      element.src = /^(?:https?:|\.\.\/)/.test(value) ? value : `../${value}`;
    }
  });

  document.querySelectorAll("[data-campaign-alt]").forEach((element) => {
    const value = campaign[element.dataset.campaignAlt];
    if (typeof value === "string") {
      element.alt = value;
    }
  });

  document.querySelectorAll("[data-campaign-placeholder]").forEach((element) => {
    const value = campaign[element.dataset.campaignPlaceholder];
    if (typeof value === "string") {
      element.placeholder = value;
    }
  });

  const sizeInputs = Array.from(document.querySelectorAll('input[name="size"]'));
  if (Array.isArray(campaign.sizes)) {
    sizeInputs.forEach((input, index) => {
      const size = campaign.sizes[index];
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!size || !label) {
        return;
      }
      input.value = size.value;
      input.dataset.price = size.price;
      text(`#${input.id} + label .choice-name`, size.value);
      text(`#${input.id} + label strong`, size.price);
    });
  }

  const preparationInputs = Array.from(document.querySelectorAll('input[name="preparation"]'));
  if (Array.isArray(campaign.preparations)) {
    preparationInputs.forEach((input, index) => {
      const value = campaign.preparations[index];
      if (typeof value !== "string") {
        return;
      }
      input.value = value;
      text(`label[for="${input.id}"] span`, value);
    });
  }

  const facts = document.querySelector(".origin-facts");
  if (facts && Array.isArray(campaign.facts)) {
    facts.replaceChildren(...campaign.facts.map((fact) => {
      const item = document.createElement("div");
      const label = document.createElement("dt");
      const value = document.createElement("dd");
      label.textContent = fact.label;
      value.textContent = fact.value;
      item.append(label, value);
      return item;
    }));
  }

  const form = document.querySelector(".order-form");
  const district = document.querySelector("#district");
  const districtError = document.querySelector("#district-error");
  const submit = document.querySelector(".order-submit");
  const stickySubmit = document.querySelector(".sticky-submit");

  if (stickySubmit && "IntersectionObserver" in window) {
    const visibleActions = new Set();
    const mobile = window.matchMedia("(max-width: 820px)");
    const updateSticky = () => {
      const hide = !mobile.matches || visibleActions.size > 0;
      stickySubmit.hidden = hide;
      document.body.classList.toggle("sticky-active", !hide);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visibleActions.add(entry.target) : visibleActions.delete(entry.target));
      updateSticky();
    }, { threshold: 0.15 });
    [document.querySelector(".campaign-hero"), submit, document.querySelector(".details-action")].forEach((element) => observer.observe(element));
    mobile.addEventListener("change", updateSticky);
  }

  const validateDistrict = () => {
    const valid = district.value.trim().length >= 2;
    district.setAttribute("aria-invalid", String(!valid));
    districtError.hidden = valid;
    return valid;
  };

  district.addEventListener("input", () => {
    if (district.getAttribute("aria-invalid") === "true") {
      validateDistrict();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateDistrict()) {
      district.focus();
      return;
    }

    const size = form.querySelector('input[name="size"]:checked');
    const preparation = form.querySelector('input[name="preparation"]:checked');
    const params = new URLSearchParams(window.location.search);
    const attribution = Object.fromEntries(Array.from(params).filter(([key]) => key.toLowerCase().startsWith("utm_")));
    const attributionText = Object.entries(attribution).map(([key, value]) => `${key}=${value}`).join(" · ");
    const message = [
      campaign.whatsappIntro,
      "",
      `Pedido: ${size.value} (${size.dataset.price})`,
      `Presentación: ${preparation.value}`,
      `Distrito: ${district.value.trim()}`,
      campaign.delivery,
      attributionText ? `Referencia: ${attributionText}` : ""
    ].filter(Boolean).join("\n");
    const detail = {
      size: size.value,
      price: size.dataset.price,
      preparation: preparation.value,
      district: district.value.trim(),
      campaign: params.get("utm_campaign") || "lima_launch_2026",
      content: params.get("utm_content") || "landing",
      attribution
    };

    window.dispatchEvent(new CustomEvent("monteviejo:contact", { detail }));
    if (typeof window.fbq === "function") {
      window.fbq("track", "Contact", detail);
    }

    submit.disabled = true;
    stickySubmit.disabled = true;
    text(".order-submit span", "Abriendo WhatsApp…");
    text(".sticky-submit span", "Abriendo WhatsApp…");
    window.location.href = `https://api.whatsapp.com/send?phone=${encodeURIComponent(site.whatsappPhone)}&text=${encodeURIComponent(message)}`;
  });

})();
