import { Media, MediaType, SelectInputOption } from '../model/general';
import { zeroID } from '../constants';
import { AuthorModel } from '../model/AuthorModel';
import { ProductModelEntity } from '../model/ProductModelEntity';
import { PageValue } from '../components/Theme/CreateTheme';

export const transferArrayString = (data: any): string[] => {
  const result: string[] = [];

  for (const key in data) {
    result.push(data[key]);
  }

  return result;
};

export const objectDestructuringToInput = (item: any) => {
  const newObject: any = {};

  for (const property in item) {
    newObject[property] = item[property].default;
  }

  return newObject;
};

export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
}

export function convertMinutesToHMS(minutes: number) {
  const oneHour = 60; // number of minutes in one hour
  const oneMinute = 60; // number of seconds in one minute

  // calculate the number of hours, minutes, and seconds
  const hours = Math.floor(minutes / oneHour);
  const mins = Math.floor(minutes % oneHour);
  // const secs = Math.floor((minutes * oneMinute) % oneMinute);

  // format the output string
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  // const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

  // return the formatted string
  return `${formattedHours}h${formattedMins}m`;
}

export type MyObject = {
  [key: string]: any; // or replace `any` with the specific type of values in your object
};

export function filterUndefinedValues(obj: MyObject): MyObject {
  const filteredObj: MyObject = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== '' && value !== null) {
      if (value instanceof Date) {
        filteredObj[key] = value;
      } else if (Array.isArray(value)) {
        filteredObj[key] = value.map((item) => {
          if (typeof item === 'object' && item !== null) {
            return filterUndefinedValues(item);
          } else {
            return item;
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        filteredObj[key] = filterUndefinedValues(value);
      } else {
        filteredObj[key] = value;
      }
    }
  }
  return filteredObj;
}

export function getFileNameFromUrl(url: string) {
  const searchParams = new URLSearchParams(new URL(url).search);
  const token = searchParams.get('token');
  const fileNameStartIndex = url.lastIndexOf('/o/') + 3;
  const fileNameEndIndex = url.indexOf(`?alt=media&token=${token}`);
  const fileName = url
    .substring(fileNameStartIndex, fileNameEndIndex)
    .replace(/%2F/g, '/');
  return fileName;
}

type NestedObject = Record<any, any>;

export function getDifferentFields(
  obj1: NestedObject,
  obj2: NestedObject
): Partial<NestedObject> {
  const differences: Partial<NestedObject> = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (Array.isArray(value1) && Array.isArray(value2)) {
        // Compare arrays
        if (JSON.stringify(value1) !== JSON.stringify(value2)) {
          differences[key] = value2;
        }
      } else if (typeof value1 === 'object' && typeof value2 === 'object') {
        // Recursively compare nested objects
        const nestedDifferences = getDifferentFields(value1, value2);
        if (Object.keys(nestedDifferences).length > 0) {
          differences[key] = nestedDifferences;
        }
      } else if (value1 !== value2) {
        // Add different field to differences
        differences[key] = value2;
      }
    }
  }

  return differences;
}

export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDate;
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function randomString(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function isZeroID(id: string) {
  return id === zeroID;
}

export function generateAuthOptions(authsData: AuthorModel[]): SelectInputOption[] {
  return (
    authsData?.map((item) => ({
      label: item.name.vi,
      value: item.id!,
    })) || []
  );
}

// TODO Give obj a type
export const getFieldFromPath = (obj: any, path: string) => {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined; // Property not found
    }
  }

  return current;
}

export function getFilterProducts(products: any[], searchValue: string, orgId: string) {
  return products
    ?.filter((data: any) =>
      data.product_name?.toLowerCase().includes(searchValue.trim().toLowerCase())
    )
    ?.filter((data: any) => {
      return orgId === 'all' || data.organization.id === orgId;
    });
}

export function transformProductOptions(products: any[] | undefined) {
  if (!products) return [];

  return products.map((data) => ({
    label: data?.product?.product_name,
    value: data?.product?.id,
  }));
};

export function transformProductModelsOptions(models: ProductModelEntity[] | undefined) {
  if (!models) return [];

  return models.map((model) => ({
    label: model.name,
    value: model.id!,
  }));
};

export const transformPageValues = (page: any) => {
  const pageObjectValues = page?.values;

  const values: PageValue[] = [];

  for(const key in pageObjectValues) {
    values.push({
      key,
      value: pageObjectValues[key].value,
      type: pageObjectValues[key].type,
      is_product_data: false,
    })
  }

  return {
    ...page,
    values,
  };
}

export const transformValuesToObject = (values: PageValue[]) => {
  const newValues: any = {};

  for (const item of values) {
    newValues[`${item.key}.value`] = item.value;
    newValues[`${item.key}.type`] = item.type;
  }

  return newValues;
}

export function transformPagesOptions(products: any[] | undefined) {
  if (!products) return [];

  return products.map((data) => ({
    label: data?.name,
    value: data?.id,
  }));
};
