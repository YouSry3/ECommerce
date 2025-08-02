// import React from "react";
// import Slider from "react-slick";
// import img1 from "../../assets/images/slider-image-1.jpeg";
// import img2 from "../../assets/images/slider-image-2.jpeg";
// import img3 from "../../assets/images/slider-image-3.jpeg";
// import img4 from "../../assets/images/IMage4.jpg";
// import img5 from "../../assets/images/IMage5.jpg";
// export default function MainSlider() {
//   var settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     arrows:false,
//   };
//   return (
//     <div className="flex mt-32  mx-auto">
//       <div className="w-9/12">
//         <Slider {...settings} >
//           <div> 
//             <img src={img1} className=" h-96 object-cover w-full" alt="slider photo" />
//           </div>
//           <div>
//             <img src={img2} className=" h-96 object-cover w-full" alt="slider photo" />
//           </div>
//           <div className="w-full">
//             <img src={img3} className=" h-96 object-cover w-full" alt="slider photo" />
//           </div>
//         </Slider>
//       </div>

//       <div className="w-3/12">
//         <div><img src={img4} className="w-full h-48 object-cover" alt="" /></div>
//         <div><img src={img5} className="w-full h-48 object-cover" alt="" /></div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import img4 from "../../assets/images/IMage4.jpg";
import img5 from "../../assets/images/IMage5.jpg";

export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mt-24 md:mt-32 mx-auto px-4 md:px-0">
      {/* Mobile layout (vertical stack) */}
      <div className="flex flex-col md:hidden gap-2">
        <div className="w-full">
          <Slider {...settings}>
            <div>
              <img src={img1} className="h-64 object-cover w-full rounded-lg" alt="slider photo" />
            </div>
            <div>
              <img src={img2} className="h-64 object-cover w-full rounded-lg" alt="slider photo" />
            </div>
            <div>
              <img src={img3} className="h-64 object-cover w-full rounded-lg" alt="slider photo" />
            </div>
          </Slider>
        </div>
        <div className="flex gap-2">
          <div className="w-1/2">
            <img src={img4} className="w-full h-40 object-cover rounded-lg" alt="promotional image" />
          </div>
          <div className="w-1/2">
            <img src={img5} className="w-full h-40 object-cover rounded-lg" alt="promotional image" />
          </div>
        </div>
      </div>

      {/* Desktop layout (side by side) - equal heights */}
      <div className="hidden md:flex gap-4">
        <div className="w-9/12">
          <Slider {...settings}>
            <div>
              <img src={img1} className="h-full object-cover w-full rounded-lg" style={{height: "24rem"}} alt="slider photo" />
            </div>
            <div>
              <img src={img2} className="h-full object-cover w-full rounded-lg" style={{height: "24rem"}} alt="slider photo" />
            </div>
            <div>
              <img src={img3} className="h-full object-cover w-full rounded-lg" style={{height: "24rem"}} alt="slider photo" />
            </div>
          </Slider>
        </div>
        <div className="w-3/12 flex flex-col gap-4">
          <div className="h-1/2">
            <img src={img4} className="w-full h-full object-cover rounded-lg" style={{height: "11.5rem"}} alt="promotional image" />
          </div>
          <div className="h-1/2">
            <img src={img5} className="w-full h-full object-cover rounded-lg" style={{height: "11.5rem"}} alt="promotional image" />
          </div>
        </div>
      </div>
    </div>
  );
}