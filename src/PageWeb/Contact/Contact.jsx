import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import {
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaRegCopy,
  FaCheck,
} from "react-icons/fa";
import styles from "./styles.module.css";

const EMAIL = "alexandre21farias@gmail.com";
const GITHUB = "https://github.com/Alexandre21Farias";
const LINKEDIN = "https://www.linkedin.com/in/alexandre-farias-774420206/";

// Answers come from the CV; each answer is a list of bubbles.
// Messages store indexes so the thread re-translates with the language switch.
const QUESTIONS = [
  {
    en: {
      q: "What do you build?",
      a: [
        "Full-stack web apps, from the screen people click to the API and database behind it.",
        "React and Next.js on the front, Node.js and REST APIs on the back, PostgreSQL and Supabase for data. Tested with Jest, shipped with Git, Docker and CI/CD.",
      ],
    },
    pt: {
      q: "O que você constrói?",
      a: [
        "Aplicações web full-stack, da tela que a pessoa clica até a API e o banco de dados por trás.",
        "React e Next.js no front, Node.js e APIs REST no back, PostgreSQL e Supabase nos dados. Testes com Jest, entrega com Git, Docker e CI/CD.",
      ],
    },
  },
  {
    en: {
      q: "Where have you worked?",
      a: [
        "My first job was at Nimbus.dev, where I spent six months coding every day. That's where I really learned JavaScript, HTML and CSS and grew into a full-stack developer.",
        "There I built part of the company's REST API and had my first contact with React, Postman and Insomnia.",
        "Then came Mivai (2025–2026), a multi-tenant SaaS that automates WhatsApp with AI. I worked on omnichannel chat interfaces, multi-agent AI pipelines, the campaign engine and integrations with n8n and WAHA.",
      ],
    },
    pt: {
      q: "Onde você já trabalhou?",
      a: [
        "Meu primeiro emprego foi na Nimbus.dev, onde passei seis meses programando todos os dias. Foi lá que aprendi de verdade JavaScript, HTML e CSS e me desenvolvi como full-stack.",
        "Criei parte da API REST da empresa e tive meu primeiro contato com React, Postman e Insomnia.",
        "Depois veio a Mivai (2025–2026), um SaaS multi-tenant que automatiza o WhatsApp com IA. Trabalhei nas interfaces de chat omnichannel, nos pipelines de IA multiagente, no motor de campanhas e nas integrações com n8n e WAHA.",
      ],
    },
  },
  {
    en: {
      q: "How do you use AI?",
      a: [
        "As an assistant, not an autopilot. AI helps me move faster, but I don't ship code I haven't read and understood.",
        "The decisions stay with me: architecture, trade-offs and review. AI handles the repetitive parts, explores options and catches what I might miss.",
        "Day to day that means Claude Code with subagents, custom skills and file-based memory, plus n8n for automations.",
      ],
    },
    pt: {
      q: "Como você usa IA?",
      a: [
        "Como assistente, não como piloto automático. A IA me ajuda a ir mais rápido, mas eu não entrego código que não li e não entendi.",
        "As decisões ficam comigo: arquitetura, escolhas e revisão. A IA cuida das partes repetitivas, explora alternativas e aponta o que eu poderia deixar passar.",
        "No dia a dia isso é Claude Code com subagents, skills próprias e memória em arquivos, além de n8n para automações.",
      ],
    },
  },
  {
    en: {
      q: "Are you available?",
      a: [`Yes, for remote work. The fastest way to reach me is ${EMAIL}.`],
    },
    pt: {
      q: "Você está disponível?",
      a: [
        `Sim, para trabalho remoto. O jeito mais rápido de falar comigo é ${EMAIL}.`,
      ],
    },
  },
];

export default function Contact({ language }) {
  const [asked, setAsked] = useState([]);
  const [copied, setCopied] = useState(false);
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.15,
    once: true,
  });
  const en = language === "en";
  const chat = useRef(null);
  const thread = useRef(null);

  // Follow the conversation: keep the whole new exchange and the reply buttons in view on any screen.
  // Bubbles are laid out at full height from the start (only their fade is delayed), so one scroll is enough.
  useEffect(() => {
    if (!asked.length) return;
    const vh = window.visualViewport?.height ?? window.innerHeight;
    const bottom =
      chat.current.getBoundingClientRect().bottom + window.scrollY + 32 - vh;
    const question =
      thread.current.lastElementChild.getBoundingClientRect().top +
      window.scrollY -
      24;
    // a long answer on a short screen: never push the question itself off the top
    window.scrollTo({
      top: Math.max(0, Math.min(bottom, question)),
      behavior: "smooth",
    });
  }, [asked]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the mailto link below still works
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`${styles.Contact} ${isVisible ? styles.revealActive : ""}`}
    >
      <h2 className={styles.title}>{en ? "Let's talk" : "Vamos conversar"}</h2>

      <div className={styles.layout}>
        <div className={styles.chat} ref={chat}>
          <div className={styles.thread} ref={thread} aria-live="polite">
            <p className={`${styles.bubble} ${styles.me}`}>
              {en
                ? "Hi! I'm Alexandre. Pick a question."
                : "Oi! Eu sou o Alexandre. Escolha uma pergunta."}
            </p>
            {asked.map((i) => {
              const { q, a } = QUESTIONS[i][language];
              return (
                <div key={i} className={styles.pair}>
                  <p className={`${styles.bubble} ${styles.you}`}>{q}</p>
                  {a.map((text, j) => (
                    <p
                      key={j}
                      className={`${styles.bubble} ${styles.me}`}
                      style={{ "--j": j }}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>

          <div className={styles.replies}>
            {QUESTIONS.map((q, i) =>
              asked.includes(i) ? null : (
                <button
                  key={i}
                  className={styles.reply}
                  onClick={() => setAsked([...asked, i])}
                >
                  {q[language].q}
                </button>
              ),
            )}
          </div>
        </div>

        <aside
          className={styles.card}
          aria-label={en ? "Direct contact" : "Contato direto"}
        >
          <h3 className={styles.cardTitle}>
            {en ? "Prefer a direct line?" : "Prefere falar direto?"}
          </h3>
          <p className={styles.cardText}>
            {en
              ? "Usually replies within a day."
              : "Costumo responder em até um dia."}
          </p>

          <div className={styles.cardRow}>
            <a href={`mailto:${EMAIL}`} className={styles.cardLink}>
              {EMAIL}
            </a>
            <button
              type="button"
              className={styles.copy}
              onClick={copyEmail}
              aria-label={en ? "Copy email" : "Copiar e-mail"}
            >
              {copied ? <FaCheck /> : <FaRegCopy />}
            </button>
          </div>
          <span className={styles.copied} role="status">
            {copied ? (en ? "Copied" : "Copiado") : ""}
          </span>

          <div className={styles.cardLinks}>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href="/CurriculoAlexandre.pdf" download>
              <FaDownload /> {en ? "Download CV" : "Baixar CV"}
            </a>
          </div>
        </aside>
      </div>

      <a href={`mailto:${EMAIL}`} className={styles.email}>
        {EMAIL}
      </a>

      <footer className={styles.footer}>
        <span>
          © {new Date().getFullYear()} Alexandre Farias ·{" "}
          {en ? "Designed & coded by me" : "Design e código por mim"}
        </span>
        {/* Gon's number in the Hunter Exam */}
        <span>
          {en ? "Hunter Exam No. 405" : "Exame Hunter nº 405"} · Feira de
          Santana, BA
        </span>
      </footer>
    </section>
  );
}
