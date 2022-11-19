
<script>
  import User from "./components/User.svelte";
  import { auth } from './firebase';
  
  let user = false; 
  let service = "s3";
  let content = {"title": "Hello world"};
  
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
        console.log(res.msg);
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
  <button on:click={() => setData('hello.json', 'json', content)}>Set Data</button>
  {/if}
  
</div>

</div>