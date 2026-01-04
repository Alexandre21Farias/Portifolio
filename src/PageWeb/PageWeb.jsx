import HelloComponent from "./hello/Hello";
import ProjectsHub from "./Projects/projectsHub";
import styles from "./styles.module.css";
import AboutMe from "./About/AboutMe";
export default function PageWeb() {
  return (
    <div className={styles.PrimaryContainer}>
      <HelloComponent />
      <AboutMe />
      <ProjectsHub />
    </div>
  );
}
