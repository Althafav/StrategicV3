// CardSwiperDemo Setup & Run Instructions

/*
  1. Ensure you have Node.js installed.
  2. In your project root, install dependencies:
       npm install swiper react react-dom
     or if using yarn:
       yarn add swiper react react-dom
*/

// === File: src/CardSwiper.js ===
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/autoplay";
import "swiper/css/navigation";
// Replace these URLs with any images you like
const cards = [
  {
    id: 1,
    title: "Sunset Vista",
    image:
      "https://plus.unsplash.com/premium_photo-1674086604650-622e543fcaf0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3Vuc2V0JTIwVmlzdGF8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "Forest Path",
    image:
      "https://plus.unsplash.com/premium_photo-1665311552973-53cdaeaa52c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Rm9yZXN0JTIwUGF0aHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    title: "City Lights",
    image:
      "https://plus.unsplash.com/premium_photo-1666700698946-fbf7baa0134a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2l0eSUyMExpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    title: "Mountain Peak",
    image:
      "https://plus.unsplash.com/premium_photo-1674331229629-3d33a5af0711?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TW91bnRhaW4lMjBQZWFrfGVufDB8fDB8fHww",
  },
];

export default function CardSwiper() {
  const [bgImage, setBgImage] = useState(cards[0].image);
  const [fade, setFade] = useState(true);

  const handleSlideChange = (swiper: any) => {
    const nextImg = cards[swiper.activeIndex]?.image;
    setFade(false);
    setTimeout(() => {
      setBgImage(nextImg);
      setFade(true);
    }, 300);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",

        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        opacity: fade ? 1 : 0.7,
        transition: "opacity 300ms ease-in-out",
      }}
      className=""
    >
      {/* Background layer with fade effect */}
      <div className="flex justify-end h-screen items-end container mx-auto pb-20">
        <div className="">
          <Swiper
            modules={[EffectCards, Navigation]}
            effect="cards"
            grabCursor
            navigation
            onSlideChange={handleSlideChange}
            style={{ width: 300, height: 400 }}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    background: "#000",
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "8px 16px",
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      fontSize: "18px",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    {card.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Swiper deck on top */}
    </div>
  );
}
