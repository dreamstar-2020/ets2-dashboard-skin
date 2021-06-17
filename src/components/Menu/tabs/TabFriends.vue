<template>
  <div class="tab-friends">
    <input type="text" :value="myName">
    <button @click="friendInit">Connect</button>
    <button @click="registerMeFriend(myName)">Register</button>
    <div v-if="friendConnected">
      <TabFriendElement :form="true" :friend="me" />
      <hr>
      <TabFriendElement v-for="friend in friends" :key="friend.code" :friend="friend" />
    </div>
    <div v-else>Not connected</div>
  </div>
</template>

<script>
import { mapGetters }   from 'vuex';
import TabFriendElement from './Elements/TabFriendElement';

export default {
  name:       'TabFriends',
  components: { TabFriendElement },
  data() {
    return {
      myName: 'Hellow'
    };
  },
  computed: {
    ...mapGetters( {
      me:      'friend/me',
      friends: 'friend/friends'
    } )
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/menu/_tab-friends/tab-friends";
</style>