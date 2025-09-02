import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slice/authSlice";
import Link from "next/link";

import styles from "../styles/Form.module.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        toast.success("ثبت نام با موفقیت انجام شد");
        router.push("/products");
      })
      .catch((error) => {
        toast.error(error || "خطا در ثبت نام");
      });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h2>فرم ثبت نام</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username", { required: "نام کاربری الزامی است" })}
          />
          <div className={styles.errorContainer}>
            <span>{errors.username && <p>{errors.username.message}</p>}</span>
          </div>
          <input
            type="password"
            placeholder="رمز عبور"
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل 6 کاراکتر باشد",
              },
            })}
          />
          <div className={styles.errorContainer}>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          <input
            type="password"
            placeholder="تکرار رمز عبور"
            {...register("confirmPassword", {
              required: " تکرار رمز عبور الزامی است",
              validate: (value) =>
                value === watch("password") || " رمز عبور مطابقت ندارد",
            })}
          />
          <div className={styles.errorContainer}>
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "در حال ارسال" : "ثبت نام"}
          </button>
        </form>
        <p className={styles.error}>
          <Link href="/login" className={styles.link}>
            حساب کاربری دارید؟
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
