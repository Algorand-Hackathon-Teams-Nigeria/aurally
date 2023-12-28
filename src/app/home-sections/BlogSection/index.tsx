import EventsCarousel from "./BlogCarousel";

const BlogSction = () => {
  return (
    <div>
      <div className="flex justify-between items-center  mt-14">
        <div className="text-3xl md:text-4xl font-bold mb-6">Blog</div>
        <div id="blog-carousel" className="flex gap-5 sm:gap-6"></div>
      </div>
      <EventsCarousel />
    </div>
  );
};

export default BlogSction;
