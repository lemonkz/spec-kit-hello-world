import { describe, expect, it } from "vitest";

import {
  displayTextFor,
  nextDisplayState,
  CLICKED_TEXT,
  GREETING_TEXT,
  type DisplayState,
} from "../src/greeting";

describe("US1: 查看问候页面", () => {
  it("问候文本精确匹配需求字符串", () => {
    expect(GREETING_TEXT).toBe("Hello Spec-Kit World!");
  });

  it("hello 状态对应问候文本", () => {
    expect(displayTextFor("hello")).toBe("Hello Spec-Kit World!");
  });
});

describe("US2: 点击按钮切换文本", () => {
  it("clicked 状态对应点击文本", () => {
    expect(CLICKED_TEXT).toBe("You clicked me!");
    expect(displayTextFor("clicked")).toBe("You clicked me!");
  });

  it("hello 点击后变为 clicked", () => {
    expect(nextDisplayState("hello")).toBe("clicked");
  });

  it("clicked 点击后恢复 hello", () => {
    expect(nextDisplayState("clicked")).toBe("hello");
  });

  it("连续 20 次点击与奇偶性 100% 一致", () => {
    let state: DisplayState = "hello";
    for (let i = 1; i <= 20; i += 1) {
      state = nextDisplayState(state);
      const expected: DisplayState = i % 2 === 1 ? "clicked" : "hello";
      expect(state).toBe(expected);
    }
  });
});
