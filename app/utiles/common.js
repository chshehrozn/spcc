import CryptoJS from "crypto-js";
const secretKey = "7y#Vw$2pZ!Kq^u@S";

export const getFromStorage = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const encryptedValue = window.localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = CryptoJS.AES.decrypt(
        encryptedValue,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
      return decryptedValue;
    }
  }
  return null;
};

export const removeToStorage = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(key);
  }
};

export const setToStorage = (key, value) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
    window.localStorage.setItem(key, encryptedValue);
  }
};

export function formattedDate(date) {
  if (date) {
    const dateValue = new Date(date);
    const formattedDate = dateValue.toLocaleDateString("en-US");
    return formattedDate;
  }

  return null;
}

// Store data with encryption
export const setToJsonStorage = (key, value) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const stringValue = JSON.stringify(value);
    const encryptedValue = CryptoJS.AES.encrypt(
      stringValue,
      secretKey
    ).toString();
    window.localStorage.setItem(key, encryptedValue);
  }
};

// Retrieve and decrypt data from localStorage
export const getFromJsonStorage = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const encryptedValue = window.localStorage.getItem(key);
    if (encryptedValue) {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue); // Parse the decrypted string to JSON
    }
  }
  return null; // Return null if nothing is found
};

export const decodeHtmlEntities = (encodedString) => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(encodedString, "text/html").body
    .textContent;
  return decodedString;
};

export const removeTrailingSlash = (url) => {
  const cleanUrl = (inputUrl) => {
    return inputUrl.endsWith("/") ? inputUrl.slice(0, -1) : inputUrl;
  };
  return cleanUrl(url);
};
