<script>
	import Auth from '../../auth.svelte';
	import { initializeApp } from 'firebase/app';
	import {
		getAuth,
		GoogleAuthProvider,
		FacebookAuthProvider,
		TwitterAuthProvider,
		GithubAuthProvider
	} from 'firebase/auth';

	const firebaseConfig = {};

	const firebaseApp = initializeApp(firebaseConfig);
	const firebaseAuth = getAuth(firebaseApp);
</script>

<div class="wrapper">
	<Auth
		firebaseAuthProps={{
			firebaseAuth: firebaseAuth,
			providers: {
				googleProvider: new GoogleAuthProvider(),
				facebookProvider: new FacebookAuthProvider(),
				twitterProvider: new TwitterAuthProvider(),
				githubProvider: new GithubAuthProvider()
			}
		}}
		let:svelteFirebaseAuthState
		let:signInWithEmailAndPassword
		let:createUserWithEmailAndPassword
		let:signOut
		let:signInWithGoogle
		let:signInWithFacebook
		let:signInWithTwitter
		let:signInWithGithub
	>
		<!-- Wrapp stuff up here and test it? -->
	</Auth>
</div>
