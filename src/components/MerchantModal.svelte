<!-- https://www.creative-tim.com/learning-lab/tailwind/svelte/modals/notus -->
<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
    import { currentMerchant } from '../stores';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let product = '';
    let pricePerUnit;
  
    function closeModal() {
      dispatch('toggle');
    }

    function addProduct(user, merchantData) {
      console.log('add prodduct', product, 'ppu', pricePerUnit)
      dispatch('addProduct', {
        product,
        pricePerUnit,
        user,
        merchantData
      })
    }
</script>

<User let:user={user}>
  <Doc path={`merchants/${user.uid}`} let:data={merchantData} let:ref={merchantRef}>
    <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Add Product
            </h3>
            <button class=" absolute p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={closeModal}>
              <span class="bg-transparent text-black h-6 w-6 text-2xl outline-none focus:outline-none">
                X
              </span>
            </button>
          </div>
          <!--body-->
          <div class='flex'>
            <form on:submit|preventDefault={addProduct(user, merchantData)}>
              <label>
                Product Name:
                <input type='text' bind:value={product}>
              </label>
              <label>
                Price Per Unit:
                <input bind:value={pricePerUnit}>
              </label>
              <button disabled={!pricePerUnit} type='submit'>Add Product</button>
            </form>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </Doc>
</User>

