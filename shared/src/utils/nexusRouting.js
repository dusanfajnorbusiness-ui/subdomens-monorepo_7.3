export const getSubdomainLink = (targetSubdomain, relativePath = "") => {
  if (typeof window === "undefined") return relativePath || "/";

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  // Na Localhoste bežíme v SPA režime cez relatívne cesty
  if (isLocalhost) {
    return relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  }

  // Na Produkcii generujeme plnú absolútnu subdoménovú URL adresu
  const domain = "projekt-nexus.sk";
  if (targetSubdomain === "main" || targetSubdomain === "root") {
    return `https://${domain}${relativePath}`;
  }

  return `https://${targetSubdomain}.${domain}${relativePath}`;
};