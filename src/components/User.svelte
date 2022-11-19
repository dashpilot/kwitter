<script>
  import { onMount } from 'svelte';
  import { auth, googleProvider, twitterProvider } from './../firebase';
  
  export let user;
  
  async function signIn() {
	auth.signInWithPopup(twitterProvider).then(function(myuser) {
	  let handle = myuser.additionalUserInfo.username;
	  localStorage.setItem('handle', handle);
	  user = myuser;
	  console.log(user)
	}, function(e) {
	  console.log(e);
	});
  }
  
  async function signOut() {
	  auth.signOut().then(function() {
		console.log('Signed Out');
		user = false;
	  }, function(error) {
		console.error('Sign Out Error', error);
	  });
  }

  
  
</script>


   
{#if user}
<button on:click={signOut}>Sign Out</button>
{:else}
<button on:click={signIn}>Log in with Twitter</button>
{/if}
