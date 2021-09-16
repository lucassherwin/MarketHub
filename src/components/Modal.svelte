<!-- https://www.creative-tim.com/learning-lab/tailwind/svelte/modals/notus -->

<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import { currentMerchant } from '../stores';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('toggle');
  }

  let type;
  let amount;
  function addToCart(user) { // send item type and quantity
    // console.log('1 >>>>', user.uid)
    dispatch('addToCart', {
      item: {
        type,
        amount
      },
      user: user.uid
    })
  }

  console.log($currentMerchant)
</script>

<User let:user={user}>
  <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <div class="relative w-auto my-6 mx-auto max-w-3xl">
      <!--content-->
      <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <!--header-->
        <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
          <h3 class="text-3xl font-semibold">
            {$currentMerchant.name}
          </h3>
          <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={closeModal}>
            <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              X
            </span>
          </button>
        </div>
        <!--body-->
        <div class='flex'>
          <form on:submit|preventDefault={addToCart(user)}>
            <label class="block text-left">
              <span class="text-red-500">Select Produce</span>
              <select bind:value={type} class='form-select block w-full mt-1'>
                {#each $currentMerchant.produce as p}
                  <option value={p.type}>{p.type}</option>
                {/each}
              </select>
            </label>
  
            <input bind:value={amount}>
  
            <button disabled={!amount} type='submit'>Add To Cart</button>
          </form>
        </div>
        <!--footer-->
        <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <!-- <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={toggleModal}>
            Close
          </button>
          <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={toggleModal}>
            Save Changes
          </button> -->
        </div>
      </div>
    </div>
  </div>
  <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</User>