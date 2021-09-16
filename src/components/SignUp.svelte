<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import createUserWithEmailAndPassword from 'firebase/auth';

  import { email, password, userType, name } from '../stores';

  export let auth;
  export let db;

  function signUp() {
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
          cartTotal: 0,
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
</script>

<h1>Sign Up To Get Started</h1>

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
</div>

<!-- Conditional to make sure the user selects a type, could also make a default value -->
{#if $userType !== ""}
  <button on:click={() => signUp()}>Sign Up</button>
{/if}
