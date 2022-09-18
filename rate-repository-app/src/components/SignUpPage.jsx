import { Formik } from 'formik';
import * as yup from 'yup';
import SignUpForm from './SignUpForm';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignin';
import { useNavigate } from 'react-router-native';

const SignUpPage = () => {
	const navigate = useNavigate();
	const [createUser] = useMutation(CREATE_USER);
	const [signIn] = useSignIn();

	const initialValues = {
		username: '',
		password: '',
		passwordConfirmation: ''
	};

	const validationSchema = yup.object().shape({
		username: yup.string().min(1).max(30).required(),
		password: yup.string().min(5).max(50).required(),
		passwordConfirmation: yup.string().min(5).max(50)
			.test('passwords-match', 'Passwords must match', function(value){
				return this.parent.password === value;
			})
			.required()
	});

	const onSubmit = async (values) => {
		try {
			await createUser({
				variables: {
					user: {
						username: values.username,
						password: values.password
					}
				}
			});
			await signIn({
				username: values.username,
				password: values.password
			});
			navigate('/');
		} catch (e) {
			console.log(e);
		}
	};


	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({handleSubmit}) => <SignUpForm onSubmit={handleSubmit}/>}
		</Formik>
	);
};

export default SignUpPage;