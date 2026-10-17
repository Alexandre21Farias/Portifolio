import { useState } from "react";
import HelloComponent from "./hello/Hello";
import ProjectsHub from "./Projects/projectsHub";
import styles from "./styles.module.css";
import AboutMe from "./About/AboutMe";
import Contact from "./Contact/Contact";
import NenTest from "./Nen/NenTest";

export default function PageWeb() {
  const [language, setLanguage] = useState("en"); // 'en' or 'pt'

  return (
    <div className={styles.PrimaryContainer}>
      <HelloComponent language={language} setLanguage={setLanguage} />
      <AboutMe language={language} />
      <ProjectsHub language={language} />
      <NenTest language={language} />
      <Contact language={language} />
    </div>
  );
}
