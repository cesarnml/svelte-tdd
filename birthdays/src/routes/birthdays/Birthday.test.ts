import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'

import Birthday from './Birthday.svelte'

describe('Birthday', () => {
  const exampleBirthday = {
    name: 'Cesar',
    dob: '2020-01-01',
  }

  it('displays the name of the person', () => {
    render(Birthday, { ...exampleBirthday, name: 'Svelte' })
    expect(screen.queryByText('Hello, Svelte')).toBeVisible()
  })
  it('displays the date of birth', () => {
    render(Birthday, { ...exampleBirthday, dob: '2020-01-01' })
    expect(screen.queryByText('2020-01-01')).toBeVisible()
  })
  it('displays the name of another person', () => {
    render(Birthday, { ...exampleBirthday, name: 'Another' })
    expect(screen.queryByText('Hello, Another')).toBeVisible()
  })
})
