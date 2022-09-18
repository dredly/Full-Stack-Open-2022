import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../../components/SignInContainer';

describe('SignIn', () => {
	describe('SignInContainer', () => {
		it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
			const onSubmit = jest.fn();
			const { getByTestId } = render(<SignInContainer onSubmit={onSubmit}/>);
			const usernameInput = getByTestId('usernameInput');
			const passwordInput = getByTestId('passwordInput');
			const signInButton = getByTestId('signInButton');

			fireEvent.changeText(usernameInput, 'kalle');
			fireEvent.changeText(passwordInput, 'password');
			fireEvent.press(signInButton);
      
			await waitFor(() => {
				expect(onSubmit).toHaveBeenCalledTimes(1);
				expect (onSubmit.mock.calls[0][0]).toEqual({
					username: 'kalle',
					password: 'password',
				});
			});
		});
	});
});