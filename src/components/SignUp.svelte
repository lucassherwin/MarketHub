<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import createUserWithEmailAndPassword from 'firebase/auth';

  import { email, password, userType } from '../stores';

  export let auth;

  function signUp(email, password, userType, ref) {
    // console.log(email, password, userType);

    auth.createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      // once a user successfully signs up create a new farmer or customer depending on the type of user
      // if customer -> create customer doc
      if(userType === 'customers') {
        console.log(ref)
        // ref.set({
        //   name: email
        // })
      }
      // if merchant -> create merchant doc
      // db.collection(`${userType}`).doc(``)
      console.log(userCred);
    })
    .catch((error) => {
      console.error(error.code, error.message)
    })
  }
</script>

<h1>Sign Up</h1>

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
  {#if $userType !== ""}
    <Collection path={`${$userType}`} let:ref={userRef}>
      <button on:click={() => signUp($email, $password, $userType, userRef)}>Sign Up</button>
    </Collection>
  {/if}
