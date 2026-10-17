import { useState } from "react";
import styles from "./styles.module.css";
import Poster from "./Poster";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaDownload,
  FaBars,
  FaTimes,
} from "react-icons/fa";

// Bungee Gum: the link sticks to the cursor and stretches toward it, then snaps back elastically
function gumMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const dx = e.clientX - (r.left + r.width / 2);
  const dy = e.clientY - (r.top + r.height / 2);
  // the text only stretches so far; the gum band itself is not limited (gooMove)
  const lim = (v, max) => Math.max(-max, Math.min(max, v));
  el.style.setProperty("--gx", `${lim(dx * 0.45, r.width * 0.3)}px`);
  el.style.setProperty("--gy", `${lim(dy * 0.6, r.height * 0.3)}px`);
  el.style.setProperty("--gs", 1 + Math.min(Math.abs(dx) / r.width, 0.6) * 0.35);
}

function gumLeave(e) {
  for (const prop of ["--gx", "--gy", "--gs"]) e.currentTarget.style.removeProperty(prop);
}

const gum = { onMouseMove: gumMove, onMouseLeave: gumLeave };

// the gum pulled from the headline's anchor blob to the cursor: a thinning, sagging band
function gooMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const k = el.offsetWidth / r.width; // undo the gum's own scale
  // the gum starts at the tip of the first line's last letter
  const range = document.createRange();
  range.selectNodeContents(el.querySelector("h1"));
  const line = range.getClientRects()[0];
  const ax = (line.right - r.left) * k;
  const ay = (line.top + line.height / 2 - r.top) * k;
  const vx = (e.clientX - r.left) * k - ax;
  const vy = (e.clientY - r.top) * k - ay;
  const mx = ax + vx;
  const my = ay + vy;
  const len = Math.hypot(vx, vy);
  const d = `M${ax} ${ay}Q${(ax + mx) / 2} ${(ay + my) / 2 + len * 0.1} ${mx} ${my}`;
  const sw = Math.max(10, 26 - len * 0.04);
  for (const p of el.querySelectorAll("path")) {
    p.setAttribute("d", d);
    p.style.strokeWidth = sw;
  }
  el.style.setProperty("--mx", `${mx}px`);
  el.style.setProperty("--my", `${my}px`);
}

function gooLeave(e) {
  for (const p of e.currentTarget.querySelectorAll("path")) p.style.strokeWidth = 0;
}

// hold the headline and pull the gum as far as you like; letting go snaps everything back
const release = (e) => {
  const el = e.currentTarget;
  delete el.dataset.held;
  if (!el.matches(":hover")) (gumLeave(e), gooLeave(e));
};

const headGum = {
  onPointerDown: (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.dataset.held = "1";
    gumMove(e);
    gooMove(e);
  },
  onPointerMove: (e) => (gumMove(e), gooMove(e)),
  onPointerLeave: (e) => {
    if (!e.currentTarget.dataset.held) (gumLeave(e), gooLeave(e));
  },
  onPointerUp: release,
  onPointerCancel: release,
};

const facts = {
  en: [
    ["Based in", "Feira de Santana, BA"],
    ["Stack", "React · Next.js · Node.js"],
    ["Studying", "Computer Engineering, UNIFAN"],
  ],
  pt: [
    ["Baseado em", "Feira de Santana, BA"],
    ["Stack", "React · Next.js · Node.js"],
    ["Cursando", "Eng. da Computação, UNIFAN"],
  ],
};

export default function HelloComponent({ language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const en = language === "en";

  return (
    <section className={styles.Hero}>
      <header className={styles.Header}>
        <div className={styles.BrandSlot}>
          <a href="#" className={`${styles.Brand} ${styles.gum}`} {...gum}>
            Alexandre Farias
          </a>
        </div>
        <div className={styles.StatusIndicator}>
          <div className={styles.GreenDot} />
          <span>{en ? "Available for remote work" : "Disponível para trabalho remoto"}</span>
        </div>

        <button
          className={styles.HamburgerBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`${styles.NavLinks} ${menuOpen ? styles.NavLinksActive : ""}`}>
          <a href="#about" className={styles.gum} {...gum} onClick={() => setMenuOpen(false)}>
            {en ? "About" : "Sobre"}
          </a>
          <a href="#projects" className={styles.gum} {...gum} onClick={() => setMenuOpen(false)}>
            {en ? "Work" : "Projetos"}
          </a>
          <a href="#contact" className={styles.gum} {...gum} onClick={() => setMenuOpen(false)}>
            {en ? "Contact" : "Contato"}
          </a>

          <div className={styles.LanguageButtons}>
            <button
              className={`${styles.LangBtn} ${language === "pt" ? styles.LangBtnActive : ""}`}
              onClick={() => setLanguage("pt")}
              aria-pressed={language === "pt"}
            >
              PT
            </button>
            <button
              className={`${styles.LangBtn} ${language === "en" ? styles.LangBtnActive : ""}`}
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>
        </nav>
      </header>

      <div className={styles.Stage}>
        <div className={styles.Intro}>
          <div className={`${styles.HeadGum} ${styles.gum}`} {...headGum}>
            <svg className={styles.Goo} aria-hidden="true">
              <path />
              <path />
            </svg>
            <div className={styles.Cards} aria-hidden="true" />
            <div className={styles.Aces} aria-hidden="true">
              {[
                ["♥", -24, "0.2rem", "2rem", true],
                ["♠", -12, "1.7rem", "1.1rem", false],
                ["♦", -2, "3.2rem", "0.5rem", true],
                ["♣", 9, "4.7rem", "0rem", false],
              ].map(([suit, r, x, y, red], k) => (
                <span
                  key={suit}
                  className={styles.Card}
                  data-suit={suit}
                  data-red={red}
                  style={{ "--k": k, "--r": `${r}deg`, "--x": x, "--y": y }}
                >
                  A
                </span>
              ))}
            </div>
            <h1 className={`${styles.Headline} enter`} style={{ "--i": 1 }}>
              {en ? "Full-stack developer" : "Desenvolvedor full-stack"}
            </h1>
          </div>
          <p className={`${styles.Lead} enter`} style={{ "--i": 2 }}>
            {en
              ? "From Feira de Santana, Bahia. I build web apps with React, Next.js and Node.js."
              : "De Feira de Santana, Bahia. Construo aplicações web com React, Next.js e Node.js."}
          </p>
        </div>

        <div className={`${styles.PosterSlot} enter`} style={{ "--i": 2 }}>
          <Poster />
        </div>

        <dl className={`${styles.Facts} enter`} style={{ "--i": 3 }}>
          {facts[en ? "en" : "pt"].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.Bottom}>
        <div className={`${styles.Actions} enter`} style={{ "--i": 3 }}>
          <div className={styles.SocialIcons}>
            <a href="https://github.com/Alexandre21Farias" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
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
            <a href="https://www.instagram.com/alex_xyz21/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="mailto:alexandre21farias@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>

          <a href="/CurriculoAlexandre.pdf" download className={styles.DownloadBtn}>
            <FaDownload size={14} /> {en ? "Download CV" : "Baixar CV"}
          </a>
        </div>
      </div>
    </section>
  );
}
