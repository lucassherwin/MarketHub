<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import Modal from './Modal.svelte'
  import { currentMerchant, cart, currentUser } from '../stores';

  export let db;

  let showModal = false;

  function toggleModal(merchant) {
    $currentMerchant = merchant
    console.log('open');
    showModal = !showModal;
  }

  function closeModal() {
    console.log('close');
    showModal = !showModal;
    $currentMerchant = null; // reset currentMerchant
  }

  function handleAddToCart(event) {
    // event.detail: item, user
    // item: { type, amount }
    // user: uid
    let user = event.detail.user
    let item = event.detail.item

    $cart = [...$cart, item]
    // update in firestore
    // $currentUser[0]
    db.collection('customers').doc(user).update({cart: $cart});
    console.log('cart', $cart)
  }

</script>

{#if showModal}
  <Modal on:toggle={closeModal} on:addToCart={handleAddToCart} />
{/if}

<div class='box'></div>
<div class='marketContainer'>
  <!-- loop over merchants and draw a square for each -->
  <Collection path={'merchants'} let:data={merchants}>
    {#each merchants as merchant}
      <div class='square' on:click={toggleModal(merchant)}>{merchant.name}</div>
    {/each}
  </Collection>
</div>

<span>Cart:</span>
<ul>
  {#each $cart as item}
    <li>{item.type}</li>
  {/each}
</ul>

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