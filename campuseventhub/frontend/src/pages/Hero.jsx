import React from "react";
import bgImage from "../assets/bginfosys.png";
import heroImg from "../assets/heroimg.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section
      className="w-full h-screen bg-cover bg-center flex"
      style={{
        backgroundImage: `url(${bgImage})`, // Replace with your image URL
      }}
    >
      {/* Overlay (optional for readability) */}
      <div className="w-full h-screen flex">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-start pl-25">
          <div className=" text-primary">
            <h1 className="text-6xl font-bold tracking-tight">
              Your Gateway <br />
              <span>to Every College Event</span>
            </h1>
            <p className="mt-6 text-md text-gray-600">
              From tech fests to cultural nights, competitons to workshops,-
              Stay updated and never miss oout on what's happening around you.
            </p>
            <div className="mt-8 flex gap-4">
              <Link className="px-6 py-3 bg-primary text-white rounded ">
                Explore Events
              </Link>
              <Link className="px-6 py-3  text-primary border-primary border-2 rounded  hover:bg-primary hover:text-white transition ease-linear .5s">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center">
          <img src={heroImg} alt="Hero Illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
