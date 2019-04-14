module.exports = {
  title: "Dallas Vue Meetup",
  description: "A single place to manage all Dallas Vue Meetup Resources",
  themeConfig: {
    nav: [
      { text: "Past Talks", link: "/past-talks/" },
      { text: "Code of Conduct", link: "/code-of-conduct/" }
    ]
  },
  plugins: {
    "@vuepress/blog": {
      postsDir: "meetups",
      permalink: "meetup/:slug"
    }
  }
};
