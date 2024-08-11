import { HiTrash } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useBag } from "../context/BagContext";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  // Added to make the image square
  object-fit: cover;
  object-position: center;
  margin-right: 0.8rem; // Added to provide space between image and text
`;

const Roww = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
  margin: 4% 5%;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
Roww.defaultProps = {
  type: "vertical",
};

const TextRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.6rem;
`;

const Price = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
`;

const SubTitle = styled.h2`
  font-size: 1.4rem;
  color: #555; // Added color to differentiate subtitles
`;

const Quantity = styled.h1`
  font-size: 1.4rem;
`;

const Remove = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.4rem;
  color: red;
  cursor: pointer; // Added cursor change to indicate clickable text
`;

function CartElement({ title, price, quantity, photo, id }) {
  const { setBag } = useBag();
  function remove() {
    setBag((prevBag) => prevBag.filter((item) => item.id !== id));
  }
  return (
    <Roww type="horizontal">
      <Img src={photo} />
      <TextRow>
        <TitleRow>
          <Title>{title}</Title>
          <Price>${price}</Price>
        </TitleRow>
        <SubTitle>salmon</SubTitle>
        <DetailRow>
          <Quantity>{quantity}</Quantity>
          <Remove onClick={remove}>
            <HiTrash></HiTrash>
          </Remove>
        </DetailRow>
      </TextRow>
    </Roww>
  );
}

export { CartElement };
