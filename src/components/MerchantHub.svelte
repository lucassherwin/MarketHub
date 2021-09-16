<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import MerchantModal from './MerchantModal.svelte';

  import { currentMerchantProducts } from '../stores';

  export let db;

  let showMerchantModal = false;

  function toggleMerchantModal() {
    console.log('open');
    showMerchantModal = !showMerchantModal;
  }

  function closeModal() {
    console.log('close');
    showMerchantModal = !showMerchantModal;
  }

  function addProduct(event) {
    console.log('add product')

    let type = event.detail.product;
    let pricePerUnit = event.detail.pricePerUnit;
    let user = event.detail.user.uid;
    let merchantData = event.detail.merchantData; // Object { cartTotal: 0, name: "carrot farm", products: [] }

    // update state
    $currentMerchantProducts = [...$currentMerchantProducts, {type, pricePerUnit}];
    console.log($currentMerchantProducts);
    // add in firebase
    db.collection('merchants').doc(user).update({products: $currentMerchantProducts});
    // alert user that product was added
    alert(`${type} was added at $${pricePerUnit}/unit`)
    // close modal
    closeModal();
  }

</script>

<h1>Merchant hub</h1>

<p>My Products:</p>
<ul>
  {#each $currentMerchantProducts as p}
    <li>{p.type}</li>
  {/each}
</ul>
<button on:click={toggleMerchantModal}>Add Product</button>

{#if showMerchantModal}
  <MerchantModal on:toggle={closeModal} on:addProduct={addProduct} />
{/if}