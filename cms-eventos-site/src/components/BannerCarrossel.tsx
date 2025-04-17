"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function BannerCarrossel() {
  const imagens = ["/img/pinkfloyd.webp", "/img/negocio.jpg", "/img/recicla-agrn.png", "/img/standup.jpg"];

  return (
    <div className="mt-4 h-[400px] overflow-hidden rounded-lg px-[5%]">
      <Carousel
        autoPlay
        interval={7000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        className="h-full"
      >
        {imagens.map((src, i) => (
          <div key={i}>
            <img
              src={src}
              alt={`Banner ${i + 1}`}
              //  Ajuste na altura da imagem do banner
              //className="h-[400px] w-[80%] max-auto object-cover"
              className="h-[400px] w-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
