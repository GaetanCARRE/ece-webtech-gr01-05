import {MdNavigateNext, MdNavigateBefore} from "react-icons/md";

const CarouselControls = (props) => {
  return (
    <div className="flex w-full justify-between bg-transparent">
      <button
        className="text-black text-2xl"
        onClick={() => {
          if (props.canScrollPrev) {
            props.onPrev();
          }
        }}
        disabled={!props.canScrollPrev}
      >
        <MdNavigateBefore className="bg-transparent"/>
      </button>
      <button
        className="text-black text-2xl"
        onClick={() => {
          if (props.canScrollNext) {
            props.onNext();
          }
        }}
        disabled={!props.canScrollNext}
        
      >
        <MdNavigateNext className="bg-transparent"/>
      </button>
    </div>
  );
};

export default CarouselControls;