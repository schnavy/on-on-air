export function hashStringToHue(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 360); // Ensure hue is within 0-359
}

export function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `${r}, ${g}, ${b}`;
}

import {
  RadioWithRelations,
  SortField,
} from "@/components/RadioTable/RadioTableTypes";

export const sortRadios = (
  radios: RadioWithRelations[],
  field: SortField,
  order: "asc" | "desc"
) => {
  return [...radios].sort((a, b) =>
    order === "asc"
      ? a[field].localeCompare(b[field])
      : b[field].localeCompare(a[field])
  );
};

export function cleanURL(url: string) {
  return url
    .replace(/(^\w+:|^)\/\//, "")
    .replace(/\/$/, "")
    .replace("www.", "");
}
