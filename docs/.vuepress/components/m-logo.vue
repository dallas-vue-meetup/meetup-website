<template>
  <div>
    <object id="logo" :data="$withBase('/logo.svg')" type="image/svg+xml" :height="height" :width="width"/>
  </div>
</template>

<script>
const MLogo = {
  props: {
    height: Number,
    width: Number,
  }
}

export default MLogo;
</script>

