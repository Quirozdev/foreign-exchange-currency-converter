import { beforeEach, describe, expect, it } from "vitest";
import {
  getItem,
  getItemOrDefault,
  removeItem,
  setItem,
} from "./local-storage";

beforeEach(() => {
  localStorage.clear();
});

describe("getItem", () => {
  it("returns the parsed item", () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "Test" }));

    expect(getItem<{ id: number; name: string }>("user")).toEqual({
      id: 1,
      name: "Test",
    });
  });

  it("returns null when the item does not exist", () => {
    expect(getItem("random-inexistent-key")).toBeNull();
  });

  it("returns null and removes item from storage when its data is corrupt", () => {
    localStorage.setItem("user", "{corrupt json");

    expect(getItem("user")).toBeNull();

    expect(localStorage.getItem("user")).toBeNull();
  });
});

describe("getItemOrDefault", () => {
  it("returns the stored parsed item when it exists", () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "Test" }));

    expect(
      getItemOrDefault<{ id: number; name: string }>("user", {
        id: 2,
        name: "Test 2",
      }),
    ).toEqual({
      id: 1,
      name: "Test",
    });
  });

  it("returns the provided default value when an item with a given key doesnt exists", () => {
    expect(
      getItemOrDefault<{ id: number; name: string }>("random-inexistent-key", {
        id: 2,
        name: "Test 2",
      }),
    ).toEqual({
      id: 2,
      name: "Test 2",
    });
  });

  it("returns the provided default value and removes item from storage when its data is corrupt", () => {
    localStorage.setItem("user", "{corrupt json");

    expect(getItemOrDefault("user", { id: 6, name: "Test 6" })).toEqual({
      id: 6,
      name: "Test 6",
    });

    expect(localStorage.getItem("user")).toBeNull();
  });
});

describe("setItem", () => {
  it("stores the serialized item with the given key", () => {
    setItem("user", { id: 3, name: "Test 3" });

    expect(localStorage.getItem("user")).toEqual(
      JSON.stringify({ id: 3, name: "Test 3" }),
    );
  });
});

describe("removeItem", () => {
  it("removes the item with the given key", () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "Test" }));

    removeItem("user");

    expect(localStorage.getItem("user")).toBeNull();
  });
});
