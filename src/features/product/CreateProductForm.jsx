import styled from "styled-components";

import Input from "../../components/Input";
import Form from "../../components/Form";
import FileInput from "../../components/FileInput";
import Button from "../../components/Button";
// import FileInput from "../components/FileInput";
// import Textarea from "../components/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProduct";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`; /*eslint-disable*/
function CreateProductForm({ addProduct, productToEdit = {}, onClose }) {
  const { id, ...other } = productToEdit;
  const isEdit = id ? true : false;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEdit ? productToEdit : {},
  });
  const queryClient = useQueryClient();
  const { mutate: createProduct, isLoading: isCreating } = useMutation({
    mutationFn: createEditProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("succefully creating new product");
    },
    onError: (error) => console.log(error),
  });
  const { mutate: editProduct, isLoading: isEditing } = useMutation({
    mutationFn: ({ editedData, id }) => createEditProduct(editedData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("successfully editing");
    },
  });
  function submit(data) {
    const image = typeof data.photo === "string" ? data.photo : data.photo[0];
    if (isEdit) {
      editProduct({ editedData: { ...data, image }, id });
    } else {
      createProduct({ ...data, image });
    }
    // console.log(data);
  }
  function onError(errors) {
    console.log(errors);
  }
  const { errors } = formState;
  return (
    <Form onSubmit={handleSubmit(submit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="category">category</Label>
        <Input
          type="text"
          id="category"
          {...register("category", {
            required: "this field is required",
          })}
        />
        {errors?.category?.message && <Error>{errors.category.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "this field is required",
            validate: (value) =>
              value > 0 || "the price must be greater than 0",
          })}
        />
        {errors?.price?.message && <Error>{errors.price.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="reference">reference</Label>
        <Input
          type="text"
          id="reference"
          {...register("reference", {
            required: "this field is required",
          })}
        />
        {errors?.reference?.message && (
          <Error>{errors.reference.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <FileInput
          id="photo"
          accept="image/*"
          {...register("photo", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button>{isEdit ? "edit Product" : "create Product"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
