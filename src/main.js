import { createApp } from "vue";
import { VuesticPlugin } from "vuestic-ui"; // <-
import "vuestic-ui/dist/vuestic-ui.css"; // <-
import App from "@/App.vue";
import store from "@/store";

createApp(App).use(VuesticPlugin).use(store).mount("#app");
