import { createStore } from "@stencil/store";

const todoStore = createStore({
  filter: '',
  items: [],
  newItem: '',
});

export default todoStore;
