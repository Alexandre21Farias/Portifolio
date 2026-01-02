import { useIntersectionObserver } from "/src/hooks/useIntersectionObserver.js";
import styles from "./styles.module.css";

export default function HalloComponent() {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 1,
  });
  console.log(isVisible);
  return (
    <section ref={ref} className={styles.ApresentationContainer}>
      <span className={styles.CopyrightLogo}>
        <h3>© Made by Alex</h3>
      </span>

      <div
        className={`${styles.container} ${
          isVisible ? styles.containerShifted : ""
        }`}
      >
        <span className={styles.Greeting}>
          <h1>
            Hi, i am{" "}
            <span style={{ color: "var(--text-muted)" }}>Alexandre F.</span>
          </h1>

          <h1>
            a <span style={{ color: "var(--text-muted)" }}>Full-Stack</span>{" "}
            developer.
          </h1>
        </span>

        <div
          className={`${styles.contact} ${isVisible ? styles.showContact : ""}`}
        >
          <span>
            <h1>TESTE</h1>
          </span>
        </div>
      </div>
    </section>
  );
}
