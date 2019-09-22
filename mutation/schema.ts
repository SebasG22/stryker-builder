import { StrykerOptions } from "@stryker-mutator/api/core";

export interface SchemaObject extends StrykerOptions {
    jest: {
        config: any;
    },
    packageManager: 'npm' | 'yarn',
    tsconfigFile: string;
}