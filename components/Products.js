import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaSearch, FaTrash, FaUserCircle, FaTimes, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import DeleteMultipleModal from "../components/DeleteMultipleModal";

import { fetchProducts } from "../store/slice/productsSlice";

import styles from "../styles/products.module.css";

function Products() {
  const dispatch = useDispatch();
  const router = useRouter();

  const productsState = useSelector((state) => state.products);
  const { products = [], loading, error } = productsState;
  const authState = useSelector((state) => state.auth);
  
  const { user, token } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteMultipleModal, setShowDeleteMultipleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name &&
        product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredProducts, currentPage]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(product => product.id));
    }
  };

  const exitSelectMode = () => {
    setIsSelectMode(false);
    setSelectedProducts([]);
  };

  if (loading) return <p> در حال بارگزاری ... </p>;
  if (error) return <p> خطا : {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="جستجو کالا"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userDivider}></div>
          <FaUserCircle />
          <span>
            <h3>{user?.username}</h3>
            <h4>{user?.role}</h4>
          </span>
        </div>
      </div>
      
      {isSelectMode ? (
        <div className={styles.selectModeBar}>
          <div className={styles.selectModeInfo}>
            <span>{selectedProducts.length} محصول انتخاب شده</span>
            <button 
              onClick={exitSelectMode}
              className={styles.cancelSelectMode}
            >
              <FaTimes /> انصراف
            </button>
          </div>
          <div className={styles.selectModeActions}>
            <button 
              onClick={() => setShowDeleteMultipleModal(true)}
              disabled={selectedProducts.length === 0}
              className={styles.deleteSelectedBtn}
            >
              <FaTrash /> حذف انتخاب شده‌ها
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.actionBar}>
          <div>
            <FaEdit />
            <h2>مدیریت کالا</h2>
          </div>
          <div className={styles.actionButtons}>
            <button 
              onClick={() => setIsSelectMode(true)}
              className={styles.selectModeBtn}
            >
              انتخاب چندتایی
            </button>
            <button onClick={() => setShowAddModal(true)}>افزودن محصول</button>
          </div>
        </div>
      )}
      
      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}
      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
      {showDeleteModal && selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showDeleteMultipleModal && (
        <DeleteMultipleModal
          productIds={selectedProducts}
          onClose={() => {
            setShowDeleteMultipleModal(false);
            setSelectedProducts([]);
            setIsSelectMode(false);
          }}
        />
      )}
      
      <table className={styles.table}>
        <thead>
          <tr>
            {isSelectMode && (
              <th className={styles.checkboxColumn}>
                <input
                  type="checkbox"
                  checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                  onChange={toggleSelectAll}
                  indeterminate={selectedProducts.length > 0 && selectedProducts.length < paginatedProducts.length ? "true" : "false"}
                />
              </th>
            )}
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه</th>
            {!isSelectMode && <th>عملیات</th>}
          </tr>
        </thead>

        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id} className={selectedProducts.includes(product.id) ? styles.selectedRow : ""}>
              {isSelectMode && (
                <td className={styles.checkboxColumn}>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                  />
                </td>
              )}
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price.toLocaleString()} تومان </td>
              <td className={styles.idCell}>{product.id.slice(0, 8)}...</td>
              {!isSelectMode && (
                <td>
                  <FaEdit
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowEditModal(true);
                    }}
                  />
                  <FaTrash
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDeleteModal(true);
                    }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {filteredProducts.length > 0 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <div
              key={page}
              className={`${styles.pageNumber} ${
                page === currentPage ? styles.active : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className={styles.emptyState}>
          <p>هیچ محصولی یافت نشد</p>
          <button
            className={styles.addBtn}
            onClick={() => setShowAddModal(true)}
          >
            افزودن اولین محصول
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;