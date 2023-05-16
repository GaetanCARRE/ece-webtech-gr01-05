import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import CarouselControls from "./CarouselControls";

const Carousel = ({ children, ...options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const canScrollPrev = !!emblaApi?.canScrollPrev();
  const canScrollNext = !!emblaApi?.canScrollNext();
  return (
    <>
      <div ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
      <div className="flex my-2 -translate-y-5 bg-transparent">
        <CarouselControls
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
          onNext={() => emblaApi?.scrollNext()}
          onPrev={() => emblaApi?.scrollPrev()}
        />
      </div>
    </>
  );
};

export default Carousel;