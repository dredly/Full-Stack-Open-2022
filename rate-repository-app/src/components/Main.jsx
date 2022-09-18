import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SignUpPage from './SignUpPage';
import RepositoryView from './RepositoryView';
import ReviewPage from './ReviewPage';
import MyReviewsPage from './MyReviewsPage';

const Main = () => {
	return (
		<View>
			<AppBar />
			<Routes>
				<Route path='/signin' element={<SignIn />} exact/>
				<Route path='/signup' element={<SignUpPage />} exact/>
				<Route path='/review' element={<ReviewPage />} exact/>
				<Route path='/myreviews' element={<MyReviewsPage />} />
				<Route path='/:id' element={<RepositoryView />} exact/>
				<Route path='/' element={<RepositoryList />} exact/>
				<Route path='*' element={<Navigate to='/' replace/>}/>
			</Routes>
		</View>
	);
};

export default Main;