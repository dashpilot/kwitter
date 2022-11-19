<script>
  import { onMount } from 'svelte';
  import { auth, googleProvider } from './firebase';
  
  let user = false;
  
  
  async function signIn() {
    
    auth.signInWithPopup(googleProvider).then(function(myuser) {
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

  onMount(async () => {
   auth.onAuthStateChanged(myuser => {
     // if user is not logged in the auth will be null
     if (myuser) {
       user = myuser;
       console.log(user)
       console.log('logged in');
     } else {
       console.log('not logged in');
     }
   });
  });

  
 
</script>


<div>

<nav>

<div class="row g-0">
  <div class="col-6"></div>
  
  <div class="col-6 text-end">
    
    {#if user}
 
    <button on:click={signOut}>Sign Out</button>
    {:else}
    <button on:click={signIn}>Log in with Google</button>
    {/if}

  </div>
</div>

</nav>

</div>