import { formatRelative, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

const formatRelativeLocale: { [k: string]: string } = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "eeee",
};

const locale = {
  ...enUS,
  formatRelative: (token: string) => formatRelativeLocale[token],
};

export const formatDate = (date: string) =>
  formatRelative(parseISO(date), new Date(), { locale });
