import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Turborepo Project</h1>
        <p>This is the main web application using a shared UI component.</p>
        <Button appName="web" className={styles.secondary}>
          Click me!
        </Button>
      </main>
    </div>
  );
}
