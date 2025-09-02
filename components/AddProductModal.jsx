import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addProduct, fetchProducts } from "../store/slice/productsSlice";

import styles from "./Modal.module.css";

function AddProductModal({ onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) {
      toast.error("لطفا همه فیلدها را کامل کنید");
      return;
    }
    try {
      await dispatch(
        addProduct({
          name,
          price,
          quantity,
        })
      ).unwrap();

      toast.success("محصول با موفقیت ثبت شد");

      dispatch(fetchProducts());
      onClose();
    } catch (error) {
      toast.error(error || "خطا در ثبت محصول");
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBox}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h3 className={styles.modalText}>ایجاد محصول جدید</h3>
        <form onSubmit={handleSubmit}>
          <p>نام کالا</p>
          <input
            type="text"
            placeholder="نام کالا"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.modalInput}
          />
          <p>تعداد موجودی</p>
          <input
            type="number"
            placeholder="تعداد"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={styles.modalInput}
          />
          <p>قیمت</p>
          <input
            type="number"
            placeholder="قیمت"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.modalInput}
          />
          <div className={styles.modalActions}>
            <button type="submit" className={`${styles.modalButton} ${styles.submitButton}`}>
              ایجاد
            </button>
            <button type="button" onClick={onClose} className={`${styles.modalButton} ${styles.cancelButton}`}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
