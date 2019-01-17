export default class Class1 {
  public id: number = 0;
  public name: string = null;
  public region: string = null;
  public date1: string = null;
  public date2: string = null;
  public delivery: boolean = true;
  public type: string[] = ['美食/餐厅线上活动'];
  public resource: string = '线上品牌商赞助';
  public desc: string = null;
  public AutoInput: string = null;

  public get IsNew() {
    return this.id === 0;
  }
}
