import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { client } from "./client";

createApp(App)
  .use(router)
  .use(vuetify)
  .provide(DefaultApolloClient, client)
  .mount("#app");


  