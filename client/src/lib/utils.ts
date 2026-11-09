export { cn } from "cn";

// Reuse a single formatter instead of building one for every rendered message.
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatDate(date: string | Date): string {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : timeFormatter.format(parsed);
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Unexpected file reader result"));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error("File read failed"));

    reader.readAsDataURL(file);
  });
}
