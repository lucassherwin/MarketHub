<script>
  import createUserWithEmailAndPassword from 'firebase/auth';

  import { doc, setDoc } from 'firebase/firestore'

  import { email, password, userType } from '../stores';

  export let auth;

  // export let db;

  // async function createUser() {
  //   await setDoc(doc(db, `${userType}`))
  // }
  
  async function signUp(email, password, userType) {
    console.log(email, password, userType);

    auth.createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      // once a user successfully signs up create a new farmer or customer depending on the type of user
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
    <input type='radio' value='customers' bind:value={$userType} id='customer'>
    <label for='customer'>Customer</label>
  </div>
  <div>
    <input type='radio' value='merchants' bind:value={$userType} id='merchant'>
    <label for='merchant'>Merchant</label>
  </div>
</div>

<button on:click={() => signUp($email, $password, $userType)}>Sign Up</button>