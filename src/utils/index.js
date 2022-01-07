import BN from "bn.js";

function toBN(number, base) {
  if (typeof number === "string" && isHex(number) && !base)
    return new BN(removeHexPrefix(number), "hex");
  return new BN(number, base);
}

function strToBNStr(str) {
  const nbn = toBN(asciiToHex(str));
  return nbn.toString(10);
}

function isHex(hex) {
  return hex.startsWith("0x");
}

function removeHexPrefix(hex) {
  return hex.replace(/^0x/, "");
}

function addHexPrefix(hex) {
  return `0x${removeHexPrefix(hex)}`;
}

function asciiToHex(str) {
  var arr1 = [];
  arr1.push("0x");
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
}

export default {
  asciiToHex,
  toBN,
  removeHexPrefix,
  addHexPrefix,
  strToBNStr,
};
