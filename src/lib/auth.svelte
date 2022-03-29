<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { svelteFirebaseAuth } from './index';
	import { auth } from './index';

  export let test: string
	// const getCurrentUser = (auth) => {
	//   return new Promise((resolve, reject) => {
	//     const unsubscribe = auth.onAuthStateChanged(user => {
	//         unsubscribe();
	//         resolve(user);
	//     }, reject);
	//   });
	// }

  console.log(test)
	// wait for fetching the user?
	onMount(() => {
		const unsubscribeAuthStateListener = auth.onAuthStateChanged((user) => {
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
