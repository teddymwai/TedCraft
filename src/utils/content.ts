import { getCollection } from 'astro:content';

/**
 * Centralized publication-filtered collection queries.
 * Ensures draft entries are consistently excluded across pages, RSS, and related views.
 */

export async function getPublishedWorks() {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return works.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getFeaturedWorks(limit = 3) {
  const works = await getPublishedWorks();
  return works
    .filter((w) => w.data.featured)
    .sort(
      (a, b) =>
        (a.data.featuredOrder ?? 99) - (b.data.featuredOrder ?? 99) ||
        b.data.date.getTime() - a.data.date.getTime()
    )
    .slice(0, limit);
}

export async function getPublishedLearnings() {
  const learnings = await getCollection('learnings', ({ data }) => !data.draft);
  return learnings.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
