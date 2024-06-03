<template>
  <Header />
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card v-if="product" class="mx-auto mt-7" elevation="0">
          <v-row>
            <v-col cols="6" class="ImgContainer">
              <v-img :src="product.image" aspect-ratio="1" class="pImg"></v-img>
            </v-col>
            <v-col cols="6">
              <v-card-text>
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-subtitle>{{ product.price }}</v-card-subtitle>
                <v-row justify="center" align="center" class="mt-4">
                  <v-btn 
                    icon 
                    @click="toggleLike"
                    :class="{ 'likedbtn': liked }"
                  >
                    <v-icon>{{ liked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                  </v-btn>
                  <span v-if="liked" class="mx-2">{{ product.likes }}</span>
                </v-row>
                <v-row justify="center" align="center">
                  <v-btn @click="deQuantity">-</v-btn>
                  <span class="mx-2">{{ quantity }}</span>
                  <v-btn @click="inQuantity">+</v-btn>
                </v-row>
                <v-card-actions class="cart">
                  <v-btn class="mx-auto cartbtn" color="dark" outlined @click="addToCart">Add to Cart</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
        <v-alert v-else type="info">
          {{ loadingMessage }}
        </v-alert>
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
      product: null,
      quantity: 1,
      loadingMessage: 'Loading product information.........',
      liked: false,
      userId: '1', 
    };
  },
  created() {
    this.fetchProductDetails();
  },
  methods: {
    addToCart() {
      axios.get(`http://localhost:3000/cartitem?productId=${this.product.id}`)
        .then(response => {
          if (response.data.length > 0) {
            const existingItem = response.data[0];
            const newQuantity = existingItem.quantity + this.quantity;
            axios.patch(`http://localhost:3000/cartitem/${existingItem.id}`, {
              quantity: newQuantity
            })
            .then(response => {
              console.log('Updated', response.data);
              location.reload();
            })
            .catch(error => {
              console.error('Failed to update item quantity.', error);
            });
          } else {
            axios.post(`http://localhost:3000/cartitem`, {
              productId: this.product.id,
              name: this.product.name,
              image: this.product.image,
              price: this.product.price,
              quantity: this.quantity,
            })
            .then(response => {
              console.log('Added to cart.', response.data);
              location.reload();
            })
            .catch(error => {
              console.error('Failed to add item to cart:', error);
            });
          }
        })
        .catch(error => {
          console.error('Error checking cart item:', error);
        });
    },
    fetchProductDetails() {
      const productId = this.$route.params.id;
      axios.get(`http://localhost:3000/products/${productId}`)
        .then(response => {
          console.log('Product data:', response.data);
          if (response.data && Object.keys(response.data).length > 0) {
            this.product = response.data;
            this.liked = this.loadLike(productId);
          } else {
            this.loadingMessage = 'Product not found';
          }
        })
        .catch(error => {
          console.error('Failed to fetch product details:', error);
          this.loadingMessage = 'Failed to load product details';
        });
    },
    inQuantity() {
      this.quantity++;
    },
    deQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    toggleLike() {
      this.liked = !this.liked;
      if (this.liked) {
        this.product.likes = 1; 
      } else {
        this.product.likes = 0; 
      }
      this.updateLike(this.product.id, this.liked, this.product.likes);
      this.saveLike(this.product.id, this.liked); 
    },
    saveLike(productId, liked) {
      localStorage.setItem(`liked_${productId}`, liked);
    },
    loadLike(productId) {
      const liked = localStorage.getItem(`liked_${productId}`);
      return liked === 'true';
    },
    updateLike(productId, liked, likes) {
      if (liked) {
        axios.post(`http://localhost:3000/wishitem`, {
          userId: this.userId,
          productId: productId,
        })
        .then(response => {
          console.log('Liked', response.data);
        })
        .catch(error => {
          console.error('Failed to like', error);
        });
      } else {
        axios.get(`http://localhost:3000/wishitem?userId=${this.userId}&productId=${productId}`)
          .then(response => {
            if (response.data.length > 0) {
              const wishItemId = response.data[0].id;
              axios.delete(`http://localhost:3000/wishitem/${wishItemId}`)
                .then(response => {
                  console.log('Removed like', response.data);
                })
                .catch(error => {
                  console.error('Failed to remove like', error);
                });
            }
          })
          .catch(error => {
            console.error('Failed to fetch like state', error);
          });
      }

      axios.patch(`http://localhost:3000/products/${productId}`, { likes: likes })
        .then(response => {
          console.log('Liked', response.data);
        })
        .catch(error => {
          console.error('Failed to like', error);
        });
    }
  }
};

</script>

<style scoped>
.v-card {
  text-align: center;
  margin-top: 20px;
}

.ImgContainer {
  border-right: 1px solid #ccc;
  padding: 20px; 
  box-sizing: border-box; 
}

.pImg {
  max-width: 100%; 
}

.v-card-text {
  padding: 20px;
}


.cartbtn {
  width: 80%;
  border: 1px solid #000;
}

.mx-auto {
  margin: 0 auto;
}

.likedbtn {
  color: black;
  margin-left: 10px;
  margin-top: 20px;
}

.v-btn {
  margin-top: 20px;
  margin: 5px;
}

.mx-2 {
  margin-left: 10px;
  margin-right: 10px;
}

.mt-4 {
  margin-top:  16px;
}

.v-row + .v-row {
  margin-top: 40px;
}

.cart {
  margin-top: 40px;
}
</style>
