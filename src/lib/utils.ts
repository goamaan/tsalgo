export const defaultEqualsFn = <T>(a: T, b: T) => {
	return a === b;
};

export interface ICompareFn<T> {
	(a: T, b: T): number;
}

export const defaultCompareFn = <T>(a: T, b: T) => {
	return a > b ? 1 : a < b ? -1 : 0;
};

export const swapElements = (
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	arr: Array<any>,
	firstIndex: number,
	secondIndex: number
) => {
	[arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};

export const reverseCompareFn = <T>(
	compareFn: ICompareFn<T>
): ICompareFn<T> => {
	return (a, b) => compareFn(b, a);
};
