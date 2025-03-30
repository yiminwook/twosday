"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import Hero from "./Hero";

export default function HeroSection() {
  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView="auto" // 무한 슬라이드를 위해 auto로 설정
      loop={true}
      // autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
      // navigation
      pagination={{ clickable: true }}
      a11y={{
        // 웹  접근성
        nextSlideMessage: "다음 슬라이더로 이동",
        prevSlideMessage: "이전 슬라이더로 이동",
        slideLabelMessage: "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(e) => console.log("slide change", e)}
    >
      <SwiperSlide>
        <Hero />
      </SwiperSlide>
    </Swiper>
  );
}
