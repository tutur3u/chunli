declare module "bun:test" {
	type TestCallback = () => Promise<void> | void;

	type Matchers<T> = {
		toBe(expected: T): void;
		toEqual(expected: unknown): void;
	};

	type Expect = {
		<T>(actual: T): Matchers<T>;
	};

	export const expect: Expect;
	export function describe(name: string, callback: TestCallback): void;
	export function test(name: string, callback: TestCallback): void;
}
