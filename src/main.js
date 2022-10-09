import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Toast, { POSITION } from "vue-toastification";

const app = createApp(App);

app.use(Toast, {
  timeout: 1500,
  position: POSITION.TOP_CENTER,
  icon: false,
  hideProgressBar: true,
  closeButton: false,
  toastClassName: "simple-toast",
  transition: "Vue-Toastification__fade",
});

app.mount("#app");
