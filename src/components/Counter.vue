<template>
  <div class="row">
    <div class="flex md3">
      <va-button size="large" class="mr-4" @click="l2FetchCount"
        >Get Count</va-button
      >
    </div>
    <div class="flex md6">
      <va-card>
        <va-card-content>
          <span v-if="!l2InFlight && !l2Count">count...</span>
          <span v-if="l2Count">{{ l2Count }}</span>
        </va-card-content>
      </va-card>
    </div>
    <div class="flex md3">
      <va-button
        size="large"
        color="warning"
        class="mr-4"
        @click="l2IncrementCount"
        >Increment Count</va-button
      >
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "counter",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters("stark", ["l2Count", "l2InFlight"]),
  },
  methods: {
    ...mapActions("stark", ["l2FetchCount", "l2IncrementCount"]),
  },
};
</script>
