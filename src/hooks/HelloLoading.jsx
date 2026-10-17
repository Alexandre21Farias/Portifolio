import { useEffect, useState } from "react";
import styles from "./HelloLoading.module.css";

// Gon's Jajanken: "Jan... Ken..." and instead of the punch, a hello
const GREETINGS = ["Jan…", "Ken…", "Hello!"];

export default function HelloLoading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => Math.min(prev + 1, GREETINGS.length - 1));
    }, 320);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.loadingContainer} aria-hidden="true">
      {/* key remounts the word so each one plays its own entrance */}
      <div key={index} className={styles.word}>
        {GREETINGS[index]}
      </div>
    </div>
  );
}
