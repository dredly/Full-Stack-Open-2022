import { Formik } from 'formik';
import * as yup from 'yup';
import ReviewForm from './ReviewForm';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const ReviewPage = () => {
	const navigate = useNavigate();
	const [createReview] = useMutation(CREATE_REVIEW);

	const initialValues = {
		ownerName: '',
		repositoryName: '',
		rating: '',
		text: ''
	};

	const validationSchema = yup.object().shape({
		ownerName: yup.string().required(),
		repositoryName: yup.string().required(),
		rating: yup.number().min(0).max(100).required(),
		text: yup.string()
	});

	const onSubmit = async (values) => {
		try {
			const reviewedRepo = await createReview({variables: {
				review: {...values, rating: Number(values.rating)}
			}});
			console.log('reviewedRepo', reviewedRepo);
			navigate(`/${reviewedRepo.data.createReview.repositoryId}`);
		} catch (e) {
			console.log(e);
		}
	
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({handleSubmit}) => <ReviewForm onSubmit={handleSubmit}/>}
		</Formik>
	);
};

export default ReviewPage;