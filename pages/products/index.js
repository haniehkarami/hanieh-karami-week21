import Products from "@/components/Products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

function ProductsPage() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#2563eb" loading={loading} />
      </div>
    );
  }

  return <Products />;
}

export default ProductsPage;
