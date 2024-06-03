
<template>
<div>
    <div class="d-flex align-center my-3">
        <v-img style="margin-left: -20px;" :src="require('../assets/logo.jpg')" contain height="50"/>
      </div>
    <nav>
        <div class="d-flex justify-center my-3">
        <router-link to="/wishlist" class="nav-link mx-6"><v-btn append-icon="mdi" class="navbtn mx-6" text>Wishlist</v-btn></router-link>
        <router-link to="/wishadd" class="nav-link mx-6"><v-btn append-icon="mdi" class="navbtn mx-6" text>Add</v-btn></router-link>
        <div class="navbtn mx-6" @click="logout"><v-btn append-icon="mdi" class="navbtn mx-6" text>Logout</v-btn></div>
      </div>
    </nav>
    <hr>
    <header class="header">What products would you want us to make?</header>
    <form class="wishadd" @submit.prevent="addWish"> 
        <input type="text" name="name" placeholder="Product name" v-model="wishitem.name" required>
        <input type="number" name="price" placeholder="Desired price ($)" v-model="wishitem.price">
        <button type="submit" >Add</button>
    </form>
</div>
</template>
<script>
import axios from 'axios'
export default {
    
    data()
    {
        return {
            wishitem :{
                name:'',
                price:'',
            }
        }
    },
    methods: {
        logout() {
      localStorage.clear();
      this.$router.push({ name: "Home" });
    },
        async addWish()
        {
            console.warn(this.wishitem)
            const result = await axios.post("http://localhost:3000/wishitem", {
                name:this.wishitem.name,
                price:this.wishitem.price,

            });
            if(result.status == 201)
            {
                this.$router.push({name:'Wishlist'});
            }
            console.warn("result", result)
        }
    },
}

</script>

<style scoped>
.navbtn {
    cursor: pointer;
    padding: 0 ;
    box-shadow: none !important;

  }
  
*
{
text-decoration: none;
color: black;
}

.wishadd input {
    width: 30%;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        display: block;
        border-bottom: 1px solid black;
        padding-left: 6px;
        padding-bottom: 6px;
     }

.wishadd button {
    width: 30%;
        padding: 10px;
        color:white;
        background-color: #000;
        cursor: pointer;
        margin-top: 30px;
        display: block;
        margin-left: auto;
        margin-right: auto;
     }
     .header {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        margin-top: 5%;
        letter-spacing: 1px;
    }
</style>