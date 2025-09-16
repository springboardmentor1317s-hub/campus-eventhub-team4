import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white h-18 px-10 py-10 flex flex-1 justify-between items-center tracking-tight">
      <div className="text-black text-2xl font-bold">
        CAMPUS<span className="text-primary">EVENTHUB.</span>
      </div>
      <nav className="flex justify-evenly gap-20 font-medium">
        <a href="#home" className="text-[#2563EB]">
          Home
        </a>
        <a
          href="#About"
          className="text-[#374151] hover:text-blue-600 transition"
        >
          About
        </a>
        <a
          href="#events"
          className="text-[#374151] hover:text-blue-600 transition"
        >
          Events
        </a>

        <a
          href="#feedback"
          className="text-[#374151] hover:text-blue-600 transition"
        >
          Feedback
        </a>
        <a
          href="#contact"
          className="text-[#374151] hover:text-blue-600 transition"
        >
          Contact
        </a>
      </nav>
      <div>
        <Link
          to="/signup"
          className="flex items-center gap-1.5 px-7 py-2.5 cursor-pointer bg-primary font-medium text-white rounded-full shadow hover:bg-blue-700 transition"
        >
          {/* Filled User Icon */}
          <User fill="white" strokeWidth={0} size={20}></User>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
