export function getCookieValue(a) {
  if (!process.browser) return;
  let b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function getCookieValueURI(a) {
  return decodeURIComponent(getCookieValue(a));
}
