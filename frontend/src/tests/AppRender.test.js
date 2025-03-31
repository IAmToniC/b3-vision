import { render, screen } from '@testing-library/react';
import AppRender from './AppRender';
import AuthForm from './AuthForm';
import App from './App';

jest.mock('./AuthForm', () => jest.fn(() => <div>AuthForm</div>));
jest.mock('./App', () => jest.fn(() => <div>App</div>));

describe('AppRender Component', () => {
  test('renders AuthForm when not logged in', () => {
    render(<AppRender />);
    expect(screen.getByText('AuthForm')).toBeInTheDocument();
  });

  test('renders App when logged in', () => {
    render(<AppRender />);
    AuthForm.mockImplementation(({ onLogin }) => (
      <button onClick={onLogin}>Login</button>
    ));
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('App')).toBeInTheDocument();
  });
});