import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignin';
import SignInContainer from './SignInContainer';

const SignIn = () => {
	const navigate = useNavigate();
	const [signIn] = useSignIn();
	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			await signIn({ username, password });
			console.log('Signed in');
			navigate('/');
		} catch (e) {
			console.log(e);
		}
	};
    
	return (
		<SignInContainer onSubmit={onSubmit}/>
	);
};

export default SignIn;