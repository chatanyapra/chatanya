import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import backgroundLine from "../assets/images/background-line.png";


const Working = () => {
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
        <section className="text-white dark:text-black py-12 px-6 relative w-full">
            <img src={backgroundLine} className='w-full h-full absolute -left-2 -right-14 -z-10' alt="" />
          <div className="w-[95%] max-sm:w-[100%] ml-3 max-sm:ml-0">
            <div className='transparent-color light-dark-shadow backdrop-blur-xl bg-black/30 px-4 py-1 text-4xl rounded-2xl justify-center items-center w-fit mb-4 text-gradient h-fit flex'>
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
    );
};

export default Working;
