import { generateUrlWithOptions } from "./url";
import { describe, expect, it } from "vitest";

describe("generateUrlWithOptions", () => {
  it("returns the base URL when no options are provided", () => {
    expect(
      generateUrlWithOptions({
        baseUrl: "https://test.com",
      }),
    ).toBe("https://test.com");
  });

  it("appends subroutes to the base URL", () => {
    expect(
      generateUrlWithOptions({
        baseUrl: "https://test.com",
        subRoutes: ["/main/", "/sub", "wow"],
      }),
    ).toBe("https://test.com/main/sub/wow");
  });

  it("appends query parameters to the base URL", () => {
    expect(
      generateUrlWithOptions({
        baseUrl: "https://test.com",
        queryParams: {
          id: "1",
          page: "docs",
        },
      }),
    ).toBe("https://test.com?id=1&page=docs");
  });

  it("appends subroutes and query parameters to the base URL", () => {
    expect(
      generateUrlWithOptions({
        baseUrl: "https://test.com",
        subRoutes: ["/main/", "/sub", "wow"],
        queryParams: {
          id: "1",
          page: "docs",
        },
      }),
    ).toBe("https://test.com/main/sub/wow?id=1&page=docs");
  });

  it("encodes query parameter values containing special characters", () => {
    expect(
      generateUrlWithOptions({
        baseUrl: "https://test.com",
        queryParams: {
          page: "docs and more",
          id: "1&2",
        },
      }),
    ).toBe("https://test.com?page=docs+and+more&id=1%262");
  });

  it("skips undefined query parameter values", () => {
    expect(
      generateUrlWithOptions({
        baseUrl: "https://test.com",
        queryParams: {
          page: undefined,
          id: "1",
        },
      }),
    ).toBe("https://test.com?id=1");
  });

  it("skips undefined subroute values", () => {
    expect(
      generateUrlWithOptions({
        baseUrl: "https://test.com",
        subRoutes: ["sub", undefined, "main"],
      }),
    ).toBe("https://test.com/sub/main");
  });

  it("ignores empty subroute values", () => {
    expect(
      generateUrlWithOptions({
        baseUrl: "https://test.com",
        subRoutes: ["sub", "", "main"],
      }),
    ).toBe("https://test.com/sub/main");
  });
});
