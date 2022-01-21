import { render, screen } from '@testing-library/react';
import Homepage from './index';

describe('Homepage', () => {
  beforeEach(() => {
    render(<Homepage/>)
  })
  
  test('it displays logo as the title', () => {
    expect(screen.getByRole('img', {name: 'Trivia Duck' })).toBeInTheDocument();
  })

  test('it displays the planets', () => {
    expect(screen.getByRole('img', {name: 'Party Parrot' })).toBeInTheDocument();
  })

  test("it displays the 'New Game' and 'Join Game' buttons", () => {
    expect(screen.getByRole('link', {name: 'Create Game' })).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Join Game' })).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Leaderboards' })).toBeInTheDocument();
  })

})