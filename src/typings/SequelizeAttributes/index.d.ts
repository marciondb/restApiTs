import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize'

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute
};
