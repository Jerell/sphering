export function getCookieValue(a) {
  if (!process.browser) return;
  let b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function getCookieValueURI(a) {
  return decodeURIComponent(getCookieValue(a));
}

export function round(value, precision) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
