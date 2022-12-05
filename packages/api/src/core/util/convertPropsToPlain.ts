import { Entity } from "@api/core/base-classes/Entity";

function isEntity(obj: unknown): obj is Entity {
  return obj instanceof Entity;
}

function convertToPlainObject(item: any): any {
  if (isEntity(item)) {
    return item.toPlain();
  }
  return item;
}

export function convertPropsToObject(props: any): any {
  const propsCopy = { ...props };

  for (const prop in propsCopy) {
    if (Array.isArray(propsCopy[prop])) {
      propsCopy[prop] = (propsCopy[prop] as Array<unknown>).map(item => {
        return convertToPlainObject(item);
      });
    }
    propsCopy[prop] = convertToPlainObject(propsCopy[prop]);
  }

  return propsCopy;
}
