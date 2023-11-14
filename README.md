# Svelte Test Driven Development by Daniel Irvine

- [Svelte Test Driven Development by Daniel Irvine](#svelte-test-driven-development-by-daniel-irvine)
  - [Chapters](#chapters)
  - [Notes](#notes)
    - [Preface](#preface)
    - [Chapter 03 - Loading Data into a Route](#chapter-03---loading-data-into-a-route)
    - [Chapter 04 - Saving Form Data](#chapter-04---saving-form-data)
    - [Chapter 05 - Validating Form Data](#chapter-05---validating-form-data)
    - [Chapter 06 - Editing Form Data](#chapter-06---editing-form-data)

## Chapters

- [X] ~~*Preface*~~ [2023-11-13]
- [X] ~~*Part 1: Learning the TDD Cycle*~~ [2023-11-14]
  - [X] ~~*Chapter 01: Setting up for Testing*~~ [2023-11-13]
  - [X] ~~*Chapter 02: Introducing the Red-Green-Refactor Workflow*~~ [2023-11-13]
  - [X] ~~*Chapter 03: Loading Data into a Route*~~ [2023-11-14]
  - [X] ~~*Chapter 04: Saving Form Data*~~ [2023-11-14]
  - [X] ~~*Chapter 05: Validating Form Data*~~ [2023-11-14]
  - [X] ~~*Chapter 06: Editing Form Data*~~ [2023-11-14]
- [ ] Part 2: Refactoring Tests and Application Code
  - [ ] Chapter 07: Tidying up Test Suites
  - [ ] Chapter 08: Creating Matchers to Simplify Tests
  - [ ] Chapter 09: Extracting Logic Out of the Framework
  - [ ] Chapter 10: Test-Driving API Endpoints
  - [ ] Chapter 11: Replacing Behavior with a Side-By-Side Implementation
  - [ ] Chapter 12: Using Component Mocks to Clarify Tests
  - [ ] Chapter 13: Adding Cucumber Tests
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
import { describe, it, expect } from 'vitest'
import { load } from './+page.server.js'

describe('/birthdays - load', () => {
	it('returns a fixture of two items', () => {
		const result = load()
		expect(result).toEqual({
			people: [
				{ name: 'Hercules', dob: '2021-01-01' },
				{ name: 'Athena', dob: '2021-01-02' }
			]
		})
	})
- [ ] })
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
	formData: () => new Promise((resolve) => resolve(createFormDataFromObject(obj)))
});
```

```js
// assertion on actions object
import { load, actions } from './+page.server.js';

const request = createFormDataRequest({
    name: 'Zeus',
    dob: '1992-01-01'
  });
await actions.default({ request });
expect(load().birthdays).toContainEqual(
  expect.objectContaining({ name: 'Zeus', dob: '1992-01-01' })
  );
```

### Chapter 05 - Validating Form Data

- Template for testing SvelteKit component displays `form` prop error messages

```js
describe('validation errors', () => {
  it('displays a message', () => {
    render(BirthdayForm, {
      form: {
        error: 'An error'
      }
    });
    expect(
      screen.queryByText('An error')
    ).toBeVisible();
  });
})
```

### Chapter 06 - Editing Form Data

- Added ability to edit birthday data in addition to creation.
- Changed data structure from a list to a Map.
- Added an edit state to the page component