import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../../services/apiProduct"; // Ensure this path is correct
import toast from "react-hot-toast";

function useDeleteProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("deleting product with success");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  return mutation;
}

export default useDeleteProduct;
