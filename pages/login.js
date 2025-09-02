import Link from "next/link";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../store/slice/authSlice";

import styles from "../styles/Form.module.css";



function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        toast.success("ورود موفقیت آمیز بود");
        router.push("/products");
      })
      .catch((error) => {
        toast.error(error || "خطا در ورود");
      });
  };
  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h2>فرم ورود</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username", { required: "نام کاربری الزامی است" })}
          />
          <div className={styles.errorContainer}>
            {errors.username && (
              <span className={styles.error}>{errors.username.message}</span>
            )}
          </div>
          <input
            type="password"
            placeholder=" رمز عبور"
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل 5=6 کاراکتر باشد",
              },
            })}
          />
          <div className={styles.errorContainer}>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "در حال ارسال" : " ورود"}
          </button>
        </form>
        <p>
          <Link href="/register" className={styles.link}>
            ایجاد حساب کاربری{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
