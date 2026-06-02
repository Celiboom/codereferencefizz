const REFERRAL_CODE = "OYYKR";

const codeElements = document.querySelectorAll("[data-referral-code]");
const copyButtons = document.querySelectorAll("[data-copy-code]");
const fizzLinks = document.querySelectorAll("[data-fizz-link]");

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

codeElements.forEach((element) => {
  element.textContent = REFERRAL_CODE;
});

fizzLinks.forEach((link) => {
  const baseUrl = link.dataset.fizzLink || link.href;
  const eventName = link.dataset.trackEvent || "click_fizz";

  link.href = buildFizzUrl(baseUrl);
  link.addEventListener("click", () => {
    trackEvent(eventName, {
      href: link.href,
      label: link.textContent.trim()
    });
  });
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
