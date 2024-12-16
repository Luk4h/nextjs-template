import type { getDictionary } from "@/lib/dictionary";

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
