import { formatRelative, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "eeee",
};

const locale = {
  ...enUS,
  formatRelative: (token) => formatRelativeLocale[token],
};

export const formatDate = (date) =>
  formatRelative(parseISO(date), new Date(), { locale });
