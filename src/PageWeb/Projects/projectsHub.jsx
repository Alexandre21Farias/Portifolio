import { FaArrowRight } from "react-icons/fa";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import styles from "./styles.module.css";

// 3D tilt toward the cursor; values go to CSS vars so React never re-renders on mousemove
function tilt(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width; // 0..1
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
}

function untilt(e) {
  for (const prop of ["--rx", "--ry", "--mx", "--my"]) e.currentTarget.style.removeProperty(prop);
}

const tiltHandlers = { onMouseMove: tilt, onMouseLeave: untilt };

export default function ProjectsHub({ language }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, once: true });
  const en = language === "en";

  const featured = {
    title: "Open Bahia",
    category: en ? "Developer forum & community" : "Fórum e comunidade de desenvolvedores",
    desc: en
      ? "My main project: an open-source forum where developers from Bahia ask questions, share what they're building and find each other."
      : "Meu projeto principal: um fórum open source onde desenvolvedores da Bahia tiram dúvidas, mostram o que estão construindo e se encontram.",
    year: "2026",
    url: "https://bahiaopensource.com.br/",
    preview: "/OpenBahia.webp",
  };

  // the rest, by resume weight: paid work first, then open source
  const experiences = [
    {
      title: "Mivai (Mivus)",
      category: en ? "WhatsApp AI automation platform" : "Plataforma de automação de WhatsApp com IA",
      desc: en
        ? "A platform where AI agents answer customers on WhatsApp, for many companies at once."
        : "Uma plataforma onde agentes de IA atendem clientes no WhatsApp, para várias empresas ao mesmo tempo.",
      year: "2025 – 2026",
      url: "https://painel.mivus.com.br/login",
      stack: "TypeScript · Next.js · Node.js · Supabase · n8n · WAHA",
    },
    {
      title: "Nimbus.dev",
      category: en ? "Full-stack developer" : "Desenvolvedor full-stack",
      desc: en
        ? "My first job: six months helping build the REST API behind the company's products."
        : "Meu primeiro emprego: seis meses ajudando a construir a API REST por trás dos produtos da empresa.",
      year: "2025",
      url: "https://nimbusdev.com.br/",
      stack: "JavaScript · Node.js · REST API · React",
    },
    {
      title: "TabNews Project",
      category: en ? "Open-source contributor" : "Contribuidor open source",
      desc: en
        ? "My own TabNews, built from scratch during curso.dev, from the database to the interface."
        : "Meu próprio TabNews, feito do zero no curso.dev, do banco de dados à interface.",
      year: "2025",
      url: "https://github.com/Alexandre21Farias/TabNewsAlex",
      stack: "Next.js · React",
    },
  ];

  return (
    <section id="projects" className={styles.ProjectsSection}>
      <header className={styles.head}>
        <h2 className={styles.title}>{en ? "Work & projects" : "Projetos & trabalhos"}</h2>
      </header>

      <div ref={ref} className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
        <article className={styles.featured} style={{ "--i": 0 }}>
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.featuredArt}
            aria-label={featured.title}
            {...tiltHandlers}
          >
            <img src={featured.preview} alt={en ? "Open Bahia forum homepage" : "Página inicial do fórum Open Bahia"} />
            <span className={styles.shine} aria-hidden="true" />
          </a>

          <div className={styles.featuredText}>
            <p className={styles.featuredMeta}>
              {featured.category} · {featured.year}
            </p>
            <h3 className={styles.featuredTitle}>{featured.title}</h3>
            <p className={styles.featuredDesc}>{featured.desc}</p>
            <a href={featured.url} target="_blank" rel="noopener noreferrer" className={styles.visit}>
              {en ? "Visit the site" : "Visitar o site"}
              <FaArrowRight className={styles.visitIcon} aria-hidden="true" />
            </a>
          </div>
        </article>

        <ul className={styles.list}>
          {experiences.map((exp, idx) => (
            <li key={exp.title} style={{ "--i": idx + 1 }}>
              <a href={exp.url} target="_blank" rel="noopener noreferrer" className={styles.row}>
                <h3 className={styles.rowTitle}>
                  {exp.title}
                  <FaArrowRight className={styles.arrow} aria-hidden="true" />
                </h3>

                <div className={styles.body}>
                  <p className={styles.rowDesc}>{exp.desc}</p>
                  <p className={styles.rowMeta}>
                    {exp.category} · {exp.year}
                  </p>
                  <p className={styles.rowMeta}>{exp.stack}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
