export const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const xor = (a: any, b: any): boolean => {
	return ( a as boolean || b as boolean ) && !( a as boolean && b as boolean );
};