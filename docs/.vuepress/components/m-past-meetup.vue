<template>
  <div class="card">
    <h3>{{title}}</h3>
    <a :href="`https://www.meetup.com/Dallas-Vue-Meetup/events/${id}`">Meetup Page</a>
    <ul>
      <li v-for="talk in talks" :key="talk.title">
        {{talk.title}} - {{talk.speaker}}
      </li>
    </ul>
  </div>
</template>

<script>
const MPastMeetup = {
  props: {
    title: String,
    talks: Array, // Array of objects with the title and speaker
    image: String,
    id: String,
    date: Date,
  }
}

export default MPastMeetup;
</script>


<style scoped>
.card {
  border: 1px solid border-color;
}
</style>

