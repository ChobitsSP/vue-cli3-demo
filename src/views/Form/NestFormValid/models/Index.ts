export class FormModel {
  constructor() {}
  name = "";
  clist: ModelItem[] = [];
}

export class ModelItem {
  constructor() {}
  name = "";
}

// https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js#L14

export function GetAllFrom(vm: vm) {
  return Array.from(GetAllCom(vm)).filter(
    t => t.$options.componentName == "ElForm"
  );
}

function* GetAllCom(vm: vm) {
  const stack: vm[] = [];
  stack.push(vm);

  let tmpNode: vm;

  while (stack.length > 0) {
    tmpNode = stack.pop();
    yield tmpNode;

    let len = tmpNode.$children.length;

    if (len > 0) {
      for (let i = len - 1; i >= 0; i--) {
        stack.push(tmpNode.$children[i]);
      }
    }
  }
}

interface vm {
  $children?: vm[];
  $options: any;
}
