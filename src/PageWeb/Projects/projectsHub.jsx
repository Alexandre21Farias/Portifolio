import styles from "./styles.module.css";

export default function ProjectsHub({ language }) {
  const experiences = [
    {
      number: "01",
      title: "Mivai (Mivus)",
      category: language === "en" ? "WhatsApp AI Automation Platform" : "Plataforma de Automação de WhatsApp com IA",
      year: "2025 - Present",
      url: "https://painel.mivus.com.br",
      preview: "/Mivai.webp"
    },
    {
      number: "02",
      title: "Open Bahia",
      category: language === "en" ? "Developer Forum & Community" : "Fórum e Comunidade de Desenvolvedores",
      year: "2026",
      url: "https://bahia-open-source.vercel.app/",
      preview: "/OpenBahia.png"
    },
    {
      number: "03",
      title: "Lumi Project",
      category: language === "en" ? "IoT Smart Safety Wristband" : "Pulseira Inteligente de Segurança IoT",
      year: "2026",
      url: "https://lumi-taupe-five.vercel.app/",
      preview: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=300"
    },
    {
      number: "04",
      title: "PEWP Project",
      category: language === "en" ? "World Cup Stats & Probability" : "Estatísticas e Probabilidade da Copa do Mundo",
      year: "2026",
      url: "https://github.com/Alexandre21Farias/PEWP",
      preview: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=300"
    },
    {
      number: "05",
      title: "Nimbus.dev",
      category: language === "en" ? "Full-Stack Developer" : "Desenvolvedor Full-Stack",
      year: "2025",
      url: "#",
      preview: "/NimbusDevLogo.png"
    },
    {
      number: "06",
      title: "TabNews Project",
      category: language === "en" ? "Open-Source Contributor" : "Contribuidor Open-Source",
      year: "2025",
      url: "https://www.tabnews.com.br",
      preview: "/TabNewsLogo.jpeg"
    }
  ];

  return (
    <section id="projects" className={styles.ProjectsSection}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>
          {language === "en" ? "WORK & PROJECTS" : "PROJETOS & TRABALHOS"}
        </h2>
        <span className={styles.subtitle}>
          {language === "en" 
            ? "Selected software projects and work history (click to visit)" 
            : "Projetos de software selecionados e histórico de trabalho (clique para visitar)"}
        </span>
      </div>

      <div className={styles.list}>
        {experiences.map((exp, idx) => (
          <a key={idx} href={exp.url} target="_blank" rel="noopener noreferrer" className={styles.row}>
            <div className={styles.rowLeft}>
              <span className={styles.rowNumber}>{exp.number}</span>
              <h3 className={styles.rowTitle}>{exp.title}</h3>
            </div>
            
            <div className={styles.previewContainer}>
              <img src={exp.preview} alt={exp.title} className={styles.previewImage} />
            </div>

            <div className={styles.rowRight}>
              <span className={styles.rowCategory}>{exp.category}</span>
              <span className={styles.rowYear}>{exp.year}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
