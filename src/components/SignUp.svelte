<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import createUserWithEmailAndPassword from 'firebase/auth';

  import { email, password, userType, name } from '../stores';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let auth;
  export let db;

  function signUp() {
    console.log($userType)
    auth.createUserWithEmailAndPassword($email, $password)
    .then(userCred => { // creates a doc with the users uid to query against later on
      if($userType === 'customers') {
        db.collection($userType).doc(userCred.user.uid).set({
          name: $name,
          cartTotal: 0,
          cart: []
        }).then(() => {
          console.log('signed in successfully')
        })
      }
      else {
        db.collection($userType).doc(userCred.user.uid).set({
          name: $name,
          products: []
        }).then(() => {
          console.log('signed in successfully')
        })
      }
    })
    .catch((error) => {
      console.error(error.code, error.message)
    })
  }

  function toggleSignUp() {
    dispatch('toggleSignUp')
  }
</script>


<div class="bg-gray-300 p-6" style="font-family: Roboto;">
	<div class="bg-white w-full lg:w-1/3 mx-auto rounded-lg lg:my-20 px-4 py-4 shadow-lg">
    <input type='text' placeholder="Name" bind:value={$name}
            class="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
		<input type='email' placeholder="Email" bind:value={$email}
            class="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
		<input type='password' placeholder="Password" bind:value={$password}
            class="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
    <div class="mt-4">
      <span class="text-gray-700">Account Type</span>
      <div class="mt-2">
        <label class="inline-flex items-center">
          <input type="radio" class="form-radio" name="accountType" value="customers" bind:group={$userType}>
          <span class="ml-2">Customer</span>
        </label>
        <label class="inline-flex items-center ml-6">
          <input type="radio" class="form-radio" name="accountType" value="merchants" bind:group={$userType}>
          <span class="ml-2">Merchant</span>
        </label>
      </div>
    </div>
		<button class="text-white py-3 rounded-lg w-full font-bold text-xl tracking-wider"
            style="background-color:#1977f2;" on:click={signUp}>Sign Up</button>
		<hr class="">

		<div class="flex justify-center my-6">
			<button class="text-white h-12 rounded px-6 font-bold" style="background-color:#54b72b" on:click={toggleSignUp}>Click Here To Sign In</button>
		</div>
	</div>
</div>

<!-- Conditional to make sure the user selects a type, could also make a default value -->
<!-- {#if $userType !== ""}
  <button on:click={() => signUp()}>Sign Up</button>
{/if} -->


<!-- <h1>Sign Up To Get Started</h1>

<label>Name:</label>
<input type='text' bind:value={$name}>

<label>Email:</label>
<input type='email' bind:value={$email}>

<label>Password:</label>
<input type="password" bind:value={$password}>

<div>
  <p>I am a:</p>
  <div>
    <label for='customer'>
      Customer
      <input type='radio' value='customers' bind:value={$userType} id='customer' bind:group={$userType}>
    </label>
  </div>
  <div>
    <label for='merchant'>
      Merchant
      <input type='radio' value='merchants' bind:value={$userType} id='merchant' bind:group={$userType}>
    </label>
  </div>
</div> -->