import { useState } from 'react';
import project1 from "../assets/projectimage/auramicchattingthumbnail.jpg"
import project2 from "../assets/projectimage/figmaCapture.jpg"
import "./About.css"
const BlogCard = () => {
  const [mainImage, setMainImage] = useState(project1);
  const [smallImage, setSmallImage] = useState(project2);

  const toggleImage = (newImage) => {
    if (mainImage !== newImage) {
      setMainImage(newImage);
      setSmallImage(project1);
    } else {
      setMainImage(project1);
      setSmallImage(newImage);
    }
  };

  return (
    <div className=" flex justify-center items-center my-6 mx-auto w-full">
      <div className="relative w-[600px] max-lg:w-[98%] h-[400px] max-sm:h-[300px]">
        <div className="absolute top-0 left-0 w-4/5 h-5/6 bg-gray-200 rounded-[40px] overflow-hidden">
          <img src={mainImage} className="toggleImage1 w-full h-full object-fill hover:scale-150 hover:opacity-75 transition duration-500 ease-in-out" alt="Main" />
        </div>
        <div className="absolute right-0 bottom-0 w-3/4 h-[45%] rounded-b-[40px] rounded-r-[40px] rounded-tl-[5px] py-1 pl-2 transparent-colorblack overflow-hidden">
          <div className="text-white text-xl max-sm:text-base font-bold">The Title Of Blog...</div>
          <p className="text-gray-200 text-sm pl-3 max-sm:text-[10px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolor accusamus repellendus repudiandae tenetur explicabo error consequatur ipsum excepturi commodi.
          </p>
        </div>
        <div className="absolute bottom-0.5 left-1 w-[22%] h-[15%] flex justify-between items-center">
          <div onClick={() => toggleImage(project2)} className="w-10 h-10 cursor-pointer bg-gray-100 rounded-full outline-gray-500 outline-dashed outline-2 outline-offset-2 overflow-hidden">
            <img src={smallImage} className="toggleImage2 w-full h-full object-fill" alt="Small" />
          </div>
          <div onClick={() => toggleImage('XDZT.gif')} className="w-10 h-10 cursor-pointer bg-gray-100 rounded-full outline-gray-500 outline-dashed outline-2 outline-offset-2 overflow-hidden">
            <img src="XDZT.gif" className="toggleImage3 w-full h-full object-fill" alt="Small" />
          </div>
        </div>
        <div className="w-[18%] h-[52%] absolute right-0 top-0 rounded-3xl transparent-colorwhite text-white dark:text-black flex flex-col justify-around text-center py-2">
          <div className="text-xl font-bold max-sm:text-base text-blue-700 cursor-pointer">Read</div>
          <div className="text-5xl font-bold mt-5 max-sm:text-3xl">1</div>
          <div className="text-2xl font-bold max-sm:text-base">Blog</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
