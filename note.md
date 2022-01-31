- render 覚書
  [vue-cli で見つけた rendar 関数](https://reffect.co.jp/vue/vue-js-render)

```JavaScript
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello, World!',
    };
  },
  render() {
    return Vue.h('p', this.message);
  },
}).mount('#app');
```
