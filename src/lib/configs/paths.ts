import path from "node:path";

// create a path form project root
export function createPath(inputPath: string): string {
    return path.join(import.meta.dirname, `../../../${inputPath}`);
}