import { toArray } from "react-emoji-render";

export function parseEmojisFromText(text?: string) {
  if (!text) return null;

  return toArray(text).reduce(
    (previous, current) =>
      `${previous}${
        typeof current === "string" ? current : (current as any).props.children
      }`,
    ""
  );
}
