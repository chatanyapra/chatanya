import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const skillBarsRef = useRef([]);

    useEffect(() => {
        skillBarsRef.current.forEach((bar) => {
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

    const skills = [
        { name: 'WordPress', percentage: '95%' },
        { name: 'Reactjs', percentage: '75%' },
        { name: 'Laravel', percentage: '90%' },
        { name: 'Java', percentage: '60%' },
        { name: 'PHP', percentage: '80%' },
        { name: 'JavaScript', percentage: '60%' },
    ];

    return (
        <section className="text-white dark:text-black pb-10 mb-8">
            <div className="w-full mx-auto px-4">
                <div className='transparent-color px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex ml-3'>
                    <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
                        <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
                    </div>
                    <i>My Skills</i>
                </div>
                <h3 className="text-3xl font-bold my-4 ml-3">I Develop Skills Regularly</h3>
                <p className="text-gray-400 mb-8 ml-3">
                    Dliquip ex ea commo do conse namber onequa ute irure dolor in reprehenderit in voluptate.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-[95%] m-auto">
                    {skills.map((skill, index) => (
                        <div key={skill.name}>
                            <div className="flex justify-between mb-1">
                                <span>{skill.name}</span>
                                <span>{skill.percentage}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    ref={(el) => (skillBarsRef.current[index] = el)}
                                    data-percent={skill.percentage}
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: '0%' }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

