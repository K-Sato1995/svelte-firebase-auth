<script>
	import Auth from '$lib/auth.svelte';
	import { initializeApp } from 'firebase/app';
	import {
		getAuth,
		GoogleAuthProvider,
		FacebookAuthProvider,
		TwitterAuthProvider,
		GithubAuthProvider
	} from 'firebase/auth';

	const firebaseConfig = {
		apiKey: 'AIzaSyCuOi8s4GbjwAhKkzbxlZXaSq9q_PKIMwM',
		authDomain: 'fir-test-ab8f6.firebaseapp.com',
		projectId: 'fir-test-ab8f6'
	};

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
		{#if svelteFirebaseAuthState.isLoading}
			<h1>Loading</h1>
		{:else if svelteFirebaseAuthState.user}
			<div class="w-full max-w-xs">
				<div class="text-center">
					<h1>Hello World</h1>
					<h2>{svelteFirebaseAuthState.user.email}</h2>
					<button
						type="button"
						class="mt-3"
						on:click={() => {
							signOut();
						}}>Logout</button
					>
				</div>
			</div>
		{:else}
			<button
				on:click={() => {
					createUserWithEmailAndPassword('test@example.comsssssssssssss', 'password');
				}}>New Account</button
			>
			<button
				type="button"
				class="mt-3"
				on:click={() => {
					signInWithEmailAndPassword('test@example.comsssssssssssss', 'password');
				}}>SignIn with email & password</button
			>
			<button
				type="button"
				on:click={() => {
					signInWithGoogle();
				}}
			>
				Sign In with Google
			</button>

			<button
				type="button"
				on:click={() => {
					signInWithFacebook();
				}}
			>
				Sign In with Facebook
			</button>

			<button
				type="button"
				on:click={() => {
					signInWithTwitter();
				}}
			>
				Sign In with Twitter
			</button>
			<button
				type="button"
				on:click={() => {
					signInWithGithub();
				}}
			>
				Sign In with Github
			</button>
		{/if}
	</Auth>
</div>
