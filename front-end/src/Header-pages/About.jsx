import { Link } from "react-router-dom";
import styles from "./About.module.css";
function About() {
  return (
    <div className={styles.greyContainer}>
      <p className={styles.title}>About us</p>
      <p className={styles.content}>
        The idea for{" "}
        <Link to="/" className={styles.gamename}>
          &apos;Play It Back!&apos;
        </Link>{" "}
        was inspired by a 2023 study conducted by the Video Game History
        Foundation and the Software Preservation Network. The study revealed
        that a staggering 87% of classic video games are lost or at risk of
        being lost, making them unavailable to the general public.
      </p>{" "}
      <p className={styles.content}>
        This means that for nearly 9 out of 10 classic games, the options for
        access are extremely limited: you can hunt down and maintain vintage
        games and hardware, travel long distances to visit a library with a
        collection, or resort to piracy. None of these are ideal, leaving most
        video games out of reach for all but the most devoted enthusiasts. It is
        a disheartening reality.
      </p>
      <p className={styles.content}>
        That is where{" "}
        <Link to="/" className={styles.gamename}>
          &apos;Play It Back!&apos;
        </Link>{" "}
        comes in — a centralized hub where retro gamers, researchers, and
        enthusiasts can unite to preserve and celebrate the rich history of
        video games for generations to come. We strongly believe that everyone
        should be able to delve into the history, context, and legacy of classic
        video games—just as easily as they can with classic novels, albums, or
        films.{" "}
      </p>
    </div>
  );
}

export default About;
