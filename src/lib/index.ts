import { writable } from 'svelte/store';
import {
	createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
	signInWithRedirect,
	signInWithPopup
} from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import type { UserCredential, AuthError } from 'firebase/auth';
import type { Writable } from 'svelte/store';
import type { AuthProviders, AuthProviderName, AuthState } from './types';

const createFirebaseAuth = (auth: Auth, providers: AuthProviders) => {
	const { subscribe, update }: Writable<AuthState> = writable({
		isLoading: false,
		user: null,
		error: null
	});

	const asyncRun = async <T>(operation: () => Promise<T>) => {
		try {
			setIsLoading(true);
			const result = await operation();
			return result;
		} catch (error) {
			setError(error);
			return error as AuthError;
		} finally {
			setIsLoading(false);
		}
	};

	const createUserWithEmailAndPassword = async (
		email,
		password
	): Promise<UserCredential | AuthError> => {
		return asyncRun<UserCredential>(() =>
			firebaseCreateUserWithEmailAndPassword(auth, email, password)
		);
	};

	const signInWithEmailAndPassword = (email: string, password: string) => {
		return asyncRun<UserCredential>(() =>
			firebaseSignInWithEmailAndPassword(auth, email, password)
		);
	};

	const signOut = () => {
		return asyncRun<void>(() => auth.signOut());
	};

	const signInWithProvider = (providerName: AuthProviderName, isRedirect = false) =>
		asyncRun<UserCredential>(() => {
			const authProvider = providers[providerName];

			if (!authProvider) {
				throw new Error(
					`${providerName} is not a valid provider. Please provide a valid provider instance.`
				);
			}

			if (isRedirect) {
				return signInWithRedirect(auth, authProvider);
			} else {
				return signInWithPopup(auth, authProvider);
			}
		});

	const signInWithGoogle = (isRedirect = false) => signInWithProvider('googleProvider', isRedirect);

	const signInWithFacebook = (isRedirect = false) =>
		signInWithProvider('facebookProvider', isRedirect);

	const signInWithTwitter = (isRedirect = false) =>
		signInWithProvider('twitterProvider', isRedirect);

	const signInWithGithub = (isRedirect = false) => signInWithProvider('githubProvider', isRedirect);

	const setIsLoading = (loading: boolean) => {
		update((state) => {
			return { ...state, isLoading: loading };
		});
	};

	const setError = (error: AuthError) => {
		update((state) => {
			return { ...state, error: error };
		});
	};

	return {
		subscribe,
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		signInWithGoogle,
		signInWithFacebook,
		signInWithTwitter,
		signInWithGithub,
		signOut,
		setIsLoading,
		updateUserState: (user) => {
			return update((state) => {
				return { ...state, user: user };
			});
		}
	};
};

export { createFirebaseAuth };
