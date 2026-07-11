import { useEffect, useState } from "react";
import styles from "./HelloLoading.module.css";

const GREETINGS = ["HELLO", "OLÁ", "WELCOME", "INITIALIZING"];

export default function HelloLoading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 350);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.textGlow}>{GREETINGS[index]}...</div>
      <div className={styles.spinner}></div>
    </div>
  );
}
