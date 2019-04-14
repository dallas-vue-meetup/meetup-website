<template>
  <div class="card">
    <h3>{{title}}</h3>
    <ul>
      <li v-for="talk in talks" :key="talk.title">
        <strong>{{talk.name}}</strong> - {{talk.author}}
      </li>
    </ul>
    <a :href="`../meetups/meetup-${order}`">View Details</a>
  </div>
</template>

<script>
const MPastMeetup = {
  props: {
    title: String,
    talks: Array, // Array of objects with the title and speaker
    image: String,
    id: String,
    date: String,
    order: Number,
  }
}

export default MPastMeetup;
</script>


<style scoped>
.card {
  border: 1px solid border-color;
}
</style>

