<template>
  <div>
    <h1>{{$frontmatter.name}}</h1>
    <h5>{{$frontmatter.prettyDate}}</h5>
		<div class="tags" v-if="$frontmatter.tags">
			<m-tag v-for="tag in $frontmatter.tags" :key="tag">{{tag}}</m-tag>
		</div>
		<div class="links">
			<a
				:href="$frontmatter.meetupUrl">
				<m-icon icon="meetup" />
				View on Meetup
			</a>
			<a
				v-if="$frontmatter.video"
				:href="$frontmatter.video">
				<m-icon icon="youtube" />
				View on YouTube
			</a>
		</div>

    <h3>Talks</h3>

    <ul v-for="talk in $frontmatter.talks">
      <li><strong>{{talk.name}}</strong> - {{talk.author}}</li>
      <ul class="talk-details">
        <li v-if="talk.video">
          <a
            :href="talk.video">
            <m-icon icon="youtube" />
            View on YouTube
          </a>
        </li>
        <li v-if="talk.repo">
          <a
            :href="talk.repo">
            <m-icon icon="github" />
            View on Github
          </a>
        </li>
        <li v-if="talk.blog">
          <a
            :href="talk.blog">
            <m-icon icon="newspaper" />
            View Article
          </a>
        </li>
        <li v-if="talk.slides">
          <a
            :href="talk.slides">
            <m-icon icon="slideshow" />
            View Slides
          </a>
        </li>
      </ul>
    </ul>

    <h3>Description</h3>

  </div>
</template>

<style scoped>
.links a:not(:first-child) {
	padding-left: 1rem;
}

.tags {
  margin-bottom: 1rem;
}

.talk-details {
  list-style: none;
}
</style>
