import { useIntersectionObserver } from "/src/hooks/useIntersectionObserver";
import styles from "./styles.module.css";

export default function HalloComponent() {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.8,
  });
  console.log(isVisible);
  return (
    <section className={styles.ApresentationContainer}>
      <span className={styles.CopyrightLogo}>
        <h3>© Made by Alex</h3>
      </span>

      <div ref={ref} className={styles.container}>
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
