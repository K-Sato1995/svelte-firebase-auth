import { writable } from 'svelte/store';
import {
	createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
	signInWithRedirect,
	signInWithPopup,
} from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import type { UserCredential, AuthError } from 'firebase/auth';
import type { Writable } from 'svelte/store';
import type { AuthProviders } from './types'

type AuthProviderName = 'google' | 'facebook' | 'twitter' | 'github';

export interface AuthState {
	isLoading: boolean;
	user: UserCredential | null;
}

const createFirebaseAuth = (auth: Auth, providers: AuthProviders) => {
	const { subscribe, update }: Writable<AuthState> = writable({ isLoading: false, user: null });

	const asyncRun = async <T>(operation: () => Promise<T>) => {
		try {
			toggleIsLoading(true);
			const result = await operation();
			return result;
		} catch (error) {
			return error as AuthError;
		} finally {
			toggleIsLoading(false);
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
				throw new Error(`${providerName} is Not available. See more ->`);
			}

			if (isRedirect) {
				return signInWithRedirect(auth, authProvider);
			} else {
				return signInWithPopup(auth, authProvider);
			}
		});

	const signInWithGoogle = (isRedirect = false) => signInWithProvider('google', isRedirect);

	const signInWithFacebook = (isRedirect = false) => signInWithProvider('facebook', isRedirect);

	const signInWithTwitter = (isRedirect = false) => signInWithProvider('twitter', isRedirect);

	const signInWithGithub = (isRedirect = false) => signInWithProvider('github', isRedirect);

	const toggleIsLoading = (loading: boolean) => {
		update((state) => {
			return { ...state, isLoading: loading };
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
		updateUserState: (user) => {
			return update((state) => {
				return { ...state, user: user };
			});
		},
		toggleIsLoading
	};
};

export { createFirebaseAuth };
