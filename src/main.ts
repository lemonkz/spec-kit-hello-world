import {
  displayTextFor,
  nextDisplayState,
  type DisplayState,
} from "./greeting";

function queryRequired(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (el === null) {
    throw new Error(`缺少 #${id} 元素`);
  }
  return el;
}

let currentState: DisplayState = "hello";

const displayText = queryRequired("display-text");
displayText.textContent = displayTextFor(currentState);

queryRequired("toggle-button").addEventListener("click", () => {
  currentState = nextDisplayState(currentState);
  displayText.textContent = displayTextFor(currentState);
});
