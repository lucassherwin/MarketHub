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

  let db = firebase.firestore();

  // components
  import SignUp from './components/SignUp.svelte';
  import SignIn from "./components/SignIn.svelte";
  import Market from './components/Market.svelte';
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
      <Market />

      <div slot="signed-out">
        <!-- <SignIn auth={auth} /> -->
        <SignUp auth={auth} db={db} />
      </div>

    </User>

    <!-- <h1>Customers</h1>
    <Collection path={'customers'} let:data={customers} on:data={(e) => console.log(e)}>
      <ul>
        {#each customers as customer}
          <li>{customer.name}</li>
        {/each}
      </ul>
    </Collection> -->

  </FirebaseApp>

</main>


<!-- Styles -->
<!-- <style>
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
</style> -->