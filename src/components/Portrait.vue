<template>
  <div class="col-xl-3 col-md-6 mb-3">
    <div class="card border-0 shadow">
      <img :src="require(`../assets/portraits/${source}`)" class="card-img-top" id ="card-image" alt="..." />
      <div class="card-body text-center">
        <h5 class="card-title mb-0">{{person}}</h5>
        <div class="card-text text-black-50">{{title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Portrait",
  props: ["source", "person", "title"]
};
</script>

<style lang="scss">
#card-image{
  height: 250px;
  object-fit: cover;
  object-position: 0 0;
}
</style>