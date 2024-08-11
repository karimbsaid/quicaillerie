import styled from "styled-components";
import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import GlobalStyles from "../../styles/GlobalStyles";
import {
  createEditUserInformation,
  getUserInformation,
} from "../../services/apiUserProfile";
import AuthContext from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
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
`;

function ManageUsers() {
  const { authTokens } = useContext(AuthContext);
  const { access } = authTokens;
  const [isEdit, setEdit] = useState(false);
  const { user } = useContext(AuthContext);
  const { username } = user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur", // corrected mode value
  });

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchUserData() {
      try {
        const { data, isProfileComplete } = await getUserInformation(access);

        if (isProfileComplete) {
          setEdit(true);
          setUserData(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [access, setEdit]);

  useEffect(() => {
    setValue("username", username);
    if (isEdit) {
      setValue("city", userData.city);
      setValue("postalCart", userData.postalCart);
      setValue("phone_number", userData.phone_number);
    }
  }, [userData, setValue, isEdit, username]);

  function submit(userInformation) {
    setLoading(true);
    createEditUserInformation({ userInformation, access, isEdit });
    setLoading(false);
    toast.success("succefully managing profile");
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <GlobalStyles />
      <Form onSubmit={handleSubmit(submit, onError)}>
        <FormRow>
          <Label htmlFor="username">Username</Label>
          <Input
            disabled={true}
            type="text"
            id="username"
            {...register("username", {
              required: "This field is required",
            })}
          />
          {errors.username && <Error>{errors.username.message}</Error>}
        </FormRow>
        <hr />
        <h1>User Details</h1>
        <FormRow>
          <Label htmlFor="city">City</Label>
          <Input
            disabled={loading}
            type="text"
            id="city"
            {...register("city", {
              required: "This field is required",
            })}
          />
          {errors.city && <Error>{errors.city.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="postalCart">Postal Card</Label>
          <Input
            disabled={loading}
            type="number"
            id="postalCart"
            {...register("postalCart", {
              required: "This field is required",
            })}
          />
          {errors.postalCart && <Error>{errors.postalCart.message}</Error>}
        </FormRow>
        <FormRow>
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            disabled={loading}
            type="number"
            id="phone_number"
            {...register("phone_number", {
              required: "This field is required",
            })}
          />
          {errors.phone_number && <Error>{errors.phone_number.message}</Error>}
        </FormRow>
        <hr />
        <FormRow>
          {/* 'type' is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={loading} type="submit">
            Submit
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default ManageUsers;
