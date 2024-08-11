const API_URL = "http://127.0.0.1:8000/api/";
// const MEDIA_URL = "http://127.0.0.1:8000/media/";
export async function getProduct({ category, search, page = 1 }) {
  if (category === "all") {
    category = "";
  }

  const queryParams = new URLSearchParams({ category, search, page });
  const res = await fetch(`${API_URL}product?${queryParams.toString()}`);

  if (!res.ok) throw Error("failed to fetch ");
  const data = await res.json();
  return data;
}

export async function deleteProduct(id) {
  const { access } = JSON.parse(localStorage.getItem("authTokens"));
  const response = await fetch(`${API_URL}product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + String(access),

      "Content-Type": "application/json",
    },
  });

  if (response.status === 204) {
    // Return an empty object or success message
    return { success: true };
  } else {
    // If response is not 204, throw an error
    throw new Error("Network response was not ok");
  }
}

export async function createEditProduct(newProduct, id) {
  const { access } = JSON.parse(localStorage.getItem("authTokens"));
  // const hasImagePath = newProduct.image?.startsWith?.(MEDIA_URL);
  const productData = newProduct;

  const formData = new FormData();

  formData.append("name", productData.name);

  formData.append("category", productData.category);
  formData.append("price", productData.price);
  formData.append("reference", productData.reference);

  if (productData.image && !(typeof productData.image === "string")) {
    formData.append("photo", productData.image);
  }

  let response;
  if (!id) {
    response = await fetch(`${API_URL}product`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + String(access),
      },
      body: formData,
    });
  } else {
    response = await fetch(`${API_URL}product/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + String(access),
      },
      body: formData,
    });
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Network response was not ok: ${response.statusText} - ${JSON.stringify(
        errorData
      )}`
    );
  }

  return response.json();
}
