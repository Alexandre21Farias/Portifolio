import { useIntersectionObserver } from "/src/hooks/useIntersectionObserver";
import styles from "./styles.module.css";

export default function AboutMe({ language }) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.15,
    once: true,
  });

  const techSkills = [
    "Next.js 16 (App Router)",
    "React 19 & TypeScript",
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

  return (
    <section id="about" ref={ref} className={styles.AboutMe}>
      <h2 className={styles.title}>{language === "en" ? "ABOUT" : "SOBRE"}</h2>

      <div className={`${styles.container} ${isVisible ? styles.revealActive : ""}`}>
        <div className={styles.leftColumn}>
          <h3 className={styles.quote}>
            {language === "en" 
              ? '"Anyone can write code, but being a good programmer requires discipline, and I like that."'
              : '"Qualquer um pode escrever código, mas ser um bom programador exige disciplina, e eu gosto disso."'}
          </h3>
          <div className={styles.profileFrame}>
            <img
              src="/Alexandre.jpeg"
              alt="Alexandre L. Farias"
              className={styles.profileImage}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600";
              }}
            />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <p className={styles.bio}>
            {language === "en" ? (
              <>
                Currently studying <strong>Computer Engineering at UNIFAN (2025 - 2028)</strong> and working as a 
                Full-Stack Developer building <strong>Mivai</strong>, a modern multi-tenant SaaS for WhatsApp automation with AI. 
                I implement omnichannel chat interfaces, custom multi-agent AI pipelines, campaign engines, 
                and integration frameworks, ensuring full-platform stability, dual-layer security, and operational efficiency.
              </>
            ) : (
              <>
                Atualmente cursando <strong>Engenharia de Computação na UNIFAN (2025 - 2028)</strong> e atuando como 
                Desenvolvedor Full-Stack no desenvolvimento do <strong>Mivai</strong>, um SaaS de locação múltipla (multi-tenant) moderno para automação do WhatsApp com IA. 
                Implemento interfaces de chat omnichannel, pipelines customizados de IA multiagente, motores de campanhas 
                e frameworks de integração, garantindo estabilidade total da plataforma, dupla camada de segurança e eficiência operacional.
              </>
            )}
          </p>

          <div>
            <h4 className={styles.skillsHeader}>
              {language === "en" ? "Core Tech Stack" : "Tecnologias Principais"}
            </h4>
            <div className={styles.skillsGrid} style={{ marginBottom: "2rem" }}>
              {techSkills.map((skill, index) => (
                <span key={index} className={styles.skillTag} style={{ borderColor: "var(--orange-light)" }}>
                  {skill}
                </span>
              ))}
            </div>

            <h4 className={styles.skillsHeader}>
              {language === "en" ? "Soft Skills & Leadership" : "Soft Skills & Liderança"}
            </h4>
            <div className={styles.skillsGrid}>
              {softSkills.map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
