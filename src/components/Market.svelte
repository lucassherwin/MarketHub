<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import Modal from './Modal.svelte'
  import Cart from './Cart.svelte';
  import { currentMerchant, cart } from '../stores';

  export let db;

  let showModal = false;

  let total;

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
    let user = event.detail.user // users uid
    let item = event.detail.item // { pricePerUnit: x, type: 'y'}
    let amount = event.detail.amount

    let customerData = event.detail.customerData;

    // add the item to the cart
    $cart = [...$cart, item]

    // get previous total from user doc
    let prevTotal = customerData.cartTotal;

    // calculate total
    total = prevTotal + (item.pricePerUnit * amount);

    // update cart in firestore
    db.collection('customers').doc(user).update({cart: $cart, total});

    alert(`Added ${item.type} to cart. Your total is now ${total}`);
  }
</script>

{#if showModal}
  <Modal on:toggle={closeModal} on:addToCart={handleAddToCart} />
{/if}

<div class="flex">
  <div class='flex-1'>
    <Cart />
  </div>
  <div class='flex-1'>
    <div class='box'></div>
    <div class='marketContainer'>
      <!-- loop over merchants and draw a square for each -->
      <Collection path={'merchants'} let:data={merchants}>
        {#each merchants as merchant}
          <div class='square' on:click={toggleModal(merchant)}>{merchant.name}</div>
        {/each}
      </Collection>
    </div>
  </div>
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