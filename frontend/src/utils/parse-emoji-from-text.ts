import { toArray } from "react-emoji-render";

export function parseEmojisFromText(text?: string) {
  return !text
    ? null
    : toArray(text).reduce(
        (previous, current) =>
          `${previous}${
            typeof current === "string"
              ? current
              : (current as any).props.children
          }`,
        ""
      );
}
