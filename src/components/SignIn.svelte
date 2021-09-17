<script>
  import { email, password, userType } from '../stores';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let auth;

  function signIn(email, password) {
    console.log(email, password);

    auth.signInWithEmailAndPassword(email, password)
    .then((userCred) => {
      console.log(userCred);
    })
    .catch((error) => {
      console.error(error.code, error.message)
    })
  }

  function toggleSignUp() {
    dispatch('toggleSignUp')
  }
</script>

<!-- <h1>Sign In</h1>

<label>Email:</label>
<input type='email' bind:value={$email}>

<label>Password:</label>
<input type="password" bind:value={$password}>

<button on:click={() => signIn($email, $password)}>Sign In</button> -->

<div class="bg-gray-300 p-6" style="font-family: Roboto;">
	<div class="bg-white w-full lg:w-1/3 mx-auto rounded-lg lg:my-20 px-4 py-4 shadow-lg">
		<input type='text' placeholder="Email"
            class="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" bind:value={$email} />
		<input type='password' placeholder="Password"
            class="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" bind:value={$password} />
            <hr class="">
    <div class="mt-4">
      <span class="text-gray-700">Sign In As:</span>
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
            style="background-color:#1977f2;" on:click={signIn($email, $password)}>Log In</button>
		<div class="flex justify-center my-6">
			<button class="text-white h-12 rounded px-6 font-bold" style="background-color:#54b72b" on:click={toggleSignUp}>Create New Account </button>
		</div>
	</div>
</div>