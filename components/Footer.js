import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { Button } from "@mui/material";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Link href="/">
          <Button variant="text" startIcon={<HomeIcon />}>
            Home
          </Button>
        </Link>
        <span>
          Made with{" "}
          <img
            src="/netliheart.svg"
            alt="Netlify Logo"
            className={styles.logo}
          />{" "}
          for you
        </span>
      </footer>
    </>
  );
}
