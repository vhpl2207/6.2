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
    <header class="header">Your wishlist</header>
    <table class="wishtb">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product name</th>
          <th>Desired price ($)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginate" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button @click="openUpdate(item)">Update</button>
            <br>
            <button @click="deleteWish(item.id)" class="btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <v-dialog v-model="showUpdate" max-width="400px">
      <v-card>
        <v-card-title>Update Wish</v-card-title>
        <v-btn icon @click="showUpdate = false" class="closebtn">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-text>
          <form class="wishupd" @submit.prevent="updateWish">
            <input type="text" name="name" placeholder="Product name" v-model="selectedWish.name" required>
            <input type="number" name="price" placeholder="Desired price ($)" v-model="selectedWish.price">
            <button type="submit">Update Wish</button>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <nav>
      <v-pagination v-model="page" :length="totalPages" @input="loadData" color="dark"></v-pagination>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      wishitem: [],
      showUpdate: false,
      selectedWish: null,
      page: 1,
      perPage: 5,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.wishitem.length / this.perPage);
    },
    paginate() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.wishitem.slice(start, end);
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Home" });
    },
    async deleteWish(id) {
      let result = await axios.delete("http://localhost:3000/wishitem/" + id);
      if (result.status == 200) {
        this.loadData();
      }
    },
    async loadData() {
      let result = await axios.get("http://localhost:3000/wishitem");
      this.wishitem = result.data;
    },
    openUpdate(item) {
      this.selectedWish = { ...item };
      this.showUpdate = true;
    },
    async updateWish() {
      try {
        const result = await axios.put(`http://localhost:3000/wishitem/${this.selectedWish.id}`, {
          name: this.selectedWish.name,
          price: this.selectedWish.price,
        });
        if (result.status === 200) {
          this.showUpdate = false;
          this.loadData();
        }
      } catch (error) {
        console.error("There was an error updating the wishlist item:", error);
      }
    }
  },
  async mounted() {
    this.loadData();
  }
}
</script>

<style scoped>
.navbtn {
  cursor: pointer;
  padding: 0 ;
  box-shadow: none !important;
}

a {
  color: black !important;
  text-decoration: none;
}

.v-card .v-card-title {
  margin-left: 4%;
  margin-top: 10px;
  margin-bottom: -70px;
}

.wishupd input {
  width: 70%;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  border-bottom: 1px solid black;
  padding-left: 6px;
  padding-bottom: 6px;
}

.wishupd button {
  width: 70%;
  padding: 10px;
  color:white;
  background-color: #000;
  cursor: pointer;
  margin-top: 40px;
  margin-bottom: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.wishtb {
  margin-top: 2%;
  width: 70%;
  text-align: center;
  border: 1px solid black;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  height: 20%;
}

.wishtb th,
.wishtb td {
  width: 25%;
  border: 1px solid black;
  padding: 1%
}

.btn {
  margin-top: 5%;
}

* {
  text-decoration: none;
  color: black;
}

.header {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-top: 5%;
  letter-spacing: 1px;
}

.closebtn {
  background-color: transparent !important;
  box-shadow: none !important;
  margin-left: 85%;
  margin-top: 5%;
}
nav > .v-pagination {
  margin: 50px;
}

</style>
