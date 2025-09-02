import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts, deleteProduct } from "../store/slice/productsSlice";
import { IoIosWarning } from "react-icons/io";

import styles from "./Modal.module.css";

function DeleteProductModal({ product, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(product.id))
      .unwrap()
      .then(() => {
        toast.success(`"${product.name}" حذف شد`);
        dispatch(fetchProducts());
        onClose();
      })
      .catch(() => toast.error("خطا در حذف"));
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBox}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <IoIosWarning className={styles.deleteWarning} />
        <h3 className={styles.modalText}>آیا از حذف این محصول مطمِن هستید؟</h3>
        <div className={styles.modalActions}>
          <button
            onClick={handleDelete}
            className={`${styles.modalButton} ${styles.deleteButton}`}
          >
            حذف
          </button>
          <button
            onClick={onClose}
            className={`${styles.modalButton} ${styles.cancelButton}`}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
