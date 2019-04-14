<template>
  <span class="tag">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'v-tag',
}
</script>

<style lang="stylus">
  .tag {
    color: white;
    font-weight: bold;
    background: $accentColor;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    margin-right: 0.5rem;
  }
</style>
