export type Function<T> = (...arg: any) => T;
export type Promised<T extends Function<any>> = Awaited<ReturnType<T>>;

export type TTag = { id: number; name: string };
