<script>
  import { email, password } from '../stores';

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
</script>

<h1>Sign In</h1>

<label>Email:</label>
<input type='email' bind:value={$email}>

<label>Password:</label>
<input type="password" bind:value={$password}>

<button on:click={() => signIn($email, $password)}>Sign In</button>