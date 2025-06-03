// components/BannerCarousel.tsx

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Upcomingeventitem } from "@/models/upcomingeventitem";
import Link from "next/link";

export default function UpcomingCarousel({ items }: { items: any }) {
  if (!items) return null; // render nothing until banners arrive

  return (
    <div className="">
      <div className="">
        <Swiper
          spaceBetween={10}
          loop={true}
          slidesPerView={4}
          freeMode={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {items.map((b: any, index: number) => {
            const item: Upcomingeventitem = b;
            return (
              <SwiperSlide className="" key={index}>
                <div
                  key={index}
                  className="bg-white p-5 shadow-xl rounded-xl flex flex-col"
                >
                  <div>
                    <Image
                      width={600}
                      height={600}
                      quality={100}
                      src={item.image.value[0]?.url}
                      alt={item.name.value}
                      className="h-40 w-full  object-contain bg-primarylight rounded-md mb-3"
                    />
                  </div>
                  <h4 className="text-lg font-semibold mb-1">
                    {item.name.value}
                  </h4>
                  <p className="text-gray-600 mb-1 font-medium">
                    {item.date.value}
                  </p>
                  <p className="text-gray-600 mb-3 text-sm">
                    {item.venue.value}
                  </p>
                  <Link
                    href={item.link.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="more-info-btn font-sm font-medium py-3"
                  >
                    Learn more
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
