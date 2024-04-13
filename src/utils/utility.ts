export const setLocalStorage = (name: string, value: string) => {
  if (name && typeof window !== "undefined") {
    window.localStorage.setItem(name, value);
  }
};

export const getLocalStorage = (name: string) => {
  if (name && typeof window !== "undefined") {
    return window.localStorage.getItem(name);
  }
};

export const removeLocalStorage = (name: string) => {
  if (name && typeof window !== "undefined") {
    return window.localStorage.removeItem(name);
  }
};

export const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};
