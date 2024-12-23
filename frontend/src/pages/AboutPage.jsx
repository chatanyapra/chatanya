import image2 from "../assets/images/imageface2.png";
// import starpng from "../assets/images/starpng.png";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from "../components/Footer";
import BootstrapIcon from "../assets/IconsImage/bootstrap.png";
import AjaxIcon from "../assets/IconsImage/ajax.png";
import ApiIcon from "../assets/IconsImage/api.png";
// import CssIcon from "../assets/IconsImage/css3.png";
// import WordpressIcon from "../assets/IconsImage/wordpress.png";
import ExpressIcon from "../assets/IconsImage/expressjs.png";
// import HtmlIcon from "../assets/IconsImage/html5.png";
// import JavaIcon from "../assets/IconsImage/java.png";
// import JsIcon from "../assets/IconsImage/js.png";
import ReactIcon from "../assets/IconsImage/react.png";
import TailwindIcon from "../assets/IconsImage/tailwindcss.png";
import TypescriptIcon from "../assets/IconsImage/typescript.png";
// import PhpIcon from "../assets/IconsImage/php.png";
import laravelIcon from "../assets/IconsImage/laravel.png";
import Skills from "../components/Skills";
// import Working from "../components/Working";

gsap.registerPlugin(ScrollTrigger);
const AboutPage = () => {
  const skillBarsRef2 = useRef([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    skillBarsRef2.current.forEach((bar) => {
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: bar.dataset.percent,
          duration: 2,
          scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);
  // ----------working---------------
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref && index === activeIndex) {
        gsap.to(ref, { height: 'auto', duration: 0.2 });
      } else if (ref) {
        gsap.to(ref, { height: 0, duration: 0.2 });
      }
    });
  }, [activeIndex]);

  const toggleContent = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const sections = [
    { title: 'Work Strategy', content: 'Detailed content about work strategy...' },
    { title: 'The Process of Our Work', content: 'Detailed content about our work process...' },
    { title: 'Core Value of Development', content: 'Detailed content about core values...' },
    { title: 'Desire to Work Hard', content: 'Detailed content about the desire to work hard...' },
  ];
  return (
    <div className="z-10 h-full min-h-screen w-full relative dark:text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12"
      style={{ maxWidth: "1600px" }}>
      {/* ---------content------------ */}
      <div className="w-full flex justify-evenly max-md:items-center z-10 max-md:flex-col text-white dark:text-black">
        <div className="w-[52%] max-md:w-[98%] min-h-[450px] overflow-hidden max-md:h-auto transparent-color md:rounded-[50px] rounded-t-[50px] p-6 border-b-0 relative big-screen-light-dark-shadow" style={{}}>
          <h1 className="text-4xl sm:text-5xl mt-4 font-bold">Hello,</h1>
          <h1 className="text-4xl sm:text-5xl pt-4 font-bold">I&apos;m Chatanya</h1>
          <p className="pt-4 text-gray-300 dark:text-gray-800">
            I am a full stack developer with a passion for creating beautiful and functional web applications. I chose this as a career because I love to create nice stuff. Creativity is the key. Now I target building some awesome stuff that can help people in their daily life.
          </p>
          <p className="pt-4 text-gray-300 dark:text-gray-800">
            I am currently working as a Freelance Developer and a Full Stack Developer Intern and I am open to new opportunities. I have a healthy obsession of learning new everyday which makes a better developer and a better Athlete. I love playing Football.
          </p>
        </div>
        <div className="w-[34%] max-md:w-[98%] h-auto transparent-color md:rounded-[50px] rounded-b-[50px] overflow-hidden flex justify-center items-center big-screen-light-dark-shadow">
          <img src={image2} className="m-auto h-full max-h-[450px]" alt="" />
        </div>
      </div>

      {/* ---------Skils-------------- */}
      <div className="z-10 w-full mt-10">
        <Skills/>
        <div className="w-full overflow-hidden whitespace-nowrap bg-black/30 backdrop-blur-xl py-4 -rotate-3 -ml-1 mt-16">
          <div className="marquee flex">
            <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
            <img src={ReactIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">React JS</span>
            <img src={ExpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Express JS</span>
            <img src={TailwindIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Tailwind</span>
            <img src={BootstrapIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Bootstrap</span>
            <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
            <img src={ReactIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">React JS</span>
            <img src={ExpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Express JS</span>
            <img src={TailwindIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Tailwind</span>
            <img src={BootstrapIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Bootstrap</span>
            <img src={AjaxIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">AJAX</span>
            <img src={TypescriptIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">TypeScript</span>
            <img src={ApiIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">FastApi</span>
            <img src={AjaxIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">AJAX</span>
            <img src={TypescriptIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">TypeScript</span>
            <img src={ApiIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">FastApi</span>
            <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
          </div>
        </div>
        <div className="w-full overflow-hidden whitespace-nowrap bg-black/30 backdrop-blur-xl py-4 rotate-3 mt-5 -ml-1">
          <div className="marquee flex">
            <img src={TypescriptIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">TypeScript</span>
            <img src={ApiIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">FastApi</span>
            <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
            <img src={ReactIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">React JS</span>
            <img src={ExpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Express JS</span>
            <img src={TailwindIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Tailwind</span>
            <img src={BootstrapIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Bootstrap</span>
            <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
            <img src={ReactIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">React JS</span>
            <img src={ExpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Express JS</span>
            <img src={TailwindIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Tailwind</span>
            <img src={BootstrapIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Bootstrap</span>
            <img src={AjaxIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">AJAX</span>
            <img src={TypescriptIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">TypeScript</span>
            <img src={ApiIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">FastApi</span>
            <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
            <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
          </div>
        </div>
        {/* ------------working-------------- */}
        <section className="text-white dark:text-black py-12 px-6 w-full mt-6">
          <div className="w-[95%] max-sm:w-[100%] ml-3 max-sm:ml-0">
            <div className='transparent-color light-dark-shadow backdrop-blur-xl bg-black/30 px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex justify-center items-center '>
              <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
                <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
              </div>
              <i className="mb-2">Working</i>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mt-4">Real Passion to Create Amazing Things</h3>
              <p className="text-white dark:text-black mt-4 mb-8">
                Dliquip ex ea commo do conse namber onequa ute irure dolor in reprehenderit in voluptate.
              </p>
            </div>
            {/* Collapsible content */}
            {sections.map((section, index) => (
              <div key={index} className="mb-4 transparent-color light-dark-shadow p-4 rounded-3xl ml-6 max-sm:ml-0 ">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleContent(index)}
                >
                  <span className="font-bold text-lg">{section.title}</span>
                  <span className="text-2xl text-center">
                    {activeIndex === index ? '-' : '+'}
                  </span>
                </div>
                <div
                  className="overflow-hidden text-gray-400 dark:text-gray-600"
                  ref={(el) => (contentRefs.current[index] = el)}
                  style={{ height: '0px' }}
                >
                  <p className="mt-2 pl-4">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  )
}

export default AboutPage
