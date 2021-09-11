<script>
  import createUserWithEmailAndPassword from 'firebase/auth';

  import { email, password, userType } from '../stores';

  export let auth;

  function signUp(email, password, userType) {
    console.log(email, password, userType);

    auth.createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      // once a user successfully signs up create a new farmer or customer depending on the type of user
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

<p>I am a:</p>
<input type='radio' value='Customer' bind:value={$userType}>
<label>Customer</label>
<input type='radio' value='Merchant' bind:value={$userType}>
<label>Merchant</label>
 <br>
<button on:click={() => signUp($email, $password, $userType)}>Sign Up</button>