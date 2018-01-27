import { helper } from "@ember/component/helper";

export function lowercase(params) {
  let string = params[0];
  return string.toLowerCase();
}

export default helper(lowercase);
