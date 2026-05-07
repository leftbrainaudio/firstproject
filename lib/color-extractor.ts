export function extractDominantColors(file: File, count = 5): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        const canvas = document.createElement("canvas");
        const size = 100;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const buckets: Record<string, number> = {};
        for (let i = 0; i < data.length; i += 4) {
          const r = Math.round(data[i] / 32) * 32;
          const g = Math.round(data[i + 1] / 32) * 32;
          const b = Math.round(data[i + 2] / 32) * 32;
          const a = data[i + 3];
          if (a < 128) continue;
          const key = `${r},${g},${b}`;
          buckets[key] = (buckets[key] ?? 0) + 1;
        }

        const sorted = Object.entries(buckets)
          .sort((a, b) => b[1] - a[1])
          .map(([key]) => {
            const [r, g, b] = key.split(",").map(Number);
            return rgbToHex(r, g, b);
          });

        const distinct: string[] = [];
        for (const hex of sorted) {
          if (distinct.length >= count) break;
          if (!distinct.some((h) => colorDistance(hex, h) < 60)) {
            distinct.push(hex);
          }
        }
        resolve(distinct.length ? distinct : ["#6366f1"]);
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.min(255, v).toString(16).padStart(2, "0")).join("");
}

function colorDistance(a: string, b: string): number {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
