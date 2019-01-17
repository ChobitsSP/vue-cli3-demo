import axios from "./AxiosUtils";

export function mobile(rule, value, callback: ValidCallBack) {
  if (IsEmpty(value)) {
    callback();
    return;
  }

  if (/^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|70)\d{8}$/.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号码!"));
  }
}

export function tel(rule, value, callback: ValidCallBack) {
  if (IsEmpty(value)) {
    callback();
    return;
  }

  if (
    /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/.test(
      value
    )
  ) {
    callback();
  } else {
    callback(new Error("请输入正确的电话号码!"));
  }
}

export function email(rule, value, callback: ValidCallBack) {
  if (IsEmpty(value)) {
    callback();
    return;
  }

  if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的邮箱!"));
  }
}

export function username(rule, value, callback: ValidCallBack) {
  if (IsEmpty(value)) {
    callback();
    return;
  }

  if (/^[A-Za-z\d-_]{5,20}$/.test(value)) {
    callback();
  } else {
    callback(new Error("仅支持字母、数字、“-”“_”的组合，5-20个字符"));
  }
}

export function password(rule, value, callback: ValidCallBack) {
  if (IsEmpty(value)) {
    callback();
    return;
  }

  if (/^[A-Za-z\d_]{6,20}$/.test(value)) {
    callback();
  } else {
    callback(new Error("请使用字母、数字和“_”两种及以上的组合，6-20个字符"));
  }
}

export function price(rule, value, callback: ValidCallBack) {
  if (IsEmpty(value)) {
    callback();
    return;
  }

  if (/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的金额"));
  }
}

export function url(rule, value, callback: ValidCallBack) {
  if (IsEmpty(value)) {
    callback();
    return;
  }

  if (
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      value
    )
  ) {
    callback();
  } else {
    callback(new Error("请输入正确的url地址!例如: https://www.baidu.com"));
  }
}

export function RegRule(reg, msg) {
  return function(rule, value, callback) {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error(msg));
    }
  };
}

export function select_number(rule, value, callback: ValidCallBack) {
  if (IsEmpty(value)) {
    callback();
    return;
  }

  if (/^\d+$/.test(value)) {
    callback();
  } else {
    callback(new Error("请选择"));
  }
}

export function geetest(captchaObj) {
  return function(rule, value, callback) {
    if (captchaObj && captchaObj.getValidate()) {
      callback();
    } else {
      callback(new Error("请拖动滑块完成验证"));
    }
  };
}

export function getFirstError(form) {
  const fields = form.fields.map(t => t.prop);

  return new Promise(resolve => {
    let flag = false;

    fields.forEach(prop => {
      if (flag) return;

      form.validateField(prop, msg => {
        flag = !!msg;

        if (msg) {
          resolve({ prop: prop, msg: msg });
        }
      });
    });
  });
}

export async function UserNameAvailable(rule, value, callback: ValidCallBack) {
  if (IsEmpty(value)) {
    callback();
    return;
  }

  const url = "/api/user/UserNameValidator";
  const data = { username: value };
  const rsp = await axios.post<boolean>(url, data);

  if (rsp.result === true) {
    //username exists, this means validation success
    callback(new Error("该用户名已存在!"));
  } else {
    //username does not exist, therefore this validation fails
    callback();
  }
}

interface ValidCallBack {
  (err?: Error): void;
}

export function EmptyValid(rule, value, callback: ValidCallBack) {
  callback();
}

function IsEmpty(value) {
  if (typeof value === "string") {
    return value === "";
  }
  return value == null;
}
