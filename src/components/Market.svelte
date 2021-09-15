<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
</script>

<div class='box'></div>
<div class='marketContainer'>
  <!-- loop over merchants and draw a square for each -->
  <Collection path={'merchants'} let:data={merchants}>
    {#each merchants as merchant}
      <div class='square'>{merchant.name}</div>
    {/each}
  </Collection>

</div>

<style>
  .marketContainer {
    width: 800px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .box {
  width: 800px; 
  height: 100px;  
  border: solid 5px #000;
  border-color: #000 transparent transparent transparent;
  border-radius: 50%/100px 100px 0 0;
}

.square {
  width: 75px;
  height: 75px;
  background: red;
  border: solid 1px black;
}


</style>