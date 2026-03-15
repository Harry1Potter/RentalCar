import Link from "next/link";
import css from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={css.heroContainer}>
        <h1 className={css.heroTitle}>Find your perfect rental car</h1>
        <h2 className={css.heroText}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link href="/catalog" className={css.heroButton}>
          View Catalog
        </Link>
      </div>
    </main>
  );
}
