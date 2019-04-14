<template>
  <div>
    <m-meetup-lite
      v-for="meetup in meetups"
      :key="meetup.id"
      :id="meetup.id"
      :order="meetup.order"
      :title="meetup.name"
      :talks="meetup.talks"
      :date="meetup.date"/>
  </div>
</template>

<script>
const MPastMeetups = {
  props: {
    upcoming: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    meetups() {
      return this.$site.pages
        .filter(p => p.regularPath.includes('meetup'))
        .map(p => p.frontmatter)
        .filter(m => this.upcoming ? m.upcoming : !m.upcoming)
        .sort((a, b) => a.order - b.order);
    }
  }
}

export default MPastMeetups;
</script>
