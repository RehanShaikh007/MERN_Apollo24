import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
    { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
    { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
    { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
    { name: "Oncology", imageUrl: "/departments/onco.jpg" },
    { name: "Radiology", imageUrl: "/departments/radio.jpg" },
    { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
    { name: "Dermatology", imageUrl: "/departments/derma.jpg" },
    { name: "ENT", imageUrl: "/departments/ent.jpg" },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className='container departments'>
      <h2 className="text-2xl font-semibold mb-4 text-center">Departments</h2>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        arrows={true}
        pauseOnHover={true}
        keyBoardControl={true}
        customTransition="transform 800ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px" 
      >
        {departmentsArray.map((depart, index) => (
          <div key={index} className="card bg-white shadow-md rounded-lg overflow-hidden text-center p-4">
            <img
              src={depart.imageUrl}
              alt={depart.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <div className="depart-name font-medium text-lg">{depart.name}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Departments;
