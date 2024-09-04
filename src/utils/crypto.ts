import CryptoJS from "crypto-js";

export const encrypt = (data: string, key: string) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

export const decrypt = (data: string, key: string) => {
  return CryptoJS.AES.decrypt(data.toString(), key).toString(CryptoJS.enc.Utf8);
};
