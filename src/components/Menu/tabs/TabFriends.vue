<template>
  <div class="tab-friends">
    <input type="text" v-model="myName">
    <!--    <h2>A: {{ fSocket }}</h2>-->
    <!--    <button @click="friendInit">Connect</button>-->
    <button @click="register(myName)">Register</button>
    <div v-if="connected">
      <TabFriendElement :form="true" :friend="me" />
      <hr>
      <TabFriendElement v-for="friend in friends" :key="friend.code" :friend="friend" />
    </div>
    <div v-else>Not connected</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TabFriendElement           from './Elements/TabFriendElement';

export default {
  name:       'TabFriends',
  components: { TabFriendElement },
  data() {
    return {
      myName: 'Hellow'
    };
  },
  methods:  {
    ...mapActions( {
      register: 'friend/register'
    } )
  },
  computed: {
    ...mapGetters( {
      me:        'friend/me',
      friends:   'friend/friends',
      connected: 'friend/connected'
    } )
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/menu/_tab-friends/tab-friends";
</style>