import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders initial output text', () => {
    render(<App />);
    expect(screen.getByText('Aqui será exibido o output do programa.')).toBeInTheDocument();
  });

  test('updates output on button click', async () => {
    render(<App />);
    const button = screen.getByText('Tente Agora');
    fireEvent.click(button);
    expect(screen.getByText('Carregando e analisando notícias...')).toBeInTheDocument();

    // Mock da API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Análise concluída' }),
      })
    );
    fireEvent.click(button);
    await screen.findByText('Análise concluída');
  });
});

