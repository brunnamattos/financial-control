import { parseISO, format } from "date-fns";

export const formatDate = (date) => {
  try {
    return format(parseISO(date), "dd/MM/yyyy");
  } catch (e) {
    return "-";
  }
};
