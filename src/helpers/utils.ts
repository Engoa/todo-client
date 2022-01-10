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

export const isError = (obj: Object) => {
  return Object.prototype.toString.call(obj) === "[object Error]";
};

export const isMobile = window.matchMedia("(max-width: 960px)").matches;
