import { helper } from "@ember/component/helper";

export function smsObfuscate(params) {
  const suffixLength = 2;

  let smsNumber = params[0];
  let suffix = smsNumber.substr(smsNumber.length - suffixLength);
  let areaCode = smsNumber.substr(0, 5);
  return `${areaCode}xxxxx${suffix}`;
}

export default helper(smsObfuscate);
