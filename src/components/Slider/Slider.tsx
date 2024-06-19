import { ArrowBackIosSharp, ArrowForwardIosSharp } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const slideInAnimation = keyframes`
    0% { transform: translateY(-100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
`;

const slideLeftAnimation = keyframes`
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div<{ direction: string }>`
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.7;
  z-index: 2;
  border-radius: 50%;
`;

const Wrapper = styled.div<{ slideIndex: number }>`
  height: 100%;
  display: flex;
  transition: all 1.3s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div<{ bg: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #${(props) => props.bg};
`;

const Image = styled.img`
  height: 100%;
  padding-bottom: 100px;
  box-shadow: 10px 0 40px 10px rgba(0, 0, 0, 0.25);
  animation: ${slideLeftAnimation} 1.8s;
`;

const InfoContainer = styled.div`
  flex: 3;
  padding: 100px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${slideInAnimation} 1.8s;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  width: 200px;
  font-size: 20px;
  border: none;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const Slider: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction: string) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  const navigate = useNavigate();
  const navigateToShop = () => {
    navigate("/shop");
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIosSharp />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        <Slide bg="ec4154">
          <Image src="https://sistemasyprogramas.com/8562-medium_default/computador-gamer-rx-amd-ryzen-5-3500-16gb-ssd-240gb-video-rx-580-8gb-monitor-de-195-pulg.jpg" />
          <InfoContainer>
            <Title>Computadoras</Title>
            <Desc>Consigue las mejores computadoras en ofertas</Desc>
            <Button onClick={navigateToShop}>¡Comprar Ahora!</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="e1f2fc">
          <Image src="https://changlonet.com/blog/wp-content/uploads/2023/03/030123_1817_Refrigeraci1.jpg" />
          <InfoContainer>
            <Title>Refrigeración</Title>
            <Desc>Obten los mejores precios de refrigeración líquida</Desc>
            <Button onClick={navigateToShop}>¡Comprar Ahora!</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="fcece1">
          <Image src="https://i.rtings.com/assets/products/9nPmVi23/epomaker-th80-pro/design-medium.jpg?format=auto" />
          <InfoContainer>
            <Title>Hardware</Title>
            <Desc>Los mejores accesorios para tu PC</Desc>
            <Button onClick={navigateToShop}>¡Comprar Ahora!</Button>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIosSharp />
      </Arrow>
    </Container>
  );
};

export default Slider;
