// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import useApi from "../Hooks/useApi";

// export default function CategorySlider() {
//   // let [categoryList, setCategory] = useState(null);
//   // function getAllCategory() {
//   //   axios
//   //     .get(`https://ecommerce.routemisr.com/api/v1/categories`)
//   //     .then((req) => {
//   //       setCategory(req.data.data);
//   //     });
//   // }
//   // useEffect(() => {
//   //   getAllCategory();
//   // }, []);
//   let {data} = useApi("categories")
//   return (
//     <div className="my-8"> 
//       <Slider  slidesToShow={6} infinite  autoplay speed={500} slidesToScroll={3}>
//         {data?.data?.data?.map((category) => {
//           return (
//             <div key={category._id}>
//               <img src={category.image} className="h-64 w-full object-cover object-top" alt={category.name}/>
//               <h5 className="text-center">{category.name}</h5>
//             </div>
//           );
//         })}
//       </Slider>
//     </div>
//   );
// }


import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import useApi from "../Hooks/useApi";

export default function CategorySlider() {
  // Using the custom useApi hook instead of local state and axios call
  let { data } = useApi("categories");

  // Responsive settings for the slider
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 3000, // Large screens
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="my-8">
      <Slider {...settings}>
        {data?.data?.data?.map((category) => {
          return (
            <div key={category._id} className="px-1">
              <img 
                src={category.image} 
                className="h-64 w-full object-cover object-top rounded-lg" 
                alt={category.name}
              />
              <h5 className="text-center mt-2 font-medium">{category.name}</h5>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
