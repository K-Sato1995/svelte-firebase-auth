import type {
	Auth,
	GoogleAuthProvider,
	FacebookAuthProvider,
	TwitterAuthProvider,
	GithubAuthProvider,
	AuthError
} from 'firebase/auth';

type AuthProviderName =
	| 'googleProvider'
	| 'facebookProvider'
	| 'twitterProvider'
	| 'githubProvider';

type AuthProviders = {
	googleProvider?: GoogleAuthProvider;
	facebookProvider?: FacebookAuthProvider;
	twitterProvider?: TwitterAuthProvider;
	githubProvider?: GithubAuthProvider;
};

interface SvelteFirebaseAuthProps {
	firebaseAuth: Auth;
	providers?: AuthProviders;
}

export interface AuthState {
	isLoading: boolean;
	user: UserCredential | null;
	error: AuthError | null;
}

export { AuthState, AuthProviders, SvelteFirebaseAuthProps, AuthProviderName };
