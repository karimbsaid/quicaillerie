const API_URL = "http://127.0.0.1:8000/api/";
import { jwtDecode } from "jwt-decode";

export async function createEditUserInformation({
  userInformation,
  access,
  isEdit,
}) {
  try {
    const user = jwtDecode(access);
    const { user_id } = user;
    let response;
    if (!isEdit) {
      response = await fetch(`${API_URL}profile/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + String(access),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInformation), // Convert bagItems to JSON string
      });
    } else {
      console.log(userInformation, user_id);
      response = await fetch(`${API_URL}profile/${user_id}/`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + String(access),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInformation), // Convert bagItems to JSON string
      });
    }
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error creating command");
    }

    return data;
  } catch (error) {
    console.error("Error creating command:", error);
    throw error;
  }
}

export async function getUserInformation(access) {
  const response = await fetch(`${API_URL}profile/`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + String(access),
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  const isProfileComplete =
    Array.isArray(data) && data.length > 0 && Object.keys(data[0]).length === 3;

  return { data, isProfileComplete };
}
