<template>
    <Header />
    <v-container fluid>
      <div class="about text-center">
        <v-img 
          :src="require('../assets/about.png')" 
          contain 
          height="300" 
          class="companyImg"
        />
        <p class="desc">
          Welcome to SWIN store, our company is based in Australia and founded in 2024.<br>
          We offer various cute items such as plushies, stickers, keychains, figures, etc. from well-known brands and franchises.
        </p>
        <div class="socials">
          <v-btn icon class="icon">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon class="icon">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon class="icon">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  
  export default {
    components: {
      Header
    }
  };
  </script>
  
  <style scoped>
  *
  {
    padding: 0;
    margin: 0;
  }
  .v-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
  }
  .about {
    margin-top: 5%;
  }
  .companyImg {
    margin: auto;
  }
  .desc {
    margin-top: 20px;
    font-size: 14px;
    color: #636363;
    max-width: 800px;
    line-height: 1.5;
    margin-bottom: 50px;
  }
  .socials {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .icon {
    margin: 0 15px;
    background-color: transparent;

    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
  }
 
  .socials :hover{
    opacity: 0.8;
    transform: scale(1.1);
  }
  </style>
  