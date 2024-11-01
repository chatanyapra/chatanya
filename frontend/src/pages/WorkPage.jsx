import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideImage from "../components/SlideImage";
import "./WorkPage.css";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import { useDataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";
import IconsImage from "../components/IconsImage";

gsap.registerPlugin(ScrollTrigger);

const WorkPage = () => {
  const { id } = useParams(null);
  // const techIconsRef = useRef([]); 
  const slideImageRef = useRef(null);
  const projectCardRefs = useRef([]);

  const [projectName, setProjectName] = useState("");
  const [projectLongDescription, setProjectLongDescription] = useState("");
  const [techStacks, setTechStacks] = useState([]);
  // const [projectImages, setProjectImages] = useState([""]);

  useEffect(() => {
    setTechStacks([]);
    setProjectName("");
    setProjectLongDescription("");
    // setProjectLink("");
    // setProjectImages([""]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchByProjectId = async () => {
      try {
        const response = await fetch(`/api/portfolio/projects/${id}`);
        const result = await response.json();
        console.log(result.data);

        if (result.success) {
          setProjectName(result.data.title || "");
          setProjectLongDescription(result.data.longDescription || "");
          // setProjectLink(result.data.link || "");
          setTechStacks(result.data.techStack || []);
          // const fetchedImages = result.data.images || [];
          // setProjectImages(fetchedImages);
        } else {
          console.error("Failed to load project data.");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    if (id) fetchByProjectId();
  }, [id]);

  useEffect(() => {

    gsap.fromTo(
      slideImageRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: slideImageRef.current,
          start: "top 90%",
        },
      }
    );

    projectCardRefs.current.forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill()); // Cleanup on unmount
    };
  }, []);

  const { projects } = useDataContext();

  return (
    <div className="z-10 h-full min-h-screen mb-20 w-full relative dark:text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12"
      style={{ maxWidth: "1600px" }}>
      {projectLongDescription && (
        <>
          <div className="w-[95%] min-h-96 transparent-color rounded-[50px] flex max-md:flex-col justify-between p-10 ">
            <div>
              <h1 className="text-4xl pb-10 text-white dark:text-black">{projectName}</h1>
              <p className="text-gray-400 dark:text-gray-700" dangerouslySetInnerHTML={{ __html: projectLongDescription }}></p>
            </div>

            <div ref={slideImageRef} className="relative ml-5">
              <SlideImage />
            </div>
          </div>
          <div className="w-full">
            <div className="mt-12 z-10 transparent-color px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex ml-3">
              <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
                <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
              </div>
              <i> Tech Stack</i>
            </div>
          </div>

          <div className="w-[95%] transparent-color rounded-[50px]">
            <IconsImage techStacks={techStacks} />
          </div>
        </>

      )}
      <div className="w-full">
        <div className="mt-12 z-10 transparent-color px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex ml-3">
          <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
            <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
          </div>
          <i> Projects</i>
        </div>
      </div>

      <div className="flex w-full justify-around flex-wrap">
        {projects.map((project) => (
          <div key={project._id} className="projectCard">
            <ProjectCard project={project} src={"work"} />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default WorkPage;
