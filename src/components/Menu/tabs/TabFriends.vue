<template>
  <div class="tab-friends">
    <TabFriendElement :form="true" :friend="me" />
    <hr>
    <TabFriendElement v-for="friend in friends" :key="friend.code" :friend="friend" />
  </div>
</template>

<script>
import * as friendUtils from '@/utils/_friend';
import { mapGetters }   from 'vuex';
import AppSkinsMixins   from '../../Mixins/AppSkinsMixins';
import TabFriendElement from './Elements/TabFriendElement';

export default {
  name:       'TabFriends',
  components: { TabFriendElement },
  mixins:     [ AppSkinsMixins ],
  mounted() {
    this.$store.commit( 'friend/addFriends', friendUtils.make( 'Power', 'BB-7894' ) );
    this.$store.commit( 'friend/addFriends', friendUtils.make( 'Ranger', 'CC-4561' ) );
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