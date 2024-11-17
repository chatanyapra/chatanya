import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BlogCard from "../components/BlogCard";
import { useDataContext } from "../context/DataContext";
import backgroundLine from "../assets/images/background-line.png";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const BlogPage = () => {
  const { blogs } = useDataContext();
  const { id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [projectLongDescription, setProjectLongDescription] = useState("");

  useEffect(() => {
    setProjectName("");
    setProjectLongDescription("");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchByProjectId = async () => {
      try {
        const response = await fetch(`/api/portfolio/blogs/${id}`);
        const result = await response.json();
        if (result.success) {
          setProjectName(result.data.title || "");
          setProjectLongDescription(result.data.longDescription || "");
        } else {
          console.error("Failed to load project data.");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    if (id) fetchByProjectId();
  }, [id]);

  // GSAP animation for blog cards
  useEffect(() => {
    const cards = gsap.utils.toArray(".blogCard");

    const animations = cards.map((card, index) =>
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8,
          x: index % 2 === 0 ? -200 : 200,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 1.5,
          delay: 3.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            scrub: false,
            once: true,
          },
        }
      )
    );

    return () => {
      animations.forEach((animation) => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      });
    };
  }, [blogs]);

  return (
    <div className="z-10 h-full min-h-screen mb-20 w-full relative dark:text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12 mt-10"
      style={{ maxWidth: "1600px" }}>
        {projectLongDescription && (
          <div className="w-[95%] min-h-96 transparent-color rounded-[50px] flex max-md:flex-col justify-between p-10 my-10 light-dark-shadow">
            <div>
              <h1 className="text-4xl pb-10 text-white dark:text-black">{projectName}</h1>
              <p className="text-gray-400 dark:text-gray-700" dangerouslySetInnerHTML={{ __html: projectLongDescription }}></p>
            </div>
          </div>
        )}

      <div className='w-full mx-auto flex flex-col relative blogsection-bg-design mt-10'>
        <img src={backgroundLine} className='w-full h-full absolute -left-2 -right-14' loading="lazy" alt="" />
        <div className='transparent-color light-dark-shadow px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex ml-6'>
          <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
            <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
          </div>
          <i>Blogs</i>
        </div>
        <div className='flex w-full justify-around max-lg:flex-col md:flex-wrap max-md:px-1'>
          {blogs.slice(0, 4).map((blog) => (
            <div key={blog._id} className='blogCard'>
              <BlogCard blog={blog} src={"blogs"} />
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BlogPage;
