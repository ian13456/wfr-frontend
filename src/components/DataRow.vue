<template>
  <div class="row panel">
    <div class="col-12 col-md-4">
      <p>{{ person }}</p>
    </div>
    <div class="col-12 col-md-4">
      <p>{{ pledgeSingle }}</p>
    </div>
    <div class="col-12 col-md-4">
      <p>{{ pledgePerLap }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataRow',
  props: ['person', 'pledgeSingle', 'pledgePerLap']
}
</script>
>
