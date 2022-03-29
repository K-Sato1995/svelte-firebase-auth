<script>
	import Auth from '$lib/auth.svelte';
</script>

<div class="wrapper">
	<Auth
		let:svelteFirebaseAuthState
		let:signInWithEmailAndPassword
		let:createUserWithEmailAndPassword
		let:signOut
		let:signInWithGoogle
		let:signInWithFacebook
		let:signInWithTwitter
		let:signInWithGithub
    test="WAs"
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


			<button
			type="button"
			class="mt-3"
			on:click={() => {
				signInWithPhoneNumber('9053019178', '222222');
			}}>SignIn with phonenumber</button
		>
		{/if}
	</Auth>
</div>
