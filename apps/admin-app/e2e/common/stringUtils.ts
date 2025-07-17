export function getUrlPathMatcherRegex(path: string, baseURL: string) : RegExp {
  let regexPath = path;
  if (!path.startsWith('/')) {
    regexPath = `/${path}`;
  }

  // baseURL + path + optional search params
  return new RegExp(`${baseURL}${regexPath}(\\?.*)?$`);
}

export function generateRandomText(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
