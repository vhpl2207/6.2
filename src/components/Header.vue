<template>
  <header>
    <nav>
      <div class="d-flex align-center my-3">
        <v-img style="margin-left: 12%;" :src="require('../assets/logo.jpg')" contain height="50"/>
        <v-btn prepend-icon="mdi mdi-account" class="navbtn mx-2" text @click="showLogin = true">Login</v-btn>
        <v-btn prepend-icon="mdi mdi-cart" class="navbtn mx-2" text @click="showCart = true">Cart</v-btn>
      </div>




      <div class="d-flex justify-center my-3">
        <router-link to="/"><v-btn append-icon="mdi" class="navbtn mx-6" text>ALL</v-btn></router-link>
       
        <div class="dropdown">
          <router-link to="/product"><v-btn append-icon="mdi mdi-chevron-down" class="navbtn mx-6">COLLECTIONS</v-btn></router-link>
              <div class="dropdownin">
                <router-link :to="{ name: 'Product', query: { filter: 'Chiikawa' }}"><p>Chiikawa</p></router-link><br>
                 <router-link :to="{ name: 'Product', query: { filter: 'The Battle Cats' }}"><p>The Battle Cats</p></router-link><br>
                 <router-link :to="{ name: 'Product', query: { filter: 'Nagano' }}"><p>Nagano</p></router-link><br>
                 <router-link :to="{ name: 'Product', query: { filter: 'Karameru' }}"><p>Karameru</p></router-link><br>
                 <router-link :to="{ name: 'Product', query: { filter: 'Taiko' }}">Taiko no Tatsujin</router-link><br>
               </div>
        </div>
        <router-link to="/about"><v-btn append-icon="mdi" class="navbtn mx-6" text>ABOUT</v-btn></router-link>
      </div>
    </nav>
    <hr>
    <v-dialog v-model="showLogin" max-width="400" height="76%" class="logbox">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-btn icon @click="showLogin = false" class="closebtn">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-text>
          <input type="text" v-model="user" class="uname" placeholder="Username" />
          <br>
          <input type="password" v-model="password" class="pw" placeholder="Password" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="dark" class="loginbtn" @click="login">SIGN IN</v-btn>
          
        </v-card-actions>
        <router-link to="/signup" class="signupbtn" >Create account</router-link>
       
      
      </v-card>
    </v-dialog>
    <v-dialog v-model="showCart" max-width="400" height="76%" class="logbox">
      <v-card>
        <v-card-title>Shopping Cart</v-card-title>
        <v-btn icon @click="showCart = false" class="closebtn">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-text>
          <div v-for="(item, index) in cartItems" :key="index" class="cartItem">
            <v-row>
              <v-col cols="4">
                <v-img :src="item.image" aspect-ratio="1" class="cartImg"></v-img>
              </v-col>
              <v-col cols="8">
                <div class="cartDetails">
                  <div class="cartName">{{ item.name }}</div>
                  <div class="cartPrice">{{ item.price }}</div>
                  <div class="cartquantity">
                    <v-btn @click="deQuantity(index)">-</v-btn>
                    <span>{{ item.quantity }}</span>
                    <v-btn @click="inQuantity(index)">+</v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
            <button class="deletebtn" @click="deleteCart(index)">Remove</button>
          </div>
        </v-card-text>
        <v-card-actions class="marg">
          <v-btn color="dark" class="loginbtn">Checkout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: '',
      password: '',
      showLogin: false,
      showCart: false,
      cartItems: [],
    };
  },
  methods: {
    async login() {
      let result = await axios.get(
        `http://localhost:3000/users?user=${this.user}&password=${this.password}`
      );
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: 'Wishlist' });
      } else {
        alert("Incorrect Username or Password");
      }
    },
    async fetchCartItems() {
      try {
        const response = await axios.get(`http://localhost:3000/cartitem`);
        this.cartItems = response.data;
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    },
    async deleteCart(index) {
      try {
        const itemId = this.cartItems[index].id;
        await axios.delete(`http://localhost:3000/cartitem/${itemId}`);
        this.cartItems.splice(index, 1);
      } catch (error) {
        console.error('Failed to delete cart item.', error);
      }
    },
    async inQuantity(index) {
      try {
        this.cartItems[index].quantity++;
        await this.updateCartItem(this.cartItems[index]);
      } catch (error) {
        console.error('Failed to update cart item quantity.', error);
      }
    },
    async deQuantity(index) {
      try {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity--;
          await this.updateCartItem(this.cartItems[index]);
        } else {
          await this.deleteCart(index);
        }
      } catch (error) {
        console.error('Failed to update cart item quantity.', error);
      }
    },
    async updateCartItem(cartItem) {
      try {
        await axios.put(`http://localhost:3000/cartitem/${cartItem.id}`, cartItem);
      } catch (error) {
        console.error('Failed to add cart items.', error);
      }
    }
  },
  mounted() {
    this.fetchCartItems();
    let user = localStorage.getItem('user-info');
    if (user) {
      this.$router.push({ name: 'Wishlist' });
    }
  }
};
</script>

<style scoped>
.navbtn {

  box-shadow: none !important;

}

a
{
  color: black !important;
  text-decoration: none;

}

.logbox {
  margin-left: 67%;
}

.logbox .marg {
  margin-bottom: 60%

}
.signupbtn {
  margin-bottom: 60%;
  color: #000;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.loginbtn {
  margin-right: 30%;
  width: 40%;
  color:white;
  background-color: #000;
}

.loginbtn:hover {
  background-color: grey; 
}


.uname, .pw{
  width: 40%;
  text-align: left;
  border-bottom: 1px solid #000;
  margin-left: 30%;
  margin-top: 5px;
  padding-left: 6px;
  padding-bottom: 6px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.pw{
  margin-bottom: 15%;
}

.v-card .v-card-title {
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: -15px;
}

.closebtn {
  background-color: transparent !important;
  box-shadow: none !important;
  margin-left: 84%;
  margin-top: -7.5%;
}

.cartItem {
  display: flex;
  margin-bottom: 20px;
}

.cartImg {
  width: 100%;
  max-width: 100px;
}

.cartDetails {
  margin-left: 20px;
  flex-grow: 1;
}

.cartName {
  font-weight: bold;
}

.cartPrice {
  margin-top: 10px;
}

.cartquantity {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.cartquantity v-btn {
  margin: 0 10px;
  min-width: 30px;
  width: 30px;
  height: 30px;
  padding: 0;
}

.cartquantity span {
  margin: 10px;
}
.deletebtn {
  margin-right: 15px;
  margin-top: -15px;
  text-decoration: underline;

}

.dropbtn {
  background-color: transparent;
  color: black;
  font-size: 16px;
  border: none;
  cursor: pointer;
}


.dropdownin {
  display: none;
  position: absolute;
  background-color: white;
  margin-left: 23px;
  padding: 20px;
  z-index: 100;
}

.dropdown:hover .dropdownin {
  display: block;
}

.dropdownin :hover, .navbtn:hover {
  color: grey; 
}

</style>
