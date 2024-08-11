const API_URL = "http://127.0.0.1:8000/api/";
// const MEDIA_URL = "http://127.0.0.1:8000/media/";
export async function getProduct(filters) {
  let { category, name } = filters || {};
  if (category === "all") {
    category = "";
  }

  const queryParams = new URLSearchParams({ category, name });
  const res = await fetch(`${API_URL}product?${queryParams.toString()}`);

  if (!res.ok) throw Error("failed to fetch ");
  const data = await res.json();
  return data;
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}product/${id}`, {
    method: "DELETE",
    headers: {
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
  // const hasImagePath = newProduct.image?.startsWith?.(MEDIA_URL);
  const productData = newProduct.data ? newProduct.data : newProduct;

  const formData = new FormData();

  formData.append("name", productData.name);

  formData.append("category", productData.category);
  formData.append("price", productData.price);
  formData.append("reference", productData.reference);
  console.log(productData);

  if (productData.image) {
    formData.append("photo", productData.image[0]);
  }

  let response;
  if (!id) {
    formData.append("photo", productData.image[0]);

    response = await fetch(`${API_URL}product`, {
      method: "POST",
      body: formData,
    });
  } else {
    formData.append("photo", productData.image);
    response = await fetch(`${API_URL}product/${id}`, {
      method: "PUT",
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
