import { useState } from "react";
import styles from "./styles.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaDownload,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function HelloComponent({ language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className={styles.Hero}>
      {/* Header bar */}
      <header className={styles.Header}>
        <div className={styles.Brand}>© Code by Alex</div>
        <div className={styles.StatusIndicator}>
          <div className={styles.GreenDot} />
          <span>{language === "en" ? "Available for remote work" : "Disponível para trabalho remoto"}</span>
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          className={styles.HamburgerBtn} 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`${styles.NavLinks} ${menuOpen ? styles.NavLinksActive : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            {language === "en" ? "About" : "Sobre"}
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            {language === "en" ? "Work" : "Projetos"}
          </a>

          {/* Language selector block inside the hamburger drawer / desktop header */}
          <div className={styles.LanguageSection}>
            <div className={styles.LanguageButtons}>
              <button 
                className={`${styles.LangBtn} ${language === "pt" ? styles.LangBtnActive : ""}`} 
                onClick={() => setLanguage("pt")}
              >
                PT-BR
              </button>
              <button 
                className={`${styles.LangBtn} ${language === "en" ? styles.LangBtnActive : ""}`} 
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content in the center */}
      <div className={styles.MainHeroContent}>
        <div className={styles.Introduction}>
          <span className={styles.SubTitle}>
            {language === "en" ? "Hello, I am" : "Olá, eu sou"}
          </span>
          <h1 className={styles.Title}>
            Alexandre <span className={styles.TitleHighlight}>Farias</span>
          </h1>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "400", color: "var(--text-secondary)", margin: "1rem 0 0 0" }}>
            {language === "en" ? "Full-Stack Developer based in Brazil" : "Desenvolvedor Full-Stack no Brasil"}
          </h2>
        </div>

        <div className={styles.ContactWrapper}>
          <div className={styles.SocialIcons}>
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

          <a href="/CurriculoAlexandre.pdf" download style={{ textDecoration: "none" }}>
            <button className={styles.DownloadBtn}>
              <FaDownload size={14} /> {language === "en" ? "Download CV" : "Baixar CV"}
            </button>
          </a>
        </div>
      </div>

      <div className={styles.DividerContainer}>
        <span className={styles.DividerText}>
          Alexandre Farias <span style={{ color: "var(--orange-light)" }}>→</span> Full-Stack Developer
        </span>
      </div>
    </section>
  );
}
