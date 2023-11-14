import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <MainContainer>
      <Sliders {...settings}>
        <div>
          <Img src="img/addimg1.jpg" />
        </div>
        <div>
          <Img src="img/addimg2.jpg" />
        </div>
        <div>
          <Img src="img/addimg3.jpg" />
        </div>
      </Sliders>
    </MainContainer>
  );
};

export default MainCarousel;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Sliders = styled(Slider)`
  .slick-dots {
    left: 50%;
    bottom: 25px;
    width: auto;
    border-radius: 10.5px;
    z-index: 10;
    transform: translate(-50%, 0);

    li {
      button {
        &::before {
          position: static;
          font-size: 10px;
          color: #fff;
        }
      }
    }
  }
`;
