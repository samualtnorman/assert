import type { Falsy, NonFalsy } from "@samual/types"

type Nullish = undefined | null
type MessageFn<T> = (value: T) => string

export class AssertError extends Error {}
Object.defineProperty(AssertError.prototype, `name`, { value: `AssertError` })

/**
 * Assertion function that ensures value is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).
 * @throws If value is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).
 */
export function assert<T>(
	value: T,
	message: string | MessageFn<T & Falsy> = "Assertion failed"
): asserts value is NonFalsy<T> {
	if (!value)
		throw new AssertError(typeof message == `string` ? message : message(value as T & Falsy))
}

/**
 * Assertion function that ensures value is not [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish).
 * @throws If value is nullish.
 */
export function assertNonNull<T>(
	value: T,
	message: string | MessageFn<T & Nullish> = "Non-null assertion failed"
): asserts value is NonNullable<T> {
	assert(value != null, typeof message == `string` ? message : () => message(value as T & Nullish))
}

/**
 * Assertion function that ensures value is not [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish).
 * @throws If value is nullish.
 * @returns Given value.
 */
export const expect = <T>(
	value: T,
	message: string | MessageFn<T & Nullish> = `Expectation failed`
): NonNullable<T> => {
	assertNonNull(value, message)

	return value
}

/**
 * Assertion function that ensures value is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).
 * @throws If value is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).
 * @returns Given value.
 */
export const expectTruthy = <T>(
	value: T,
	message: string | MessageFn<T & Falsy> = `Truthy expectation failed`
): NonFalsy<T> => {
	assert(value, message)

	return value
}

if (import.meta.vitest) {
	const { test, expect: vitestExpect } = import.meta.vitest

	test(`assert()`, () => {
		assert(true)
		
		vitestExpect(() => {
			assert(false)
		}).toThrow(AssertError)
	})

	test(`assertNonNull()`, () => {
		assertNonNull(false)

		vitestExpect(() => {
			assertNonNull(undefined)
		}).toThrow(AssertError)
	})

	test(`expect()`, () => {
		vitestExpect(expect(false)).toBe(false)
		vitestExpect(() => expect(undefined)).toThrow(AssertError)
	})

	test(`expectTruthy()`, () => {
		vitestExpect(expectTruthy(true)).toBe(true)
		vitestExpect(() => expectTruthy(false)).toThrow(AssertError)
	})
}
