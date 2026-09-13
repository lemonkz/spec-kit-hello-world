export type DisplayState = "hello" | "clicked";

export const GREETING_TEXT = "Hello Spec-Kit World!";

export const CLICKED_TEXT = "You clicked me!";

export function nextDisplayState(state: DisplayState): DisplayState {
  return state === "hello" ? "clicked" : "hello";
}

export function displayTextFor(state: DisplayState): string {
  switch (state) {
    case "hello":
      return GREETING_TEXT;
    case "clicked":
      return CLICKED_TEXT;
  }
}
