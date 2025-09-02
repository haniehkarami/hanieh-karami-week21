import { useState } from "react";
import { FaTimes, FaTrash, FaExclamationCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteMultipleProducts } from "../store/slice/productsSlice";

import styles from "./DeleteMultipleModal.module.css";

function DeleteMultipleModal({ productIds, onClose }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    dispatch(deleteMultipleProducts(productIds))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting products:", error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBox}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        
        <div className={styles.modalBody}>
          <FaExclamationCircle className={styles.deleteWarning} />
          <p className={styles.modalText}>آیا از حذف {productIds.length} محصول انتخاب شده مطمئن هستید؟</p>
          <p className={styles.warningText}>
            این عمل قابل بازگشت نیست و محصولات به طور دائمی حذف خواهند شد.
          </p>
        </div>
        
        <div className={styles.modalFooter}>
          <button
            onClick={onClose}
            className={`${styles.modalButton} ${styles.cancelButton}`}
            disabled={isDeleting}
          >
            انصراف
          </button>
          <button
            onClick={handleDelete}
            className={`${styles.modalButton} ${styles.deleteButton}`}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className={styles.loadingSpinner}></span>
                در حال حذف...
              </>
            ) : (
              <>
                <FaTrash /> حذف محصولات
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMultipleModal;