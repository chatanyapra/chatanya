import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideImage from "../components/SlideImage";
import "./WorkPage.css";
import BootstrapIcon from "../assets/IconsImage/bootstrap.png";
import AjaxIcon from "../assets/IconsImage/ajax.png";
import ApiIcon from "../assets/IconsImage/api.png";
import CssIcon from "../assets/IconsImage/css3.png";
import ExpressIcon from "../assets/IconsImage/expressjs.png";
import JsIcon from "../assets/IconsImage/js.png";
import ReactIcon from "../assets/IconsImage/react.png";
import TailwindIcon from "../assets/IconsImage/tailwindcss.png";
import TypescriptIcon from "../assets/IconsImage/typescript.png";
import PhpIcon from "../assets/IconsImage/php.png";
import laravelIcon from "../assets/IconsImage/laravel.png";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const WorkPage = () => {
  const techIconsRef = useRef([]); 
  const slideImageRef = useRef(null); 
  const projectCardRefs = useRef([]); 

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: techIconsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        scrub: 1,
      },
    });

    tl.fromTo(
      techIconsRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

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

  return (
    <div className="z-10 h-auto w-full relative dark:text-black text-white overflow-hidden flex flex-col md:px-12 m-auto pt-32 max-md:pt-12 pb-12">
      <div className="w-[100%] min-h-96 transparent-color rounded-[50px] flex max-md:flex-col justify-between p-10 ">
        <div>
          <h1 className="text-4xl pb-10">Project Name 1</h1>
          <p className="text-gray-400 dark:text-gray-700">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
            perferendis accusamus temporibus animi pariatur, est facere, eaque,
            molestias ad aut magni vero consequuntur repudiandae minima quaerat?
            Optio laudantium provident dolorum?
          </p>
          <p className="text-gray-400 dark:text-gray-700 pt-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
            perferendis accusamus temporibus animi pariatur, est facere, eaque,
            molestias ad aut magni vero consequuntur repudiandae minima quaerat?
            Optio laudantium provident dolorum?
          </p>
        </div>

        <div ref={slideImageRef}>
          <SlideImage />
        </div>
      </div>

      <div className="mt-12 z-10 transparent-color px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex ml-3">
        <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
          <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
        </div>
        <i> Tech Stack</i>
      </div>

      <div className="w-[100%] transparent-color rounded-[50px] grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
        {[BootstrapIcon, AjaxIcon, ApiIcon, CssIcon, ExpressIcon, JsIcon, ReactIcon, TailwindIcon, TypescriptIcon, PhpIcon, laravelIcon].map(
          (icon, index) => (
            <div
              className="bg-white rounded-2xl w-20 h-20 max-md:block flex justify-center items-center p-2 mx-4 will-change-transform"
              key={index}
              ref={(el) => (techIconsRef.current[index] = el)}
            >
              <img src={icon} className="w-12 mr-3 max-md:mr-10 my-4" alt="" />
            </div>
          )
        )}
      </div>

      <div className="mt-12 z-10 transparent-color px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex ml-3">
        <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
          <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
        </div>
        <i> Projects</i>
      </div>

      <div className="flex w-full justify-around flex-wrap max-md:pl-4">
        {[...Array(4)].map((_, index) => (
          <div
            className="projectCard"
            key={index}
            ref={(el) => (projectCardRefs.current[index] = el)}
          >
            <ProjectCard />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default WorkPage;
