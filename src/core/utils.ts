export const isEvent = (key: any) => key.startsWith("on");
export const isProperty = (key: string) => key !== "children";
export const isNew = (prev: any, next: any) => (key: any) =>
  prev[key] !== next[key];
export const isOld = (prev: any, next: any) => (key: any) => !(key in next);

export const isEqual = (value: any[], other: any[]) => {
  const baseValueString = JSON.stringify(value);
  const otherValueString = JSON.stringify(other);

  return baseValueString === otherValueString;
};
