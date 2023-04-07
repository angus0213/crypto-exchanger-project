import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";
import { COLORS } from "../Constants";
import GlobalStyles from "../GlobalStyles";

const HomeSwiper = () => {
  return (
    <Wrapper>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={250}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <SwiperDiv>
            <div>
            <SwiperWelcome>
                <span>Welcome to Crypto</span>
                <WelcomeSpan>Beats</WelcomeSpan>
              
              </SwiperWelcome>

              <SwiperP>Sign Up Today</SwiperP>
              <SwiperAmount>
                <span>To get </span>
                <SwiperSpan>10,000 USDT</SwiperSpan>
                <span> Bonus!</span>
              </SwiperAmount>
            </div>
            <SwiperImg src="../webImages/btc.jpg" />
          </SwiperDiv>
        </SwiperSlide>
        <SwiperSlide>
          <div><SwiperImg2 src="../webImages/ape.png" /><SwiperImg3 src="../webImages/side1.jpg"/></div>
        </SwiperSlide>
        <SwiperSlide><div><SwiperImg4  src="../webImages/trade.jpg"/><SwiperImg5 src="../webImages/mobileapp.jpg"/></div></SwiperSlide>
      </Swiper>
    </Wrapper>
  );
};

const SwiperWelcome = styled.p`
   display: flex;
  position: relative;
  top: 80px;
  left: 100px;
  font-size: 50px;
  color: ${COLORS.black};
  font-family: "IBM Plex Sans";
  font-weight: 550;
  z-index: 99;
`;

const WelcomeSpan = styled.span`
  font-size: 50px;
  color: ${COLORS.blue};
`;

const SwiperImg = styled.img`
  position: relative;
  left: 90px;
`;
const SwiperDiv = styled.div`
  display: flex;
`;

const SwiperP = styled.p`
  display: flex;
  position: relative;
  top: 100px;
  left: 100px;
  font-size: 50px;
  color: ${COLORS.black};
  font-family: "IBM Plex Sans";
  font-weight: 550;
`;

const SwiperAmount = styled.p`
  display: flex;
  position: relative;
  top: 150px;
  left: 100px;
  font-size: 30px;
  color: ${COLORS.blue};
  font-family: "IBM Plex Sans";
  font-weight: 550;
`;

const SwiperSpan = styled.span`
  font-size: 50px;
  color: ${COLORS.blue};
  position: relative;
  top: -20px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Wrapper = styled.div`
  position: relative;
  top: 120px;
  left: 200px;
  background-color: ${COLORS.white};
  margin-bottom: 100px;
  width: 1480px;
  border-radius: 15px;
`;

const SwiperImg2 = styled.img`
  position: relative;
  left: 100px;
`;

const SwiperImg3 = styled.img`
  position: relative;
  top:120px;
  left: 250px;
  width: 30%;
  border-radius: 50%;
`;

const SwiperImg4 = styled.img`
  position: relative;
  left: 120px;
  width: 30%;
`;

const SwiperImg5 = styled.img`
  position: relative;
  top:0px;
  left: 260px;
  width: 40%;
  border-radius: 50%;
`;

export default HomeSwiper;
