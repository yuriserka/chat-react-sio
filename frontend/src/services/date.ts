import { formatRelative, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

const formatRelativeLocale: { [k: string]: string } = {
  lastWeek: "P",
  yesterday: "'yesterday'",
  today: "p",
  other: "P",
};

const locale = {
  ...enUS,
  formatRelative: (token: string) => formatRelativeLocale[token],
};

export function formatDateRelative(date: string) {
  return formatRelative(parseISO(date), new Date(), { locale });
}
