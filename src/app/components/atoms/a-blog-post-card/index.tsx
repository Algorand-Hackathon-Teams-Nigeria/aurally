import { BlogPost } from "@/app/constants/links/blogPosts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  post: BlogPost;
}

const BlogPostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center">
      <div>
        <Image
          className="rounded-2xl h-[400px] w-[700px]"
          src={post.img}
          alt={post.title}
          width={385}
          height={385}
        />
      </div>
      <div className="flex  justify-center gap-6 w-full sm:pl-14 py-10 sm:p-10 flex-col">
        <h4 className="font-bold text-4xl line-clamp-2">{post.title}</h4>
        <p className="line-clamp-3">{post.desc}</p>
        <Link
          className="bg-primary p-2 px-3 rounded-md w-fit font-medium hover:bg-primary/70 transition-all"
          href={post.link}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
