import Landing from "@page-sections/landing";
import BallGradient from "@components/BallGradient";
import BlogPostCard from "@atoms/a-blog-post-card";
import BLOG_POSTS from "@constants/links/blogPosts";
import Image from "next/image";
import Link from "next/link";

const COMMUNITY = [
  {
    title: "For Creatives",
    img: "/images/man_learning.svg",
    href: "#",
  },
  {
    title: "For Fans",
    img: "/images/man_learning.svg",
    href: "#",
  },
];

const Blog = () => {
  return (
    <section
      id="blog"
      className="relative flex flex-col gap-8 lg:gap-16 xl:flex-row"
    >
      <BallGradient topOrBottom="-top-20" leftOrRight="left-0" />
      <BallGradient topOrBottom="-bottom-60" leftOrRight="right-0" />
      <div className="flex-1">
        <h3 className="bg-gradient-to-b from-secondaryPink to-secondaryYellow text-transparent bg-clip-text text-5xl lg:text-6xl font-bold">
          Blog Post
        </h3>
        <ul className="flex flex-col gap-16 mt-16">
          {BLOG_POSTS.map((post) => (
            <BlogPostCard
              key={post.link}
              post={post}
            />
          ))}
        </ul>
      </div>
      <div className="flex-[0.4] hidden xl:flex flex-col gap-12">
        <Landing.AppStatistics mini />
        <ul className="flex flex-col gap-8">
          {COMMUNITY.map((item) => (
            <li
              key={item.title}
              className="relative flex flex-col items-center gap-3 bg-primary rounded-3xl p-12"
            >
              <h4 className="font-bold text-3xl">{item.title}</h4>
              <img
                loading="lazy"
                src={item.img}
                alt={item.title}
                width={215}
                height={188}
              />
              <Link
                className="bg-gradient-to-b font-medium from-secondaryPink to-secondaryYellow p-2 px-3 rounded-md shadow absolute bottom-4"
                href={item.href}
              >
                Discover
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blog;
