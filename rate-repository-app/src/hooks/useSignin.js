import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const [mutate, result] = useMutation(AUTHENTICATE);
  
	const signIn = async ({ username, password }) => {
		const { data } = await mutate({variables: {credentials: {username, password}}});
		console.log('data in useSignIn hook', data);
		await authStorage.setAccessToken(data.authenticate.accessToken);
		apolloClient.resetStore();
	};
  
	return [signIn, result];
};

export default useSignIn;