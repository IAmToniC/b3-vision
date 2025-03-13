import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from './AuthForm';

describe('AuthForm Component', () => {
  const mockOnLogin = jest.fn();

  test('renders login form by default', () => {
    render(<AuthForm onLogin={mockOnLogin} />);
    expect(screen.getByText('Faça seu login')).toBeInTheDocument();
  });

  test('shows error for invalid email', async () => {
    render(<AuthForm onLogin={mockOnLogin} />);
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Entrar'));
    expect(await screen.findByText('Formato incorreto')).toBeInTheDocument();
  });

  test('successful login calls onLogin', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Login bem-sucedido' }),
      })
    );
    render(<AuthForm onLogin={mockOnLogin} />);
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Entrar'));
    await waitFor(() => expect(mockOnLogin).toHaveBeenCalled());
  });
});