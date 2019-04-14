<template>
  <span class="icon">
    <svg viewBox="0 0 24 24">
      <path :d="path" />
    </svg>
  </span>
</template>

<script>
import { iconPaths } from './icon-paths';

export default {
  name: 'VIcon',
  props: ['icon'],
  computed: {
    path() {
      return iconPaths[this.icon];
    }
  }
}
</script>

<style scoped lang="stylus">
.icon {
  position: relative;
  padding: 0 0.9rem;
}

svg {
  position: absolute;
  left: 0;
  top: -0.25rem;
  height: 1.5rem;
}

path {
  fill: $textColor;
}
</style>
