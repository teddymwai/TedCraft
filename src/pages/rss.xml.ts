import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const learnings = await getCollection('learnings');
  const works = await getCollection('works');

  const postItems = posts.map((post) => ({
    title: `[Article] ${post.data.title}`,
    pubDate: post.data.pubDate,
    description: post.data.description,
    link: `/blog/${post.id}/`,
    categories: post.data.tags,
  }));

  const learningItems = learnings.map((item) => ({
    title: `[Learning Curve] ${item.data.title}`,
    pubDate: item.data.date,
    description: `${item.data.subtitle} - Obstacle: ${item.data.obstacle} | Breakthrough: ${item.data.breakthrough}`,
    link: `/learning-curves/${item.id}/`,
    categories: item.data.tags,
  }));

  const workItems = works.map((work) => ({
    title: `[Work] ${work.data.title}`,
    pubDate: work.data.date,
    description: `${work.data.tagline}: ${work.data.description}`,
    link: `/works/${work.id}/`,
    categories: work.data.tags,
  }));

  const allItems = [...postItems, ...learningItems, ...workItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: "Ted's Developer Showcase & Learning Curves",
    description: "Field notes on resilient systems, continuous engineering learnings, and shipped tools.",
    site: context.site || 'https://ted.github.io',
    items: allItems,
    customData: `<language>en-us</language>`,
  });
}
