<template>
    <Header/>
    <header class="header">Create account</header>
    <div class="register">
        <input type="text" v-model="user" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button v-on:click="signUp">Sign Up</button>
        <p>
            <router-link class="returnbtn" to="/home">Return to store</router-link>
        </p>
    </div>
</template>






 
 <script>
 import Header from '../components/Header.vue';
 import axios from 'axios'
 export default {
    components: {
      Header
    },
    data()
    {
        return {
            user:'',
            password:''

        }
    },
    methods: {
        async signUp() {
            if (this.user && this.password) {
                try {
                    let result = await axios.post("http://localhost:3000/users", {
                        user: this.user,
                        password: this.password
                    });
                    console.warn(result);

                    console.log('Account created.');
                    alert('Account created.');
                    this.$router.push({ name: 'Home' });
                } catch (error) {
                    console.error('Failed to create account', error);
                    alert('Failed to create account.');
                }
            } else {
                alert('Please enter username and password.');
            }
        }
    },
    mounted()
    {
        let user = localStorage.getItem('user-info');
        if(user)
        {
            this.$router.push({name:'Home'})
        }
    }
 }

 </script>

 <style scoped>
  .header {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        margin-top: 5%;
        letter-spacing: 1px;
    }
     .register input {
        width: 30%;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        display: block;
        border-bottom: 1px solid black;
        padding-left: 6px;
        padding-bottom: 6px;
     }
     .register button {
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
     .register p {
        margin-top: 30px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        margin-top: 20px;
     }
     .returnbtn
     {
        margin-bottom: 60%;
        color: #000;
        text-align: center;
        font-size: 15px;
        text-decoration: none;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
     }

 </style>