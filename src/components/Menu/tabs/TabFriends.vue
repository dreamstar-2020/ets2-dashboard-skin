<template>
  <div class="tab-friends">
    <TabFriendElement :form="true" :friend="me" />
    <hr>
    <TabFriendElement v-for="friend in friends" :key="friend.code" :friend="friend" />
  </div>
</template>

<script>
import { mapGetters }   from 'vuex';
import AppSkinsMixins   from '../../Mixins/AppSkinsMixins';
import TabFriendElement from './Elements/TabFriendElement';

export default {
  name:       'TabFriends',
  components: { TabFriendElement },
  mixins:     [ AppSkinsMixins ],
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