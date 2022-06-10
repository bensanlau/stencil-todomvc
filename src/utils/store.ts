import { createStore } from "@stencil/store";

const todoStore = createStore({
  items: [],
  newItem: '',
});

export default todoStore;
