import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import styles from "./styles.module.css";

export default function AboutMe({ language }) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.15,
    once: true,
  });

  const techSkills = [
    "Next.js 16 (App Router)",
    "React 19 & TypeScript",
    "Node.js & REST APIs",
    "Supabase & PostgreSQL",
    "WAHA (WhatsApp API)",
    "n8n Automation",
    "MUI & CSS Custom Properties",
    "Jest (Testing)",
  ];

  const softSkills = language === "en" 
    ? [
        "Team Leadership",
        "Customer Experience (CX)",
        "Operational Management",
        "Work Under Pressure",
        "Conflict Resolution",
        "Process Optimization (Scrum)",
      ]
    : [
        "Liderança de Equipe",
        "Experiência do Cliente (CX)",
        "Gestão Operacional",
        "Trabalho sob Pressão",
        "Resolução de Conflitos",
        "Otimização de Processos (Scrum)",
      ];

  // from the CV, newest first
  const events = language === "en"
    ? [
        ["AWS Community Day Brasil, Nordeste (Salvador)", "Oct 2026"],
        ["Hackathon + SESI Saúde, 36h", "Nov 2025"],
        ["II FIR Innovation & Robotics Fair, UNIFAN", "Oct 2025"],
        ["Cyberfan, UNIFAN", "May 2025"],
      ]
    : [
        ["AWS Community Day Brasil, Nordeste (Salvador)", "out/2026"],
        ["Hackathon + SESI Saúde, 36h", "nov/2025"],
        ["II FIR – Feira de Inovação e Robótica, UNIFAN", "out/2025"],
        ["Cyberfan, UNIFAN", "mai/2025"],
      ];

  const facts = language === "en"
    ? [
        ["Based in", "Feira de Santana, BA"],
        ["Studying", "Computer Engineering, UNIFAN"],
        ["Time zone", "GMT-3 (Brasília)"],
        ["Availability", "Open to remote work"],
      ]
    : [
        ["Baseado em", "Feira de Santana, BA"],
        ["Cursando", "Eng. da Computação, UNIFAN"],
        ["Fuso horário", "GMT-3 (Brasília)"],
        ["Disponibilidade", "Aberto a trabalho remoto"],
      ];

  return (
    <section id="about" ref={ref} className={styles.AboutMe}>
      <div className={`${styles.container} ${isVisible ? styles.revealActive : ""}`}>
        <div className={styles.leftColumn}>
          <h2 className={styles.title}>{language === "en" ? "About me" : "Sobre mim"}</h2>
          <blockquote className={styles.quote}>
            {language === "en"
              ? "Anyone can write code, but being a good programmer requires discipline, and I like that."
              : "Qualquer um pode escrever código, mas ser um bom programador exige disciplina, e eu gosto disso."}
          </blockquote>

          <dl className={styles.facts}>
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h3 className={styles.skillsHeader}>
              {language === "en" ? "Hackathons & events" : "Hackathons & eventos"}
            </h3>
            <ol className={styles.timeline}>
              {events.map(([name, date]) => (
                <li key={name}>
                  {name} <time>{date}</time>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <p className={styles.bio}>
            {language === "en" ? (
              <>
                Currently studying <strong>Computer Engineering at UNIFAN (2025 - 2028)</strong> and previously worked as a 
                Full-Stack Developer building <strong>Mivai</strong>, a modern multi-tenant SaaS for WhatsApp automation with AI. 
                I implemented omnichannel chat interfaces, custom multi-agent AI pipelines, campaign engines, 
                and integration frameworks, ensuring full-platform stability, dual-layer security, and operational efficiency.
              </>
            ) : (
              <>
                Atualmente cursando <strong>Engenharia de Computação na UNIFAN (2025 - 2028)</strong> e atuei como 
                Desenvolvedor Full-Stack no desenvolvimento do <strong>Mivai</strong>, um SaaS de locação múltipla (multi-tenant) moderno para automação do WhatsApp com IA. 
                Implementei interfaces de chat omnichannel, pipelines customizados de IA multiagente, motores de campanhas 
                e frameworks de integração, garantindo estabilidade total da plataforma, dupla camada de segurança e eficiência operacional.
              </>
            )}
          </p>

          <div className={styles.skills}>
            <h3 className={styles.skillsHeader}>
              {language === "en" ? "Core tech stack" : "Tecnologias principais"}
            </h3>
            <ul className={styles.chips}>
              {techSkills.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className={styles.skills}>
            <h3 className={styles.skillsHeader}>
              {language === "en" ? "Soft skills & leadership" : "Soft skills & liderança"}
            </h3>
            <p className={styles.skillsList}>{softSkills.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
