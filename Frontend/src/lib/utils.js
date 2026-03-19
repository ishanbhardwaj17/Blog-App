export function cn(...classes) {
  return classes
    .flatMap((c) =>
      typeof c === "object"
        ? Object.entries(c)
            .filter(([_, v]) => v)
            .map(([k]) => k)
        : c
    )
    .filter(Boolean)
    .join(" ")
}