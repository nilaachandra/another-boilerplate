import React from "react";

const Homepage = () => {
  return (
    <div className="w-full min-h-[75vh] items-center flex flex-col justify-center">
      <h1 className="lg:text-5xl text-4xl font-bold  text-center">
        Another Boilerplate
      </h1>
      <p className="text-lg font-semibold">
        Nothing, it&apos; Just Another Boiler Plate
      </p>
      <p className="">
        This is a <a href="">Next Js</a> boiler plate wrapper preloaded with{" "}
        <span>Next Theme</span> for Dark and Light mode, custom font named{" "}
        <span>Bricolage Grotesque</span>,<a href=""> ShadCN/ui</a>,{" "}
        <a href="">React Icons</a>
      </p>
    </div>
  );
};

export default Homepage;
