import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { installX } from './x-plugin';

const app = createApp(App);
// installX(app);
app.use(router).mount('#app');
