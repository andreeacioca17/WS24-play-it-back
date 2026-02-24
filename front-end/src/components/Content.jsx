import styles from "./Content.module.css";
import { RecentGames } from "./RecentGames";

function Content() {
  return (
    <>
      <p className={styles.content}>
        Welcome to &apos;Play It Back!&apos;, the ultimate hub for classic video
        game enthusiasts and researchers. Our mission is to preserve the legacy
        of retro gaming by creating an online platform where users can
        contribute and exchange valuable information, resources, copies, and
        contacts related to scarcely documented vintage games and gaming
        systems.
      </p>
      <div className={styles.greyContainer}>
        <p className={styles.title}>Recently added games</p>
        <RecentGames />
      </div>
    </>
  );
}

export default Content;
