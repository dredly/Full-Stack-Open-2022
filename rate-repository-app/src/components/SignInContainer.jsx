import { Formik } from 'formik';

import * as yup from 'yup';
import SignInForm from './SigninForm';

const SignInContainer = ({ onSubmit }) => {

	const initialValues = {
		username: '',
		password: ''
	};
    
	const validationSchema = yup.object().shape({
		username: yup.string().required(),
		password: yup.string().required()
	});

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignInContainer;