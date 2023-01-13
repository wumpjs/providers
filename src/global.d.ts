declare module "@wumpjs/providers" {
  export class Checker<I> {
    public constructor(data: I);

    private data: I;

    public isBoolean(): boolean;
    public isString(): boolean;
    public isObject(): boolean;
    public isSymbol(): boolean;
    public isArray(): boolean;
    public isNumber(): boolean;
    public isFunction(): boolean;
    public isUndefined(): boolean;
    public isNull(): boolean;
    public isBigInt(): boolean;
    public isAvailable(): boolean;

    public isNotBoolean(): boolean;
    public isNotString(): boolean;
    public isNotObject(): boolean;
    public isNotSymbol(): boolean;
    public isNotArray(): boolean;
    public isNotNumber(): boolean;
    public isNotFunction(): boolean;
    public isNotUndefined(): boolean;
    public isNotNull(): boolean;
    public isNotBigInt(): boolean;
    public isNotAvailable(): boolean;

    public createError(condition: boolean, argument?: string, { errorType, expected, received }?: { errorType?: string; expected: string; received?: string }): { throw: () => void; };

    public toString(upperFirstChar?: boolean): string;
  }
}