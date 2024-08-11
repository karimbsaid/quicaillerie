import { HiTrash } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useBag } from "../context/BagContext";
import { useEffect, useState } from "react";

const Img = styled.img`
  width: 4.4rem;
  display: block;
  object-fit: cover;
  object-position: center;
  margin-right: 0.8rem;
`;

const Roww = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;

  box-sizing: border-box;

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
  width: 100%;
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
/*eslint-disable*/

const Quantity = styled.h1`
  font-size: 1.4rem;
`;
const ButtonContent = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonQuantity = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.6rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  cursor: ${(props) =>
    props.allowed
      ? "not-allowed"
      : "pointer"}; // Set cursor based on 'allowed' prop

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d0d0d0;
  }
`;

const Remove = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.4rem;
  color: red;
  cursor: pointer;
`;
function CartElement({ title, price, quantity, photo, id }) {
  const { bag, setBag } = useBag();
  const [count, setCount] = useState(quantity);
  function remove() {
    setBag((prevBag) => prevBag.filter((item) => item.id !== id));
  }
  function handleChangeQuantity() {
    setBag((prevBag) =>
      prevBag.map((item) =>
        item.id === id ? { ...item, quantity: count } : item
      )
    );
  }

  useEffect(() => {
    handleChangeQuantity();
  }, [count]);
  return (
    <Roww type="horizontal">
      <Img src={photo} />
      <TextRow>
        <TitleRow>
          <Title>{title}</Title>
          <Price>${price}</Price>
        </TitleRow>
        <DetailRow>
          <ButtonContent>
            <ButtonQuantity
              allowed={count === 1}
              disabled={count === 1}
              onClick={() => setCount((c) => (c > 1 ? c - 1 : 1))}
            >
              -
            </ButtonQuantity>
            <span>Count: {count}</span>
            <ButtonQuantity onClick={() => setCount((c) => c + 1)}>
              +
            </ButtonQuantity>
          </ButtonContent>
          <Remove onClick={remove}>
            <HiTrash></HiTrash>
          </Remove>
        </DetailRow>
      </TextRow>
    </Roww>
  );
}

export { CartElement };
