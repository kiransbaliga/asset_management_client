export const classNames = (...names: string[]) => names.join(' ');

export const createQueryUrl = (baseUrl: string, queries: object) => {
  let queryUrl = '?';

  for (let field in queries) {
    const value = queries[field];

    if (value !== '') {
      if (queryUrl !== '?') queryUrl += '&';

      queryUrl += `${field}=${value}`;
    }
  }

  return baseUrl + queryUrl;
};

export const getObjectValues = (obj: object) => {
  return Object.values(obj);
};

export const createListOrPush = (obj: object, key: string, value: any) => {
  if (obj[key]) obj[key].push(value);
  else obj[key] = [value];
};

export const createListIfNot = (obj: object, key: string) => {
  if (obj[key] === undefined) obj[key] = [];
};

export function uniqueId(length = 5, prefix = '', suffix = '') {
  let id = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < length) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return prefix + id + suffix;
}
