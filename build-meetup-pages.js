const fs = require("fs-extra");
const axios = require("axios");
const { addDays, format } = require("date-fns");

// TODO: tw - load from json file
const meetups = [
  {
    id: "259967574",
    tags: ["purescript", "JSX", "css-variables"],
    video: "https://youtu.be/tJxKmqEmz08",
    talks: [
      {
        author: "Sebastian Klingler",
        name: "Purescript and Vue",
        repo: "https://github.com/sliptype/vue-pure",
        video: "https://youtu.be/tJxKmqEmz08"
      },
      {
        author: "Travis Almand",
        name: "CSS Variables and Vue"
      },
      {
        author: "Tim Waite",
        name: "Templateless Vue",
        repo: "https://github.com/dallas-vue-meetup/templateless-vue"
      }
    ]
  },
  {
    id: "257968050",
    talks: []
  },
  {
    id: "256725358",
    talks: []
  },
  {
    id: "254152490",
    talks: []
  },
  {
    id: "252160586",
    talks: []
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
        ...meta.data,
        date: adjustMeetupDate(meta.data.local_date)
      };
    })
  );
}

function writeFiles(meetups) {
  meetups
    .sort((a, b) => {
      b.date - a.date;
    })
    .reverse()
    .forEach((meetup, index) => {
      fs.writeFile(
        `docs/meetups/meetup-${index + 1}.md`,
        createMarkdown(meetup),
        "utf-8"
      );
    });
}

function adjustMeetupDate(string) {
  const [year, month, day] = string.split("-");
  return new Date(`${month}-${day}-${year}`);
}

function createMarkdown(meetup) {
  return `---
title: "${meetup.name}"
date: ${format(meetup.date, "MM/DD/YY")}
tags:
${meetup.tags ? meetup.tags.map(tag => `  - ${tag}\n`).join("") : ""}
upcoming: ${meetup.status === "upcoming"}
---

# ${meetup.name}
#### ${format(meetup.date, "MMM Do, YYYY")}
<div style="margin: 1rem 0;">
${meetup.tags ? meetup.tags.map(tag => `<m-tag>${tag}</m-tag>\n`).join("") : ""}
</div>

<div style="margin: 0.5rem 0"><m-icon icon="meetup" /> <a href="https://www.meetup.com/Dallas-Vue-Meetup/events/${
    meetup.id
  }">View on Meetup</a></div>

${
  meetup.video
    ? `<div style="margin: 0.5rem 0"><m-icon icon="youtube" /> <a href="${
        meetup.video
      }">Watch on Youtube</a></div>`
    : ""
}

<br />

### Talks

${meetup.talks
  .map(talk => {
    return `- <strong>${talk.name}</strong> - ${talk.author} 
  ${
    talk.repo
      ? `  - <m-icon icon="github" /> <a href="${
          talk.repo
        }" target="_">View on Github</a>`
      : ""
  }
  ${
    talk.video
      ? `  - <m-icon icon="youtube" /> <a href="${
          talk.video
        }" target="_">Watch on YouTube</a>`
      : ""
  }
`;
  })
  .join("")}

### Description

${meetup.description}
  `;
}
