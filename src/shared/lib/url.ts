export function generateUrlWithOptions(
  baseUrl: string,
  subRoutes?: (string | undefined)[],
) {
  let finalUrl = baseUrl.trim();
  if (finalUrl[finalUrl.length - 1] === "/") {
    finalUrl = finalUrl.slice(0, finalUrl.length - 1);
  }
  if (subRoutes) {
    subRoutes.forEach((subRoute) => {
      if (!subRoute) return;
      finalUrl += `/${subRoute.trim().replaceAll("/", "")}`;
    });
  }
  return finalUrl;
}
