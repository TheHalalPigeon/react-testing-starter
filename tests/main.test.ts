import { describe, expect, it } from "vitest";

describe("group", () => {
  it("should", async () => {
    const res = await fetch("/categories");
    const data = await res.json();
    expect(data).toHaveLength(3);
  });
});