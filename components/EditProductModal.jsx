import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import styles from "./Modal.module.css";
import { fetchProducts, updateProduct } from "../store/slice/productsSlice";

function EditProductModal({ product, onClose }) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !quantity || !price) {
      toast.error("لطفا همه فیلدها را کامل کنید");
      return;
    }
    try {
      await dispatch(
        updateProduct({
          id: product.id,
          data: { name, price: Number(price), quantity: Number(quantity) },
        })
      ).unwrap();

      toast.success("محصول با موفقیت ویرایش شد");

      dispatch(fetchProducts());
      onClose();
    } catch (error) {
      toast.error("خطا در ویرایش محصول");
      console.log(error);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBox}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h3 className={styles.modalText}>ویرایش اطلاعات</h3>
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
              ثبت اطلاعات جدید
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

export default EditProductModal;
