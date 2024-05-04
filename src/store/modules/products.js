import shop from "@/api/shop";

export default {
  namespaced: true,

  state: {
    // = data
    items: [],
  },

  getters: {
    // = computed properties
    availableProducts(state) {
      return state.items.filter((product) => product.inventory > 0);
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    },
  },

  mutations: {
    // responsible for setting and updating the state
    // Mutations should be as simple as possible and only responsible for updating just a piece of the state
    setProducts(state, products) {
      // update products
      state.items = products;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    },
  },

  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve) => {
        // Actions can be complex, but never update the state
        // make the AJAX Call to fetch the products
        // run setProducts Mutation
        shop.getProducts((products) => {
          commit("setProducts", products);
          resolve();
        });
      });
    },
  },
};
