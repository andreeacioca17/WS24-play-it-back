import { Link } from "react-router-dom";
import styles from "./Terms.module.css";

function Terms() {
  return (
    <div className={styles.greyContainer}>
      <p className={styles.title}>Terms of Use</p>

      <div className={styles.categoryTitle}>Purpose of the Site</div>
      <p className={styles.categoryText}>
        <Link to="/" className={styles.gamename}>
          &apos;Play It Back!&apos;
        </Link>{" "}
        is a collaborative video game preservation network aimed at providing
        historical information on classic games. The content is contributed by
        the community and is for educational and archival purposes only.
      </p>

      <div className={styles.categoryTitle}>Content Disclaimer</div>
      <p className={styles.categoryText}>
        While we strive for accuracy, the information on this site is
        user-contributed and may not always be verified.{" "}
        <Link to="/" className={styles.gamename}>
          {" "}
          &apos;Play It Back!&apos;
        </Link>{" "}
        {""} is not affiliated with any game publishers, developers, or rights
        holders.
      </p>

      <div className={styles.categoryTitle}>Acceptable Use</div>
      <ul className={styles.categoryList}>
        <li>Do not submit or link to pirated content.</li>
        <li>Respect intellectual property rights.</li>
        <li>Be respectful in discussions and contributions.</li>
      </ul>

      <div className={styles.categoryTitle}>External Links</div>
      <p className={styles.categoryText}>
        {" "}
        <Link to="/" className={styles.gamename}>
          &apos;Play It Back!&apos;
        </Link>
        {""} may link to external sources for reference. We do not endorse or
        take responsibility for third-party content.
      </p>

      <div className={styles.categoryTitle}>Changes to Terms</div>
      <p className={styles.categoryText}>
        We may update these Terms of Use as the site evolves. By continuing to
        use the site, you agree to any revisions.
      </p>
    </div>
  );
}

export default Terms;
