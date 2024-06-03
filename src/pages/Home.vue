<template>
  <Header />
  <v-container fluid class="banners">
    <div class="banner">
    <router-link :to="{ name: 'Product', query: { filter: 'Chiikawa' }}"><v-img :src="require('../assets/bannerchi.jpg')"/></router-link>
  </div>
    <div class="banner">
    <router-link :to="{ name: 'Product', query: { filter: 'The Battle Cats' }}"><v-img :src="require('../assets/bannerbtc.png')"/></router-link>
  </div>
    <div class="banner">
    <router-link :to="{ name: 'Product', query: { filter: 'Nagano' }}"><v-img :src="require('../assets/bannerjb.jpg')"/></router-link>
  </div>
    <div class="banner">
    <router-link :to="{ name: 'Product', query: { filter: 'Karameru' }}"> <v-img :src="require('../assets/bannerkar.jpg')"/></router-link>
  </div>
    <div class="banner">
    <router-link :to="{ name: 'Product', query: { filter: 'Taiko' }}">  <v-img :src="require('../assets/bannertaiko.jpg')"/></router-link>
    </div>
  </v-container>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  components: {
    Header
  },
};
</script>

<style scoped>
*
{
  padding: 0;
  margin: 0;
}
.banners
{
  margin-top: 3%;
}
.banner{
  filter: saturate(0%);
}
.banner:hover
{
  filter: saturate(100%);

transform: scale(1.1);
}
</style>
