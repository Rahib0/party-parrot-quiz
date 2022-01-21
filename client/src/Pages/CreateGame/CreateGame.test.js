import { render, screen } from '@testing-library/react';
import { FormCreateGame } from '../../components'

describe('Create', () => {
  beforeEach(() => {
    render(<FormCreateGame/>)
  })

  test('it displays a dropdown box', () => {
    expect(screen.getByRole('combobox', {name: 'Select Category:'})).toBeInTheDocument();
  })

  test("dropdown contains 'Politics' option", () => {
    expect(screen.getByRole('menuitem', {name: 'category'})).toBeInTheDocument();
  })

  test("it displays the 'next' button", () => {
    expect(screen.getByRole('link', {name: 'Next'})).toBeInTheDocument();
  })


})
