import { useIntersectionObserver } from "/src/hooks/useIntersectionObserver.js";
import styles from "./styles.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaDownload,
  FaFilePdf,
  FaFileAlt,
} from "react-icons/fa";

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
            <span style={{ color: "var(--orange-light)" }}>
              Alexandre Farias
            </span>
          </h1>

          <h1>
            a <span style={{ color: "var(--orange-light)" }}>Full-Stack</span>{" "}
            developer.
          </h1>
        </span>

        <div
          className={`${styles.contact} ${isVisible ? styles.showContact : ""}`}
        >
          <div className={styles.icons}>
            <a
              href="https://github.com/Alexandre21Farias"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/alexandre-farias-774420206/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.instagram.com/alex_xyz21/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a href="mailto:alexandre21farias@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
          <a href="/Alexandre_Farias_CV.pdf" download className="btn-cv">
            <button>
              <FaDownload size={14} /> Dowload CV
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
