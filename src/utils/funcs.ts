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
