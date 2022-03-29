import { writable } from 'svelte/store';
import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	signInWithPopup,
	FacebookAuthProvider,
	TwitterAuthProvider,
	GithubAuthProvider,
} from 'firebase/auth';
import type { UserCredential, AuthError } from 'firebase/auth';
import type { Writable } from 'svelte/store'

const firebaseConfig = {
};

type AuthProviderName = 'google' | 'facebook' | 'twitter' | 'github';

const providers = {
	google: new GoogleAuthProvider(),
	facebook: new FacebookAuthProvider(),
	twitter: new TwitterAuthProvider(),
	github: new GithubAuthProvider()
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

interface AuthState {
	isLoading: boolean;
	user: UserCredential | null;
}

const createFirebaseAuth = () => {
	// Works
	const { subscribe, update }: Writable<AuthState> = writable({ isLoading: false, user: null });

	const asyncRun = async <T>(operation: () => Promise<T>) => {
		try {
			svelteFirebaseAuth.toggleIsLoading(true);
			const result = await operation();
			return result;
		} catch (error) {
			return error as AuthError;
		} finally {
			svelteFirebaseAuth.toggleIsLoading(false);
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
		toggleIsLoading: (loading) => {
			return update((state) => {
				return { ...state, isLoading: loading };
			});
		}
	};
};

export const svelteFirebaseAuth = createFirebaseAuth();
