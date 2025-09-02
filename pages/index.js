import Link from "next/link";
import {
  FaWarehouse,
  FaBoxes,
  FaChartLine,
  FaUsers,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <FaWarehouse className={styles.titleIcon} />
            سامانه مدیریت انبار
          </h1>
          <p className={styles.subtitle}>
            مدیریت هوشمند محصولات، موجودی و انبار با قابلیت‌های پیشرفته
          </p>
          <div className={styles.heroButtons}>
            <Link href="/login" className={styles.primaryButton}>
              <FaSignInAlt />
              ورود به سیستم
            </Link>
            <Link href="/register" className={styles.secondaryButton}>
              <FaUserPlus />
              ثبت نام
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.animatedBox}></div>
        </div>
      </header>

      <section className={styles.features}>
        <h2>چرا سامانه مدیریت انبار ما؟</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <FaBoxes className={styles.featureIcon} />
            <h3>مدیریت محصولات</h3>
            <p>مدیریت کامل اطلاعات محصولات، موجودی و قیمت‌ها</p>
          </div>

          <div className={styles.featureCard}>
            <FaChartLine className={styles.featureIcon} />
            <h3>گزارشات دقیق</h3>
            <p>گزارشات تحلیلی و آماری از عملکرد انبار</p>
          </div>

          <div className={styles.featureCard}>
            <FaUsers className={styles.featureIcon} />
            <h3>مدیریت کاربران</h3>
            <p>سیستم احراز هویت امن با سطوح دسترسی مختلف</p>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>محصول مدیریت شده</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>99.9%</span>
            <span className={styles.statLabel}>uptime</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>کاربر فعال</span>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>همین امروز شروع کنید</h2>
          <p>به جمع کاربران راضی ما بپیوندید</p>
          <Link href="/register" className={styles.ctaButton}>
            شروع رایگان
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2024 سامانه مدیریت انبار. تمام حقوق محفوظ است.</p>
      </footer>
    </div>
  );
}

export default Home;
