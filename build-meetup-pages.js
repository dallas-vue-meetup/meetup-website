const fs = require("fs-extra");
const axios = require("axios");

// TODO: tw - load from json file
const meetups = [
  {
    id: "259967574"
  },
  {
    id: "257968050"
  },
  {
    id: "256725358"
  },
  {
    id: "254152490"
  },
  {
    id: "252160586"
  }
];

loadAndCreateMarkdown();

async function loadAndCreateMarkdown() {
  try {
    const meetupData = await loadDataFromMeetup();
    writeFiles(meetupData);
  } catch (e) {
    console.error(e);
  }
}

async function loadDataFromMeetup() {
  return Promise.all(
    meetups.map(async meetup => {
      const meta = await axios.get(
        `http://api.meetup.com/dallas-vue-meetup/events/${meetup.id}`
      );

      return {
        ...meetup,
        ...meta.data
      };
    })
  );
}

function writeFiles(meetups) {
  meetups
    .sort((a, b) => {
      new Date(b.local_date) - new Date(a.local_date);
    })
    .forEach((meetup, index) => {
      fs.writeFile(
        `docs/meetups/meetup-${index}.md`,
        createMarkdown(meetup),
        "utf-8"
      );
    });
}

function createMarkdown(meetup) {
  return `---
title: "${meetup.name}"
date: ${meetup.local_date}
---

# ${meetup.name}

[View on Meetup](https://www.meetup.com/Dallas-Vue-Meetup/events/${meetup.id})

### Description

${meetup.description}
  `;
}
