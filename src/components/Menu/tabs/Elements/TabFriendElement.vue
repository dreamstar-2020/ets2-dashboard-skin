<template>
  <div class="friend">
    <div class="card text-white mb-3">
      <div class="card-body">
        <h5 class="card-title mb-0 d-flex justify-content-sm-start align-items-center">
          <small class="code">#{{ friend.code }}</small>
          <small class="mx-1 status"></small>
          {{ friend.name }}
        </h5>
      </div>
      <div class="card-footer d-flex justify-content-center align-items-center form" v-if="form">
        <label for="friend">Add a friend</label>
        <input type="text" class="input" id="friend" placeholder="#AA-7894">
      </div>
      <!--      <div class="card-footer d-flex justify-content-center align-items-center" v-else>-->
      <!--        <a class="btn btn-sm btn-success">Add</a>-->
      <!--      </div>-->
    </div>

    <!--    <h2 class="name">-->
    <!--      <span class="code">#{{ friend.code }}</span>-->
    <!--      <span class="status"></span>-->
    <!--      <span>{{ friend.name }}</span>-->
    <!--    </h2>-->
    <!--    <div class="form" v-if="form">-->
    <!--      <label for="friend">Add a friend</label>-->
    <!--      <input type="text" class="input" id="friend" placeholder="#AA-7894">-->
    <!--    </div>-->
    <!--    <div class="form" v-else>-->
    <!--      <a class="btn btn-sm btn-success">Add</a>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  name:  'TabFriendElement',
  props: [ 'form', 'friend' ]
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/menu/_tab-friends/element";
</style>