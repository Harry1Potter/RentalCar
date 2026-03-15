"use client"

import Link from "next/link";
import { Logo } from "../Sprite/Sprite";
import { usePathname } from "next/navigation";
import css from "./header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <nav className={css.header}>
        <Link className={css.headerLogo} href="/">
          <Logo />
        </Link>

        <div>
          <ul className={css.headerlist}>
            <li>
              <Link
                className={`${css.headerlink} ${
                  pathname === "/" ? css.active : ""
                }`}
                href="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className={`${css.headerlink} ${
                  pathname === "/catalog" ? css.active : ""
                }`}
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
