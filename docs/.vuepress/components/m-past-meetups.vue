<template>
  <div>
    <m-past-meetup
      v-for="meetup in meetups"
      :key="meetup.id"
      :id="meetup.id"
      :title="meetup.title"
      :talks="meetup.talks"
      :date="meetup.date"/>
  </div>
</template>

<script>
const MPastMeetups = {
  data() {
    const meetups = [{
      id: '252160586',
      title: 'First Meetup',
      date: new Date('07/24/18'),
      talks: [{
        title: 'Adding Vue to and Existing Project',
        speaker: 'Joseph Campuzano',
      }, {
        title: 'Deep Dive into Vue Directives',
        speaker: 'Tim Waite',
      }]
    }, {
      id: '254152490',
      title: 'Meetup 2: Intro to Vuex and Building Apps in Electron',
      date: new Date('09/18/18'),
      talks: [{
        title: 'Intro to Vuex',
        speaker: 'Joseph Campuzano',
      }, {
        title: 'Building Electron Apps with Vue',
        speaker: 'Cameron Adams',
      }]
    }, {
      id: '256725358',
      title: 'Meetup 3: Slots Workshop and Vue Conf TO Recap',
      date: new Date('12/11/18'),
      talks: [{
        title: 'VueConf Recap',
        speaker: 'Joseph Campuzano',
      }, {
        title: 'Slots Workshop',
        speaker: 'Tim Waite',
      }]
    }, {
      id: '257968050',
      title: 'VueJS Meetup 4',
      date: new Date('2/19/19'),
      talks: [{
        title: 'Intro to Nuxt',
        speaker: 'Doug Lasater',
      }, {
        title: 'Vue\'s Transition Component',
        speaker: 'Travis Almand',
      }]
    }];

    return {
      meetups: meetups.sort((a, b) => b.date.getTime() - a.date.getTime()),
    };
  },
  mounted() {
    // TODO: tw - call to meetup here
  }
}

export default MPastMeetups;
</script>
