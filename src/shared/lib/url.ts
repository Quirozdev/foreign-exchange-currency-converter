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
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        params.set(key, value);
      }
    }
    if (params.size > 0) {
      finalUrl += "?" + params.toString();
    }
  }
  return finalUrl;
}
