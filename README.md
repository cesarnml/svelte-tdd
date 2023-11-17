# Svelte Test Driven Development by Daniel Irvine

- [Svelte Test Driven Development by Daniel Irvine](#svelte-test-driven-development-by-daniel-irvine)
  - [Chapters](#chapters)
  - [Notes](#notes)
    - [Preface](#preface)
    - [Chapter 03 - Loading Data into a Route](#chapter-03---loading-data-into-a-route)
    - [Chapter 04 - Saving Form Data](#chapter-04---saving-form-data)
    - [Chapter 05 - Validating Form Data](#chapter-05---validating-form-data)
    - [Chapter 06 - Editing Form Data](#chapter-06---editing-form-data)
    - [Chapter 07 - Tidying up Test Suites](#chapter-07---tidying-up-test-suites)
    - [Chapter 08 - Creating Matchers to Simply Tests](#chapter-08---creating-matchers-to-simply-tests)
    - [Chapter 09 - Extracting Logic Out of the Framework](#chapter-09---extracting-logic-out-of-the-framework)
    - [Chapter 10 - Test-Driving API Endpoints](#chapter-10---test-driving-api-endpoints)
    - [Chapter 11 - Replacing Behavior with a Side-By-Side Implementation](#chapter-11---replacing-behavior-with-a-side-by-side-implementation)
    - [Chapter 12 - Using Component Mocks to Clarify Tests - 15 pages](#chapter-12---using-component-mocks-to-clarify-tests---15-pages)
    - [Chapter 13 - Adding Cucumber Tests - 10 pages](#chapter-13---adding-cucumber-tests---10-pages)
    - [Chapter 14 - Testing Authentication - 10 pages](#chapter-14---testing-authentication---10-pages)

## Chapters

- [x] ~~_Preface_~~ [2023-11-13]
- [x] ~~_Part 1: Learning the TDD Cycle_~~ [2023-11-14]
  - [x] ~~_Chapter 01: Setting up for Testing_~~ [2023-11-13]
  - [x] ~~_Chapter 02: Introducing the Red-Green-Refactor Workflow_~~ [2023-11-13]
  - [x] ~~_Chapter 03: Loading Data into a Route_~~ [2023-11-14]
  - [x] ~~_Chapter 04: Saving Form Data_~~ [2023-11-14]
  - [x] ~~_Chapter 05: Validating Form Data_~~ [2023-11-14]
  - [x] ~~_Chapter 06: Editing Form Data_~~ [2023-11-14]
- [x] ~~_Part 2: Refactoring Tests and Application Code_~~ [2023-11-17]
  - [x] ~~_Chapter 07: Tidying up Test Suites_~~ [2023-11-16]
  - [x] ~~_Chapter 08: Creating Matchers to Simplify Tests_~~ [2023-11-16]
  - [x] ~~_Chapter 09: Extracting Logic Out of the Framework_~~ [2023-11-16]
  - [x] ~~_Chapter 10: Test-Driving API Endpoints_~~ [2023-11-16]
  - [x] ~~_Chapter 11: Replacing Behavior with a Side-By-Side Implementation_~~ [2023-11-17]
  - [x] ~~_Chapter 12: Using Component Mocks to Clarify Tests_~~ [2023-11-17]
  - [x] ~~_Chapter 13: Adding Cucumber Tests_~~ [2023-11-17]
- [ ] Part 3: Testing SvelteKit Features
  - [ ] Chapter 14: Testing Authentication
  - [ ] Chapter 15: Test-Driving Svelte Stores
  - [ ] Chapter 16: Test-Driving Service Workers

## Notes

### Preface

- "It wasn't long before I discovered TDD and how it could help me have a simpler, quieter, calmer life."

### Chapter 03 - Loading Data into a Route

- Template for testing SvelteKit server-side page `load` functionality

```javascript
import { describe, it, expect } from "vitest";
import { load } from "./+page.server.js";

describe("/birthdays - load", () => {
  it("returns a fixture of two items", () => {
    const result = load();
    expect(result).toEqual({
      people: [
        { name: "Hercules", dob: "2021-01-01" },
        { name: "Athena", dob: "2021-01-02" },
      ],
    });
  }) - [];
});
```

### Chapter 04 - Saving Form Data

- Template for testing SvelteKit server-side form `actions` functionality

```js
// mocking form data request object
const createFormDataFromObject = (obj) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

export const createFormDataRequest = (obj) => ({
  formData: () =>
    new Promise((resolve) => resolve(createFormDataFromObject(obj))),
});
```

```js
// assertion on actions object
import { load, actions } from "./+page.server.js";

const request = createFormDataRequest({
  name: "Zeus",
  dob: "1992-01-01",
});
await actions.default({ request });
expect(load().birthdays).toContainEqual(
  expect.objectContaining({ name: "Zeus", dob: "1992-01-01" })
);
```

### Chapter 05 - Validating Form Data

- Template for testing SvelteKit component displays `form` prop error messages

```js
describe("validation errors", () => {
  it("displays a message", () => {
    render(BirthdayForm, {
      form: {
        error: "An error",
      },
    });
    expect(screen.queryByText("An error")).toBeVisible();
  });
});
```

### Chapter 06 - Editing Form Data

- Added ability to edit birthday data in addition to creation.
- Changed data structure from a list to a Map.
- Added an edit state to the page component

### Chapter 07 - Tidying up Test Suites

- Ways to keep your test suites tidy.
- Application code requires building abstractions and encapsulating details, with deep layers of connecting objects.
- "Test benefit from being shallow, with each test statement having a clear effect.
- Test suites have just one flow
- The primary mechanism you have to control complexity in test suites is abstracting functions that hide detail.
- Hiding necessary but irrelevant data is a key method for keeping unit tests succinct and clear.
- Three Tips:
  - 1. `Page Object Models` for Playwright end-to-end tests
  - 2. `Action helps` for `Act` phase of Vitest unit tests
  - 2. `Factories` for `Arrange` phase of Vitest unit tests (might be)

### Chapter 08 - Creating Matchers to Simply Tests

- Custom Matcher:
  - `toBeUnprocessableEntity`
    - Does not save data
    - Returns error code (e.g. 422)
    - Returns error message
    - Returns unprocessed values
- Basic structure of a matcher:

```js
export function toTestSomething(received, expected) {
  const pass = ...
  const message = () => "..."

  return {
    pass,message
  }
}
```

- `Negated Matcher`: `true` value for pass means expectation failed
- It's important that the custom matcher is defined using the `function` keyword in order for it to gain access to utility function provided via Vite
  - `this.equals`
  - `this.utils.diff`
  - `this.utils.stringify`
  - `this.isNot`

### Chapter 09 - Extracting Logic Out of the Framework

- The design of application code should make it easy to write automated unit tests

### Chapter 10 - Test-Driving API Endpoints

- Playwright can be used to make HTTP Request via the `request` parameter

```js
test('title', async ({request}) => {
  const response = await request.get(url, {data: {...}})
})
```

- Use `expect.hasAssertions()` to require expect assertions to be called in a `catch` of a try-catch block

### Chapter 11 - Replacing Behavior with a Side-By-Side Implementation

- `side-by-side implementation` - is a way to use tests to replace the existing code while ensuring the test suite remains on _Green_
- In Vitest, a `spy` is created by calling `vi.fn`
- Incredibly confused by this chapters implementation, but going to brush it off and continue forward

### Chapter 12 - Using Component Mocks to Clarify Tests - 15 pages

- The number-one rule when using component mocks, and test doubles in general, is to avoid building any control logic into them.
  - `mockReturnValue` and `mockResolvedValue` always return fixed values
  - Avoid setting up a test double in a `beforeEach` block
- Hand-rolled component stubs rely on Vitest's `vi.mock` function and `__mocks__` directory
- `JSON.stringify` is a handy method to use in component mocks when you just want to verify that the correct prop structure is passed to a mock from its parent
- BIG NEGATIVE WITH MOCKING COMPONENTS:
  - _it's challenging to keep the mock aligned with real implementations._
- If needed, use `svelte-component-double` package to mock components and gain access to useful custom matchers: `toBeRendered` and `toBeRenderedWithProps`
- Avoid component mocks if possible because they added complexity to the testing suite

### Chapter 13 - Adding Cucumber Tests - 10 pages

- Cucumber tests are not written in JavaScript code. They use a special syntax known as **Gherkin** within `feature files`
- _Given, When, Then_
- The Gherkin syntax allows for product features to be specified by non-coders in a more human-friendly format, but eventually code re-enters the scene within the step definitions
- Semi-useful to now, but feels just like Playwright E2E tests with more steps.

### Chapter 14 - Testing Authentication - 10 pages
