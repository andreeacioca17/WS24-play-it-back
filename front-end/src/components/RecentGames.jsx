import { useEffect, useState } from "react";
import styles from "./RecentGames.module.css";
import { config } from "../config.js";

const RecentGames = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const limit = 9;

  useEffect(() => {
    setLoading(true); // Set loading to true before fetch starts
    fetch(`${config.BASE_URL}/games/recent?page=${page}&limit=${limit}`)
      .then((response) => { 
        if (response.ok) { 
          return response.json();
        } else {
          throw new Error(response.status); }
        })

      .then((data) => {
        setGames(data.games);
        setTotalPages(data.totalPages);
        setLoading(false); // Set loading to false when fetch completes
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setError(
          "There was an issue loading the games. Please try again later."
        );
        setLoading(false); // Set loading to false even on error
      });
  }, [page]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error message
  }

  return (
    <>
      <div className={styles.greyContainer}>
        <ul className={styles.gamesGrid}>
          {games.length === 0 ? (
            <li>No games available</li> // Handle case with no games
          ) : (
            games.map((game) => (
              <li key={game.id} className={styles.gameItem}>
                <a href={`/games/${game.id}`}>
                  <div className={styles.gameCover}>
                    <img src={game.sample_cover} alt={game.title} />
                  </div>
                  <p className={styles.gameTitle}>{game.title}</p>
                  <p className={styles.releaseYear}>
                    Released: {game.release_year}{" "}
                  </p>
                </a>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.submitButton} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className={styles.submitButton} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export { RecentGames };
