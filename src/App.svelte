
<script>
  import { onMount } from 'svelte';
  import User from "./components/User.svelte";
  import { auth, db } from './firebase';
  
  let user = false; 
  let handle = localStorage.getItem('handle')
  let service = "s3";
  let data = [];
  let text = "";
  
  
  /*
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
  */
  
  function getData(table){
    let myref = db.ref(table);
    
    myref.on('value', (snapshot) => {
      
      var result = snapshot.val();
      
      if(result){
      var mydata = [];
      
      Object.keys(result).forEach((key) => {
        mydata.push(result[key]);
      });
      
      mydata = mydata.reverse()
      
      console.log(mydata)
      
      data = mydata;

      console.log(snapshot.val())
      
    }
      // updateStarCount(postElement, data);
    });
    
  
  }
  
  function addItem(){
    let id = Date.now();
    var name = handle;
    if(user.displayName){
      name = user.displayName;
    }
    
    let newPost = {"id": id, "handle": localStorage.getItem('handle'), "name": name, "text": text}

    db.ref('posts/' + id).set(newPost);
    text = "";
  }
  
  
  function deleteItem(table, id){
    if(confirm("Are you sure you wish to delete this item?")){
      let myref = db.ref(table+"/"+id);
      myref.remove()
    }
  }
  
 onMount(async () => { 
 auth.onAuthStateChanged(myuser => {
  // if user is not logged in the auth will be null
  if (myuser) {
    
  
    user = myuser;
 
    console.log(user)
    console.log('logged in');
    getData('posts');
  } else {
    console.log('not logged in');
  }
  });

 });
  
</script>
<div>

<nav>

<div class="row g-0">
  <div class="col-6"><h3 class="pt-1">Kwitter</h3></div>
  
  <div class="col-6 text-end">
 <User bind:user />

  </div>
</div>

</nav>


<div class="container">
  
  <div class="row"><div class="col-8">
  

  {#if user}
  
  
  <div class="add">
    
  
    
  <textarea class="form-control mb-3" spellcheck="false" bind:value={text}></textarea>
  
  <button on:click={addItem}>Post</button>
  <br>
  
</div>

  {#if data.length}
  {#each data as item}
  <article>
    
    <div class="handle">
      
      <span class="name">{item.name}</span><span class="username">@{item.handle}</span>
    
    </div>

    
    <div class="text">{item.text}</div>
    
    {#if item.handle == handle}
    <button class="float-end" on:click={() => deleteItem('posts', item.id)}>delete</button>
    {/if}
    
    <div class="clear"></div>
   
  </article>
  {/each}
  
  {/if}
  
  {/if}
  
  </div><div class="col-4">
    
    <div class="trends">
      
      <h4>Trends</h4>
      
      <div class="trend">#TwitterDown</div>
      <div class="trend">#AbsolutelyNOT</div>
      <div class="trend">#TwitterTakeOver</div>
   
      
    </div>
    
  </div></div>
  
  
</div>


</div>

<style>
  .container{
    max-width: 960px;
  }
  
  
  article{
    padding: 15px;
    border: 1px solid #DDD;
    border-top: 0;
  }
  

  .add{
    border: 1px solid  #DDD;
    border-top: 0;
    padding: 15px;
  }
  
  textarea{
    height: 120px;
    resize: none;
  }
  
  .clear{
    clear: both;
  }
  
  .name{
    font-weight: bold;
  }
  
  .username{
    color: #566370;
    padding-left: 5px;
  }
  
  .trends{
    background-color: #F7F9F9;
    border-radius: 8px;
    padding: 15px;
    margin-top: 15px;
    min-height: 150px;
  }
  
  .trend{
    font-weight: bold;
    padding-bottom: 5px;
  }
</style>
