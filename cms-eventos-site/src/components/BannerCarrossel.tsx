 "use client";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function BannerCarrossel() {
  const imagens = ["/img/show-musical.jpeg", "/img/negocio.jpg"];

  return (
    <div className="mt-4">
      <Carousel autoPlay interval={10000} infiniteLoop showThumbs={false}>
        {imagens.map((src, i) => (
          <div key={i}>
            <img src={src} alt={`Banner ${i + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
