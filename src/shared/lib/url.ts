export function generateUrlWithOptions({
  baseUrl,
  subRoutes,
  queryParams,
}: {
  baseUrl: string;
  subRoutes?: (string | undefined)[];
  queryParams?: Record<string, string | undefined>;
}) {
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
  if (queryParams) {
    let firstElement = true;
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined) return;
      finalUrl += `${firstElement ? "?" : "&"}${key}=${value}`;
      firstElement = false;
    });
  }
  return finalUrl;
}
