<script>
  // firebase
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  let firebaseConfig = {
    apiKey: "AIzaSyCPj0y5C0its_v1Xu6Us_0b0OLpr2TH1g0",
    authDomain: "market-e3784.firebaseapp.com",
    projectId: "market-e3784",
    storageBucket: "market-e3784.appspot.com",
    messagingSenderId: "32809875020",
    appId: "1:32809875020:web:924c46825037f47ce2e6e9",
    measurementId: "G-7GPF9J412Y"
  };

  firebase.initializeApp(firebaseConfig);

  // components
  import SignUp from './components/SignUp.svelte';
  import SignIn from "./components/SignIn.svelte";
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
      
      <div slot="signed-out">
        <SignIn auth={auth} />
        <SignUp auth={auth} />
      </div>

      <hr />
    </User>

    <h1>Customers</h1>
    <Collection path={'customers'} let:data={customers} on:data={(e) => console.log(e)}>
      {#each customers as customer}
        {customer.name}
      {/each}
    </Collection>
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