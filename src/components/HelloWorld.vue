<template>
  <div class="hello">
    <h2 class="display-2 mt-2 mb-3">{{ msg }}</h2>
    <p>
      Vue3.js boilerplate for connecting to and interacting with Starknet<br /><br />
      Current browser wallet provider: Argent-X
      <a
        href="https://github.com/argentlabs/argent-x"
        target="_blank"
        rel="noopener"
        >argent-x</a
      >.
    </p>
    <h3 class="display-4 mb-3">Includes:</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >Vue3.js</a
        >
      </li>
      <li>
        <a href="https://next.vuex.vuejs.org" target="_blank" rel="noopener"
          >Vuex 4</a
        >
      </li>
      <li>
        <a href="https://vuestic.dev/" target="_blank" rel="noopener"
          >Vuestic UI</a
        >
      </li>
      <li>
        <a href="https://www.starknetjs.com" target="_blank" rel="noopener"
          >Starknet.js</a
        >
      </li>
      <li>
        <a
          href="https://github.com/argentlabs/argent-x"
          target="_blank"
          rel="noopener"
          >Argent X Wallet</a
        >
      </li>
    </ul>
    <h3 class="display-4 mb-3">Connect to Argent X:</h3>
    <div class="container-fluid main-control">
      <div class="row">
        <div class="flex md3">
          <va-button size="large" class="mr-4" @click="l2ConnectWallet"
            >Connect</va-button
          >
        </div>
        <div class="flex md6">
          <va-card>
            <va-card-content v-if="!l2IsConnected" class="not-connected">
              wallet addr...</va-card-content
            >
            <va-card-content v-if="l2IsConnected">
              {{ l2ActiveAccount.substring(0, 7) }}...({{ l2ChainName }})
            </va-card-content>
          </va-card>
        </div>
        <div class="flex md3">
          <va-button
            size="large"
            color="warning"
            gradient
            @click="l2DisconnectWallet"
            >Disconnect</va-button
          >
        </div>
      </div>
    </div>
    <div class="container-fluid main-control" v-if="l2IsConnected">
      <Signer></Signer>
      <Counter class="mt-5"></Counter>
    </div>
    <div class="container-fluid align-items-center pt-5" v-if="l2TxStatus">
      <va-alert color="success" class="m-4" style="max-width: 40rem">
        <span><strong>TxStatus:</strong> {{ l2TxStatus }}</span>
        <span><strong>TxHash: </strong> {{ l2TxHash }}</span>
      </va-alert>
    </div>
    <h3 class="display-4 mb-3">More Epic Resources:</h3>
    <ul>
      <li>
        <a
          href="https://github.com/gakonst/awesome-starknet"
          target="_blank"
          rel="noopener"
          >Awesome StarkNet</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Signer from "@/components/Signer.vue";
import Counter from "@/components/Counter.vue";

export default {
  name: "HelloWorld",
  components: {
    Signer,
    Counter,
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters("stark", [
      "l2ActiveAccount",
      "l2AccountSigner",
      "l2IsConnected",
      "l2TxStatus",
      "l2TxHash",
      "l2ChainName",
      "l2ErrWallet",
    ]),
  },
  methods: {
    ...mapActions("stark", ["l2ConnectWallet", "l2DisconnectWallet"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-control {
  padding: 2rem 6rem 0rem 6rem;
}
.not-connected {
  color: lightgrey !important;
}

h3 {
  margin: 40px 0 0;
  text-decoration: underline;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
