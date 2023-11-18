import { useRef } from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";

import Slide from "./Slide";

// const data = [
//   {
//     cover:
//       "https://sm.ign.com/t/ign_br/image/j/jujutsu-ka/jujutsu-kaisen-explaining-the-next-big-thing-in-anime_bvyw.1200.jpg",
//     title: "Jujutsu",
//   },
//   {
//     cover:
//       "https://a-static.mlcdn.com.br/618x463/painel-de-festa-dragon-ball-z-02-colormyhome/colormyhome/6753/12fc748c743e80ead6904cd5454f4303.jpg",
//     title: "Goku",
//   },
//   {
//     cover:
//       "https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2021/09/10/demon-slayer-capa.png",
//     title: "Kimetsu",
//   },
//   {
//     cover:
//       "https://www.comboinfinito.com.br/principal/wp-content/uploads/2021/10/boruto-karma.jpg",
//     title: "Boruto",
//   },
// ];

const data = [
  {
    title: "carol_of_bells_2022-12-18T18:22:32.289Z.jpg",
    cover:
      "https://output-streamify.s3.ap-south-1.amazonaws.com/carol_of_bells_2022-12-18T18%3A22%3A32.289Z/carol_of_bells_2022-12-18T18%3A22%3A32.289Z.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3RCUUR22X5UYGFHR%2F20221218%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20221218T182556Z&X-Amz-Expires=3600&X-Amz-Signature=92dc316a89786671511478601a1d1f22bfc354f8aa9fd695d5a5a3856ae75a2a&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
  {
    title: "carol_of_bells_2022-12-18T18:22:32.289Z.jpg",
    cover:
      "https://output-streamify.s3.ap-south-1.amazonaws.com/carol_of_bells_2022-12-18T18%3A22%3A32.289Z/carol_of_bells_2022-12-18T18%3A22%3A32.289Z.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3RCUUR22X5UYGFHR%2F20221218%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20221218T182556Z&X-Amz-Expires=3600&X-Amz-Signature=92dc316a89786671511478601a1d1f22bfc354f8aa9fd695d5a5a3856ae75a2a&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
  {
    title: "carol_of_bells_2022-12-18T18:22:32.289Z.jpg",
    cover:
      "https://output-streamify.s3.ap-south-1.amazonaws.com/carol_of_bells_2022-12-18T18%3A22%3A32.289Z/carol_of_bells_2022-12-18T18%3A22%3A32.289Z.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3RCUUR22X5UYGFHR%2F20221218%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20221218T182556Z&X-Amz-Expires=3600&X-Amz-Signature=92dc316a89786671511478601a1d1f22bfc354f8aa9fd695d5a5a3856ae75a2a&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
  {
    title: "carol_of_bells_2022-12-18T18:22:32.289Z.jpg",
    cover:
      "https://output-streamify.s3.ap-south-1.amazonaws.com/carol_of_bells_2022-12-18T18%3A22%3A32.289Z/carol_of_bells_2022-12-18T18%3A22%3A32.289Z.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3RCUUR22X5UYGFHR%2F20221218%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20221218T182556Z&X-Amz-Expires=3600&X-Amz-Signature=92dc316a89786671511478601a1d1f22bfc354f8aa9fd695d5a5a3856ae75a2a&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
  {
    title: "carol_of_bells_2022-12-18T18:22:32.289Z.jpg",
    cover:
      "https://output-streamify.s3.ap-south-1.amazonaws.com/carol_of_bells_2022-12-18T18%3A22%3A32.289Z/carol_of_bells_2022-12-18T18%3A22%3A32.289Z.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3RCUUR22X5UYGFHR%2F20221218%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20221218T182556Z&X-Amz-Expires=3600&X-Amz-Signature=92dc316a89786671511478601a1d1f22bfc354f8aa9fd695d5a5a3856ae75a2a&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
];

const insertDuplicates = ({ items }) => {
  const newItems = [];
  items.forEach((item) => {
    for (let i = items.length - 1; i < 5; i++) newItems.push(item);
  });
  return newItems;
};

const Carousel = ({ items }) => {
  const ref = useRef();
  if (items.length === 0) return null;
  else if (items.length < 5) {
    items = insertDuplicates({ items });
  }
  console.log(items);

  return (
    <div className="carousel">
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          let currentVisibleSlide = 5;
          if (parentWidth <= 1440) currentVisibleSlide = 3;
          else if (parentWidth <= 1080) currentVisibleSlide = 1;
          return (
            <StackedCarousel
              ref={carouselRef}
              data={items}
              carouselWidth={parentWidth}
              slideWidth={500}
              height={516}
              slideComponent={Slide}
              maxVisibleSlide={5}
              currentVisibleSlide={currentVisibleSlide}
              useGrabCursor={true}
            />
          );
        }}
      />
    </div>
  );
};
export default Carousel;
