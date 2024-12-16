import type { i18n } from "@/lib/i18n";

export type Locale = (typeof i18n)["locales"][number];
