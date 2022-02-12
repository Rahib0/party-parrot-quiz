import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Back, FormJoinGame } from '../../components';
import userEvent from '@testing-library/user-event';

describe ('Join Room', () => {

    const gameId = '608bc201193dc100323f9274';
    const { location } = window;

    beforeAll(() => {
        delete window.location;
        window.location = {
            href: 'https://party-parrot.netlify.app/',
        };
    });

    beforeEach(() => render(<FormJoinGame />, { wrapper: MemoryRouter}));
    
    afterAll(() => {
        window.location = location;
    });
    
    test('renders appropriate header', () => {
        const header = screen.getByRole('heading')
        expect(header.textContent).toContain('Enter Room ID:')
    })
    test('input has a corresponding label', () => {
        const label = screen.getByRole('focus')
        expect(label.textContent).toContain('Game ID')
    })
    test('join game button renders', () => {
        const btn = screen.getByRole('button')
        expect(btn.value).toContain('Join Game')
    })
    test('redirects onClick of Join Game button to correct URL', () =>{
        const gameIdInput = screen.getByLabelText('Game ID')
        const target = `lobby/${gameId}`;
        userEvent.type(gameIdInput, "608bc201193dc100323f9274{enter}")
        expect(window.location.href).toBe(target);
    })
    test('image renders on the page', () => {
        const img = screen.getByRole('img')
        expect(img).toBeInTheDocument
    })
})