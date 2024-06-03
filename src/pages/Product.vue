<template>
  <Header />
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          label="Search"
          class="search"
          outlined
        ></v-text-field>
      </v-col>
      <v-col v-for="(product, index) in filteredProducts" :key="index" cols="2">
        <v-card class="mx-auto mt-7" max-width="200" height="200px" @click="toPInfo(product.id)">
          <div class="ImgContainer">
            <v-img :src="product.image" aspect-ratio="1" class="pImg"></v-img>
          </div>
        </v-card>
        <div class="pInfo">
          <div class="pName">{{ product.name }}</div>
          <div class="pPrice">{{ product.price }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from '../components/Header.vue';
import axios from 'axios';

export default {
  components: {
    Header
  },
  data() {
    return {
      products: [],
      search: ''
    };
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    filteredProducts() {
      const filter = this.$route.query.filter || '';
      const search = this.search.toLowerCase();
      return this.products.filter(product => 
        product.name.toLowerCase().includes(search) &&
        product.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:3000/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    toPInfo(productId) {
      this.$router.push({ name: 'Info', params: { id: productId } });
    }
  }
};
</script>

<style scoped>
.v-card {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.pInfo {
  text-align: center;
  margin-top: 8px;
}

.pName {
  font-weight: bold;
}

.pPrice {
  color: gray;
}

.ImgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 10px;
}

.pImg {
  margin: 0;
  padding: 0;
  max-width: 100%;
  max-height: 100%;
}

.search {
  margin-top: 40px;
}
.pImg:hover {
  transform: scale(1.1);
  
}

</style>
