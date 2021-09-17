<script>
  import { cart } from '../stores';

  function removeFromCart(item) {
    console.log(item)
    $cart = $cart.filter(c => c.type !== item);
    console.log($cart)
  }
</script>

<div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
    <div class="mb-4">
      <h1 class="text-grey-darkest">Cart</h1>
    </div>
    <div>
      <div class="flex mb-4 items-center justify-center">
        <ul class="flex content-center">
          <li>
            {#each $cart as c}
              <div class="flex items-center">
                <p class="w-full text-grey-darkest pr-16">{c.type}</p>
                <button class="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
                  on:click={removeFromCart(c.type)}>
                  Remove</button>
              </div>
            {/each}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>