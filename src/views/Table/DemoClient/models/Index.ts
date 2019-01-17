import moment from "moment";
import axios from "@/utils/AxiosUtils";
import { FormatBase } from "@/utils/ElTableUtils";

const fmt = "YYYY-MM-DD";

export class Filter {
  constructor() {
    this.date1 = moment()
      .add(-3, "days")
      .format(fmt);

    this.date2 = moment()
      .add(1, "days")
      .format(fmt);
  }

  public date1: string;
  public date2: string;

  public async List() {
    const rsp = await axios.post<any[]>("/api/table/client", this);
    if (rsp.code !== 0) throw new Error(rsp.msg);
    const list: RowModel[] = rsp.result.map(t =>
      Object.assign(new RowModel(), t)
    );
    return list;
  }
}

export class RowModel {
  public date: string = null;
  public name: string = null;
  public address: number = null;
}

export class CellFormat extends FormatBase {
  static name_fmt(row, column, cellValue) {
    return "name: " + cellValue;
  }
}
