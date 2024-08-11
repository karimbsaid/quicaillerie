const API_URL = "http://127.0.0.1:8000/api/";

export async function generateFacture({ username, access }) {
  let user = username || "";
  const response = await fetch(`${API_URL}facture?username=${user}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + String(access),
    },
  });

  // Check if response is successful
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Extract filename from Content-Disposition header if needed
  const contentDisposition = response.headers.get("content-disposition");
  let filename = "facture.docx"; // Default filename
  if (contentDisposition) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }

  // Convert the blob response to a blob object
  const blob = await response.blob();

  // Create object URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Create a link element to trigger download
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  return { success: true }; // Return whatever makes sense for your application
}
