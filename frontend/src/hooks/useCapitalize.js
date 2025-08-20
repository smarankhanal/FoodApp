import { useCallback } from "react";

export function useCapitalize() {
  const capitalize = useCallback((input) => {
    if (typeof input !== "string") return "";
    return input
      .split(" ")
      .map((word) =>
        word.length > 0
          ? word[0].toUpperCase() + word.slice(1).toLowerCase()
          : ""
      )
      .join(" ");
  }, []);

  return capitalize;
}
