import styles from "./GamesDetailPage.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import fakePicture from "../../assets/fakePicture.png";
import { config } from "../../config.js";

export function Game() {
  let { id } = useParams();
  const [Gamedata, setGamedata] = useState(undefined);

  useEffect(() => {
    fetch(`${config.BASE_URL}/games/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json(); // parse the response
        } else {
          console.error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        setGamedata({
          ...data,
          sample_cover:
            data.sample_cover === undefined || data.sample_cover === null
              ? fakePicture
              : data.sample_cover,
        });
      });
  }, [id]);
  if (!Gamedata) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.title}>
        <h1>{Gamedata.title}</h1>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.containerFakePicture}>
          <img
            src={Gamedata.sample_cover}
            alt="fakePicture"
            className={styles.fakePicture}
          />
        </div>

        <div className={styles.containerDescription}>
          <h2 className={styles.descriptionName}>Description</h2>
          {Gamedata.description ? (
            <div
              className={styles.detailDescription}
              dangerouslySetInnerHTML={{ __html: Gamedata.description }}
            ></div>
          ) : (
            <div className={styles.detailDescription}>No description</div>
          )}
        </div>

        <div className={styles.containerNames}>
          {Gamedata.genres !== undefined && Gamedata.genres.length > 0 && (
            <>
              <h2 className={styles.detailName}>Genre</h2>
              <div className={styles.details}>
                {Gamedata.genres.map((genre) => (
                  <div key={genre}>{genre}</div>
                ))}
              </div>
            </>
          )}

          {Gamedata.platforms !== undefined &&
            Gamedata.platforms.length > 0 && (
              <>
                <h2 className={styles.detailName}>Platform</h2>
                <div className={styles.details}>
                  {Gamedata.platforms.map((platform) => (
                    <div key={platform}>{platform}</div>
                  ))}
                </div>
              </>
            )}
          <h2 className={styles.detailName}>Release Year</h2>
          <div className={styles.details}>{Gamedata.release_year}</div>

          {Gamedata.country && (
            <>
              <h2 className={styles.detailName}>Country</h2>
              <div className={styles.details}>{Gamedata.country}</div>
            </>
          )}

          {Gamedata.tags !== undefined && Gamedata.tags.length > 0 && (
            <>
              <h2 className={styles.detailName}>Tags</h2>
              <div className={styles.details}>
                {Gamedata.tags.map((tag) => (
                  <div key={tag}>{tag}</div>
                ))}
              </div>
            </>
          )}

          {/*
          DEVELOPER FOR NOW BROKEN SO WE DONT SHOW IT
          <h2 className={styles.detailName}>Developer</h2>
          <div className={styles.details}> {Gamedata.developer}</div>
          */}
        </div>
      </div>
    </>
  );
}
