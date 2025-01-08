import "@/assets/style/tailwind.css";
import "@/assets/style/master.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { i18n } from "@/global/i18n";
import { globalRegister } from "@/global";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
globalRegister(app);

app.use(i18n);
app.use(router);
app.use(createPinia());
app.use(Antd).mount("#app");
