// import { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import CreateProductForm from "./CreateProductForm";
export default function Addproduct() {
  return (
    <Modal>
      <Modal.Open opens="window">
        <Button>open</Button>
      </Modal.Open>
      <Modal.Window name="window">
        <CreateProductForm />
      </Modal.Window>
    </Modal>
  );
}

// export default function Addproduct() {
//   const [showForm, setShowForm] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setShowForm((form) => !form)}>add </Button>
//       {showForm && (
//         <Modal onClose={() => setShowForm(false)}>
//           <CreateProductForm onClose={() => setShowForm(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }
