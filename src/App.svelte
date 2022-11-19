
<script>
  import { onMount } from 'svelte';
  import User from "./components/User.svelte";
  import { auth } from './firebase';
  
  let user = false; 
  let service = "s3";
  let data = [];
  let text = "";
  
  function setData(path, type, content) {
    console.log('called')
    
    let opts = {};
    opts.path = path;
    opts.type = type;
    opts.content = content;
    call_api(service + '/set-data', opts).then(function(res) {
      if (res.ok) {
        console.log(res.msg);
      } else {
        console.log('An error occured' + res);
      }
    });
  }
  
  function getData(path) {
    let opts = {};
    opts.path = path;
    call_api(service + '/get-data', opts).then(function(res) {
      if (res.ok) {
        console.log(JSON.parse(res.msg));
        data = JSON.parse(res.msg);
      } else {
        console.log('An error occured: ' + res);
      }
    });
  }
  
  async function call_api(route, mydata) {
  
    try {
      const idToken = await auth.currentUser.getIdToken(true);
  
      var settings = {
        method: 'post',
        body: JSON.stringify(mydata),
        headers: {
          'Authorization': idToken,
          'Content-Type': 'application/json'
        }
      };
      try {
        const fetchResponse = await fetch('/api/' + route, settings);
        const result = await fetchResponse.json();
        return result;
      } catch (e) {
        return e;
      }
  
    } catch (e) {
      console.log("Not signed in");
      return "User is not signed in.";
    }
  
  }
  
  function save(){
    data.push({"text": text});
    data = data;
    setData('data.json', 'json', data)
  }
  
 onMount(async () => { 
 auth.onAuthStateChanged(myuser => {
  // if user is not logged in the auth will be null
  if (myuser) {
    user = myuser;
 
    console.log(user)
    console.log('logged in');
    getData('data.json');
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
 <User bind:user />

  </div>
</div>

</nav>


<div class="container mt-5">
  {#if user}
  <textarea class="form-control mb-3" spellcheck="false" bind:value={text}></textarea>
  
  <button on:click={save}>Save</button>
  
  
  {#if data.length}
  {#each data as item}
  <article>
    {item.text}
  </article>
  {/each}
  
  {/if}
  
  {/if}
  
</div>

</div>


