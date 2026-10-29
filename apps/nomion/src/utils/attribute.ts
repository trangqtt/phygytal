export const getValueFromAttributes = (attributes: any[], key: string) => {
  return attributes.find((attr: any) => Object.keys(attr)?.[0] === key)?.[key];
};
