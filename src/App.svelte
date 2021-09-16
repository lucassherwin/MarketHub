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

  import { userType } from './stores'

  let db = firebase.firestore();

  let signIn = false

  // components
  import SignUp from './components/SignUp.svelte';
  import SignIn from "./components/SignIn.svelte";
  import Market from './components/Market.svelte';
  import MerchantHub from './components/MerchantHub.svelte';
</script>

<main>
  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>
    <h1>Welcome to MarketHub</h1>
    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      Welcome User
      <em>{user.uid}</em>
      <button on:click={() => auth.signOut()}>Sign Out</button>
      <hr />
      {#if $userType === 'customers'}
        <Market db={db} />
      {:else}
        <MerchantHub db={db} />
      {/if}
      <div slot="signed-out">
        <!-- <SignIn auth={auth} /> -->
        {#if !signIn}
          <SignUp auth={auth} db={db} />
          <p class="text-blue-400" on:click={() => signIn = !signIn}>Click here to sign in</p>
        {:else}
          <SignIn auth={auth} />
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