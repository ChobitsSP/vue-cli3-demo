import * as Filters from "../filters/Index";
import moment from "moment";

export interface FormatterFunc {
  (row, column, cellValue): any;
}

export class FormatBase {
  static GetDate(format: string = "YYYY-MM-DD HH:mm:ss"): FormatterFunc {
    return (row, column, cellValue) => {
      return Filters.date(cellValue, format);
    };
  }
  static NewTimeFmt(row, column, cellValue) {
    return NewTimeFmt(cellValue);
  }
  static CustomOption(options: OptionAll, key: string) {
    return (row, column, cellValue) => {
      const val = options[key].find(t => t.value === cellValue);
      return val == null ? cellValue : val.name;
    };
  }
}

function NewTimeFmt(value: string) {
  if (!value) return "--";

  const otime = moment(value);
  const now = moment();

  let fmt: string;

  if (!otime.isSame(now, "year")) {
    fmt = "YYYY-MM-DD HH:mm";
  } else if (!otime.isSame(now, "day")) {
    fmt = "MM-DD HH:mm";
  } else {
    fmt = "HH:mm";
  }

  return otime.format(fmt);
}

interface OptionAll {
  [key: string]: OptionItem[];
}

interface OptionItem {
  id: number;
  name: string;
  value: number;
  parent_id: number;
  is_del: number;
}
