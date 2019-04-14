const fs = require("fs-extra");
const axios = require("axios");
const { addDays, format } = require("date-fns");
const YAML = require("json-to-pretty-yaml");

// TODO: tw - load from json file
const meetups = [
  {
    id: "259967574",
    tags: ["PureScript", "JSX", "CSS Variables", "Render Functions"],
    video: "https://youtu.be/tJxKmqEmz08",
    talks: [
      {
        author: "Sebastian Klingler",
        name: "Purescript and Vue",
        repo: "https://github.com/sliptype/vue-pure",
        video: "https://youtu.be/tJxKmqEmz08",
        blog: "https://sliptype.github.io/functional-front-end/"
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
    tags: ["Nuxt", "Transitions", "Animations", "SSR"],
    video: "https://youtu.be/5mWssPKY-VQ?t=2649",
    talks: [
      {
        author: "Doug Lasater",
        name: "Intro to Nuxt",
        video: "https://youtu.be/5mWssPKY-VQ?t=2826",
        repo: "https://github.com/dallas-vue-meetup/meetup-4-nuxt",
        slides:
          "https://www.dropbox.com/s/ntedjolj9anfj07/Feb-2019--intro-to-nuxt.pdf?dl=0"
      },
      {
        author: "Travis Almand",
        name: "Transitions in Vue",
        video: "https://youtu.be/5mWssPKY-VQ?t=5538",
        repo:
          "https://github.com/dallas-vue-meetup/meetup-4-demo-transitions<Paste>"
      }
    ]
  },
  {
    id: "256725358",
    tags: ["Slots", "Workshop"],
    talks: [
      {
        author: "Tim Waite",
        name: "Slots Workshop",
        repo: "https://github.com/dallas-vue-meetup/meetup-3-slots-workshop"
      }
    ]
  },
  {
    id: "254152490",
    tags: ["Electron", "Vuex", "State Management"],
    talks: [
      {
        author: "Joseph Campuzano",
        name: "A High Level Intro to Vuex",
        video: "https://www.youtube.com/watch?v=OHlfrVeRIdI"
      },
      {
        author: "Cameron Adams",
        name: "Building Electron Apps using Vue",
        video: "https://www.youtube.com/watch?v=OmAOORk5fGI"
      }
    ]
  },
  {
    id: "252160586",
    tags: ["Directives", "Upgrading"],
    talks: [
      {
        author: "Joseph Campuzano",
        name: "Adding Vue to an Existing Project",
        video: "https://www.youtube.com/watch?v=T3nlYgnxRNo",
        repo: "https://github.com/dallas-vue-meetup/meetup-1-migrating-to-vue"
      },
      {
        author: "Tim Waite",
        name: "Directives Deep Dive",
        video: "https://www.youtube.com/watch?v=zzN6s8i5zFI",
        repo:
          "https://github.com/dallas-vue-meetup/meetup-1-directives-deep-dive"
      }
    ]
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
        createMarkdown(meetup, index),
        "utf-8"
      );
    });
}

function adjustMeetupDate(string) {
  const [year, month, day] = string.split("-");
  return new Date(`${month}-${day}-${year}`);
}

function createMarkdown(meetup, index) {
  const frontmatter = {
    name: meetup.name,
    talks: meetup.talks,
    order: index + 1,
    video: meetup.video,
    id: meetup.id,
    meetupUrl: meetup.link,
    date: format(meetup.date, "MM/DD/YY"),
    prettyDate: format(meetup.date, "MMM Do, YYYY"),
    tags: meetup.tags,
    upcoming: meetup.status === 'upcoming',
  };

  return `---\n${YAML.stringify(frontmatter)}---\n <m-meetup-details />${
    meetup.description
  }`;
}
