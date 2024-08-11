const API_URL = "http://127.0.0.1:8000/api/";

export async function createCommand({ bagItems, access }) {
  try {
    const formattedBagItems = bagItems.map((item) => ({
      product_id: item.product,
      quantity: item.quantity,
    }));
    const response = await fetch(`${API_URL}commands/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + String(access),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedBagItems), // Convert bagItems to JSON string
    });
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
export async function getCommands(filter) {
  try {
    let { startDate, endDate, category, city } = filter;
    if (category === "all") category = "";
    const queryParams = new URLSearchParams({
      category,
      city,
      startDate,
      endDate,
    });

    const { access } = JSON.parse(localStorage.getItem("authTokens"));
    const response = await fetch(
      `${API_URL}commands/?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + String(access),
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
