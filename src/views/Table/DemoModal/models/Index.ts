import axios from "@/utils/AxiosUtils";

export class FormModel {
  public id: number = 0;
  public name: string = null;

  public async Submit() {
    const url = "/api/function";
    const rsp = await axios.post(url, this);
    return rsp;
  }

  public get IsNew() {
    return this.id === 0;
  }

  public GetRules(vm: vm) {
    const rules = {
      name: [{ required: true, message: "请输入名称", trigger: "blur" }]
    };

    return rules;
  }
}

interface vm {
  item: FormModel;
}
