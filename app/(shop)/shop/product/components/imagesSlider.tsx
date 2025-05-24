import React, { useEffect } from "react";
import Slider from "react-slick";
import { useProductStore } from "@/app/store/productsStore";

function ImageSlider({ images }: any) {
  const [mainImageIndex, setMainImageIndex] = React.useState(0);
  const productImages = useProductStore((state: any) => state.productImages);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <>
      {productImages.length > 0 && (
        <div className="w-full md:w-1/2 px-4 mb-8">
          <img
            src={productImages[mainImageIndex]?.urls[0].url}
            alt="Product Image"
            className="w-full h-auto rounded-lg shadow-md mb-4"
            id="mainImage"
          />
          <div>
            {productImages.length > 1 && (
              <Slider {...settings}>
                {productImages.map((imgObj: any, i: number) => {
                  return (
                    <button
                      onClick={() => {
                        setMainImageIndex(i);
                      }}
                      key={i}
                    >
                      <img
                        className="size-24 sm:size-28 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                        src={imgObj?.urls ? imgObj?.urls[0].url : ""}
                        alt=""
                      />
                    </button>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      )}

      {productImages.length == 0 && images.length > 0 && (
        <div className="w-full md:w-1/2 px-4 mb-8">
          <img
            src={images[mainImageIndex]?.urls[0].url}
            alt="Product Image"
            className="w-full h-auto rounded-lg shadow-md mb-4"
            id="mainImage"
          />
          <div>
            {images.length > 1 && (
              <Slider {...settings}>
                {images.map((imgObj: any, i: number) => {
                  return (
                    <button
                      onClick={() => {
                        setMainImageIndex(i);
                      }}
                      key={i}
                    >
                      <img
                        className="size-24 sm:size-28 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                        src={imgObj?.urls[0].url}
                        alt=""
                      />
                    </button>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ImageSlider;
