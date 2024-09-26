import styles from "./page.module.css";
import { SVG } from "./components/SVG";

export default function Home() {
  return (
    <div className={styles.page}>
      <SVG />
    </div>
  );
}
