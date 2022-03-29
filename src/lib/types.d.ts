import type {
	Auth,
	GoogleAuthProvider,
	FacebookAuthProvider,
	TwitterAuthProvider,
	GithubAuthProvider
} from 'firebase/auth';

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

export { AuthProviders, SvelteFirebaseAuthProps };
