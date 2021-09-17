<script>
  // firebase
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import { firebaseConfig } from '../firebaseConfig'

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";  

  firebase.initializeApp(firebaseConfig);

  import { userType, cart } from './stores'

  let db = firebase.firestore();

  
  // components
  import SignUp from './components/SignUp.svelte';
  import SignIn from "./components/SignIn.svelte";
  import Market from './components/Market.svelte';
  import MerchantHub from './components/MerchantHub.svelte';

  let signUp = false

  function toggleSignUp() {
    signUp = !signUp;
  }

  function setUserCart(data) {
    $cart = data.detail.data.cart;
  }

  </script>

<main>
  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>
    <h1>Welcome to MarketHub</h1>
    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      <Doc path={`${$userType}/${user.uid}`} let:data={userData} on:data={setUserCart}>
        Welcome User
        <em>{user.uid}</em>
        <button on:click={() => auth.signOut()} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sign Out</button>
        <hr />
        {#if $userType === 'customers'}
          <Market db={db} />
        {:else}
          <MerchantHub db={db} />
        {/if}
      </Doc>
      <div slot="signed-out" class="bg-gray-300">
        <!-- <SignIn auth={auth} /> -->
        {#if !signUp}
          <SignIn auth={auth} on:toggleSignUp={toggleSignUp} />
          <!-- <p class="text-blue-400" on:click={showSignUp}>Click here to create an account</p> -->
        {:else}
          <SignUp auth={auth} db={db} on:toggleSignUp={toggleSignUp} />
        {/if}
      </div>
    </User>
  </FirebaseApp>
</main>


<!-- Styles -->
<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1,
  em {
    color: #ff3e00;
  }

  hr {
    height: 1px;
    border: none;
    background: rgb(195, 195, 195);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>