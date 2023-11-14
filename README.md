# Svelte Test Driven Development by Daniel Irvine

- [Svelte Test Driven Development by Daniel Irvine](#svelte-test-driven-development-by-daniel-irvine)
  - [Chapters](#chapters)
  - [Notes](#notes)
    - [Preface](#preface)
    - [Chapter 03 - Loading Data into a Route](#chapter-03---loading-data-into-a-route)

## Chapters

- [X] ~~*Preface*~~ [2023-11-13]
- [ ] Part 1: Learning the TDD Cycle
  - [X] ~~*Chapter 01: Setting up for Testing*~~ [2023-11-13]
  - [X] ~~*Chapter 02: Introducing the Red-Green-Refactor Workflow*~~ [2023-11-13]
  - [X] ~~*Chapter 03: Loading Data into a Route*~~ [2023-11-14]
  - [X] ~~*Chapter 04: Saving Form Data*~~ [2023-11-14]
  - [ ] Chapter 05: Validating Form Data
  - [ ] Chapter 06: Editing Form Data
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