import type {
	GoogleAuthProvider,
	FacebookAuthProvider,
	TwitterAuthProvider,
	GithubAuthProvider,
	User
} from 'firebase/auth';

const providers = {
	googleProvider: {} as GoogleAuthProvider,
	twitterProvider: {} as TwitterAuthProvider,
	githubProvider: {} as GithubAuthProvider,
	facebookProvider: {} as FacebookAuthProvider
};

const fakeUser = {
	displayName: 'Mike Trout'
} as User;

export { fakeUser, providers };
