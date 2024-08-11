import styled from "styled-components";
import { useState } from "react";

// import CreateCabinForm from "./CreateCabinForm";
// import { useDeleteCabin } from "./useDeleteCabin";
// import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
// import { useCreateCabin } from "./useCreateCabin";
/* eslint-disable */
import CreateProductForm from "./CreateProductForm";
import Table from "../../components/Table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../services/apiProduct";
import useDeleteProduct from "./useDeleteProduct";
// import EditProduct from "./editProduct";
import Modal from "../../components/Modal";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function ProductRow({ product }) {
  const [showForm, setShowForm] = useState(false);
  const { mutate, isLoading, error } = useDeleteProduct();
  const { id, name, category, price, reference, photo } = product;
  return (
    <>
      <Table.Row>
        <Img src={photo} />
        <Cabin>{name}</Cabin>
        <div>{reference} </div>
        <Price>{price}</Price>
        <Discount>{category}</Discount>
        <div>
          <button>
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open>
              <button onClick={() => setShowForm((form) => !form)}>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window>
              <CreateProductForm productToEdit={product} />
            </Modal.Window>
          </Modal>
          <button disabled={isLoading} onClick={() => mutate(id)}>
            <HiTrash />
          </button>
        </div>
      </Table.Row>
    </>
  );
}

export default ProductRow;
