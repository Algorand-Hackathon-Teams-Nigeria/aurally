import Landing from "@page-sections/landing";
import BallGradient from "@components/BallGradient";
import BlogPostCard from "@atoms/a-blog-post-card";
import BLOG_POSTS from "@constants/links/blogPosts";
import Image from "next/image";
import Link from "next/link";

const COMMUNITY = [
  {
    title: "More For Fans",
    img: "/Group 1000002693.png",
    href: "https://aurally.medium.com",
  },
  {
    title: "More For Fans",
    img: "/images/guy with guitar.svg",
    href: "https://aurally.medium.com",
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
            <BlogPostCard key={post.link} post={post} />
          ))}
        </ul>
      </div>
      <div className="flex-[0.4] hidden xl:flex flex-col gap-12">
        <Landing.AppStatistics mini />
        <ul className="flex flex-col gap-8">
          {COMMUNITY.map((item) => (
            <li
              key={item.title}
              className="relative flex flex-col items-center gap-3 bg-[#140425] text-[#C6C6C6] rounded-3xl p-12"
            >
              <h4 className="font-bold text-2xl">{item.title}</h4>
              <Image src={item.img} alt={item.title} width={215} height={188} />
              <button className="mt-6 flex items-center justify-center bg-[#8a2be2] rounded-full px-5 py-3 cursor-pointer transition-transform duration-300 hover:scale-105">
            <Image
              src="/Frame_btn.png"
              alt="Launch App Button"
              width={3000}   
              height={100}  
              className="w-full h-full"
            />
          </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blog;
