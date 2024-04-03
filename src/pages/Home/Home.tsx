import React, { useEffect, useState } from "react";
import TableMovies from "./TableMovies";
import { MovieType } from "../../app/types";
import { getMovies } from "../../firebase/firebase";
import { useLoading } from "../../app/hooks";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const { setLoadingState } = useLoading();
  useEffect(() => {
    setLoadingState(true);
    
    getMovies()
      .then((data) => {
        setMovies(data);
      })
      .finally(() => setLoadingState(false));
  }, []);

  return <TableMovies movies={movies} />;
};

export default Home;
