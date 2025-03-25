import { useAuth } from "@/lib/auth-context";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import classNames from "classnames"; // Ensure you have this installed

interface SidebarProps {
  sections: { id: number; title: string }[];
  selectedSection: number;
  setSelectedSection: (id: number) => void;
}

export default function Sidebar({ sections, selectedSection, setSelectedSection }: SidebarProps) {
  const { user } = useAuth();

  return (
    <div className={styles.sidebar}>
      

      {/* Faculty Name and Application Form */}
      <div className={styles.facultyInfo}>
        <h3 className={styles.facultyName}>Engineering and Technology</h3>
        <h3 className={styles.applicationForm}>Application Form 2025-26</h3>
      </div>

      {/* Steps */}
      <nav className={styles.nav}>
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => setSelectedSection(section.id)}
            className={classNames(styles.step, {
              [styles.active]: selectedSection === section.id,
              [styles.completed]: section.id < selectedSection,
            })}
          >
            <div className={styles.stepNumber}>{section.id}</div>
            <span className={styles.stepTitle}>{section.title}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
