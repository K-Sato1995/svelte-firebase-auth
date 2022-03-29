<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { createFirebaseAuth } from './index';
	import type { SvelteFirebaseAuthProps } from './types';

	export let firebaseAuthProps: SvelteFirebaseAuthProps;

	const { providers, firebaseAuth } = firebaseAuthProps;

	const svelteFirebaseAuth = createFirebaseAuth(firebaseAuth, providers);

	onMount(() => {
		const unsubscribeAuthStateListener = firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				svelteFirebaseAuth.updateUserState(user);
			} else {
				svelteFirebaseAuth.updateUserState(null);
			}
		});
		return () => {
			unsubscribeAuthStateListener();
		};
	});
</script>

<slot
	svelteFirebaseAuthState={$svelteFirebaseAuth}
	signInWithEmailAndPassword={svelteFirebaseAuth.signInWithEmailAndPassword}
	createUserWithEmailAndPassword={svelteFirebaseAuth.createUserWithEmailAndPassword}
	signOut={svelteFirebaseAuth.signOut}
	signInWithGoogle={svelteFirebaseAuth.signInWithGoogle}
	signInWithFacebook={svelteFirebaseAuth.signInWithFacebook}
	signInWithTwitter={svelteFirebaseAuth.signInWithTwitter}
	signInWithGithub={svelteFirebaseAuth.signInWithGithub}
/>
