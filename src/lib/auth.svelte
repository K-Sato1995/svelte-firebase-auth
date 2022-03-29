<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { createFirebaseAuth } from './index';
	import type { Auth } from 'firebase/auth';
	// import type { Writable } from 'svelte/store';
	// import type { AuthState } from './index'
	export let firebaseAuth: Auth;

	const svelteFirebaseAuth = createFirebaseAuth(firebaseAuth);
	onMount(() => {
		const unsubscribeAuthStateListener = firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
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
