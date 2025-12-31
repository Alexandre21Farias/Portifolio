import { useIntersectionObserver } from "/src/hooks/useIntersectionObserver";
import styles from "./styles.module.css";

export default function AboutMe() {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.8,
    once: true,
  });

  return (
    <section ref={ref} className={styles.AboutMe}>
      <span>
        <h1 className={`${styles.title} ${isVisible ? styles.showTitle : ""}`}>
          ABOUT ME
        </h1>

        <h2>
          Anyone can write code, but being a good programmer requires
          discipline, and I like that.
        </h2>
      </span>
    </section>
  );
}
