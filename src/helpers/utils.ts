import transform from "lodash/transform";
import isEqual from "lodash/isEqual";
import isObject from "lodash/isObject";

export const str2bool = (value: string | boolean) => {
  if (value && typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return value;
};

export const capitilizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const checkRoute = (pathname: string): boolean => {
  const authRoutes = ["login", "register"];
  const isOnAuthPages = authRoutes.includes(pathname.split("/")[1]);
  return isOnAuthPages;
};

export const differenceBetweenObjects = (object: Object, base: Object) => {
  function changes(object, base) {
    return transform(object, function (result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
};

export const isMobile = window.matchMedia("(max-width: 960px)").matches;
