<template>
  <div class="row">
    <div class="flex md3">
      <va-button size="large" class="mr-4" @click="l2FetchSigner"
        >Get Signer</va-button
      >
    </div>
    <div class="flex md6">
      <va-card>
        <va-card-content style="overflow: scroll">
          <span v-if="!l2InFlight && !l2AccountSigner">signer...</span>
          <span v-if="l2AccountSigner">{{ l2AccountSigner }}</span>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "signer",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters("stark", ["l2AccountSigner", "l2InFlight"]),
  },
  methods: {
    ...mapActions("stark", ["l2FetchSigner"]),
  },
};
</script>
