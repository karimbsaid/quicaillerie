import styled, { keyframes } from "styled-components";

// Define the keyframes for the ripple animation
const ripple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    opacity: 0;
  }
`;

// Create the styled-component for the ripple loader
const RippleLoader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  color: #1c4c5b; /* Change color here */

  div {
    box-sizing: border-box;
    position: absolute;
    width: 64px;
    height: 64px;
    border: 4px solid currentColor;
    border-radius: 50%;
    opacity: 1;
    animation: ${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;

// Create the styled-component for the container
const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; // Adjust this as needed
  width: 100vw; // Adjust this as needed
`;

const Spinner = () => (
  <CenteredContainer>
    <RippleLoader>
      <div></div>
      <div></div>
    </RippleLoader>
  </CenteredContainer>
);

export default Spinner;
