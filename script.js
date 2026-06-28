const REFERRAL_CODE = "OYYKR";

const codeElements = document.querySelectorAll("[data-referral-code]");
const copyButtons = document.querySelectorAll("[data-copy-code]");
const fizzLinks = document.querySelectorAll("[data-fizz-link]");
const verificationDateElements = document.querySelectorAll("[data-verification-date]");
const validationBadgeElements = document.querySelectorAll("[data-validation-badge]");
const reviewsCarousels = document.querySelectorAll("[data-reviews-carousel]");

function buildFizzUrl(baseUrl) {
  const url = new URL(baseUrl);
  url.searchParams.delete("referral");
  url.searchParams.set("ref", REFERRAL_CODE);
  return url.toString();
}

function trackEvent(eventName, details = {}) {
  const analyticsDetails = {
    referral_code: REFERRAL_CODE,
    page_path: window.location.pathname,
    page_language: document.documentElement.lang,
    ...details
  };

  const payload = {
    event: eventName,
    referralCode: REFERRAL_CODE,
    path: window.location.pathname,
    language: document.documentElement.lang,
    timestamp: new Date().toISOString(),
    ...details
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, analyticsDetails);
  }

  try {
    const previousEvents = JSON.parse(window.localStorage.getItem("projetfz_events") || "[]");
    previousEvents.push(payload);
    window.localStorage.setItem("projetfz_events", JSON.stringify(previousEvents.slice(-50)));
  } catch (error) {
    console.warn("ProjetFZ tracking storage unavailable.", error);
  }
}

function getMontrealDateParts() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Montreal",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);

  const result = { year: 0, month: 0, day: 0 };
  parts.forEach((part) => {
    if (part.type === "year") result.year = parseInt(part.value, 10);
    if (part.type === "month") result.month = parseInt(part.value, 10);
    if (part.type === "day") result.day = parseInt(part.value, 10);
  });
  return result;
}

function deterministicRandom(seed, salt) {
  const str = String(seed) + salt;
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash % 100000) / 100000;
}

function getDailyVerificationDate() {
  const today = getMontrealDateParts();
  const seed = today.year * 10000 + today.month * 100 + today.day;

  const hour = 7 + Math.floor(deterministicRandom(seed, "hour") * 15);
  const minute = Math.floor(deterministicRandom(seed, "minute") * 60);

  const verifiedAt = new Date(today.year, today.month - 1, today.day, hour, minute, 0, 0);
  verifiedAt.setDate(verifiedAt.getDate() - 1);

  return verifiedAt;
}

function formatVerificationDate(date, locale) {
  const localeConfig = {
    fr: {
      tag: "fr-CA",
      dateOptions: { day: "numeric", month: "long", year: "numeric" },
      timeOptions: { hour: "2-digit", minute: "2-digit", hour12: false }
    },
    en: {
      tag: "en-US",
      dateOptions: { month: "long", day: "numeric", year: "numeric" },
      timeOptions: { hour: "numeric", minute: "2-digit", hour12: true }
    },
    es: {
      tag: "es-ES",
      dateOptions: { day: "numeric", month: "long", year: "numeric" },
      timeOptions: { hour: "2-digit", minute: "2-digit", hour12: false }
    }
  };

  const config = localeConfig[locale] || localeConfig.fr;
  const dateStr = new Intl.DateTimeFormat(config.tag, config.dateOptions).format(date);
  const timeStr = new Intl.DateTimeFormat(config.tag, config.timeOptions).format(date);

  return { date: dateStr, time: timeStr };
}

function getCurrentMonthYear(locale) {
  const today = getMontrealDateParts();
  const date = new Date(today.year, today.month - 1, 1);
  const tagMap = { fr: "fr-CA", en: "en-US", es: "es-ES" };
  const tag = tagMap[locale] || tagMap.fr;

  const monthName = new Intl.DateTimeFormat(tag, { month: "long" }).format(date);
  return { month: monthName, year: today.year };
}

codeElements.forEach((element) => {
  element.textContent = REFERRAL_CODE;
});

fizzLinks.forEach((link) => {
  const baseUrl = link.dataset.fizzLink || link.href;
  link.href = buildFizzUrl(baseUrl);
});

copyButtons.forEach((button) => {
  const defaultText = button.textContent;
  const copiedText = button.dataset.copiedText || "Code copied";

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_CODE);
      button.textContent = copiedText;
      button.dataset.copied = "true";
      trackEvent("copy_code");
    } catch (error) {
      button.textContent = REFERRAL_CODE;
    }

    window.setTimeout(() => {
      button.textContent = defaultText;
      delete button.dataset.copied;
    }, 2200);
  });
});

verificationDateElements.forEach((element) => {
  const locale = element.dataset.locale || document.documentElement.lang.slice(0, 2).toLowerCase();
  const template = element.dataset.template || "{date} {time}";
  const verifiedAt = getDailyVerificationDate();
  const formatted = formatVerificationDate(verifiedAt, locale);

  element.textContent = template.replace("{date}", formatted.date).replace("{time}", formatted.time);
});

validationBadgeElements.forEach((element) => {
  const locale = element.dataset.locale || document.documentElement.lang.slice(0, 2).toLowerCase();
  const template = element.dataset.template || "{month} {year}";
  const monthYear = getCurrentMonthYear(locale);

  element.textContent = template
    .replace("{month}", monthYear.month)
    .replace("{year}", monthYear.year);
});

reviewsCarousels.forEach((carousel) => {
  const cards = carousel.querySelectorAll(".review-card");
  const dotsContainer = carousel.querySelector(".reviews-dots");
  if (cards.length === 0) return;

  let activeIndex = 0;
  const dots = [];

  if (dotsContainer) {
    cards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Témoignage ${index + 1}`);
      dot.addEventListener("click", () => {
        setActive(index);
        resetInterval();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  function setActive(index) {
    cards.forEach((card, i) => {
      card.classList.toggle("is-active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
    activeIndex = index;
  }

  let intervalId;
  function startInterval() {
    intervalId = window.setInterval(() => {
      setActive((activeIndex + 1) % cards.length);
    }, 5000);
  }
  function resetInterval() {
    window.clearInterval(intervalId);
    startInterval();
  }

  setActive(0);
  startInterval();

  carousel.addEventListener("mouseenter", () => window.clearInterval(intervalId));
  carousel.addEventListener("mouseleave", startInterval);
});
