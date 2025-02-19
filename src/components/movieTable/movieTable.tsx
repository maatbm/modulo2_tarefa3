import { useEffect, useState } from "react";
import "./style.css";

async function fetchMovies() {
  try {
    const response = await fetch('/movies.json');
    if (!response.ok) {
      throw new Error("Erro ao carregar filmes" + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

type Movie = {
  id: number;
  nome: string;
  genero: string;
  imagem: string;
  isChecked: boolean;
};

type Props = {
  filterMovie: string;
};

function RenderMoviesTable(props: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const moviesArray = await fetchMovies();
      setMovies(moviesArray.map((movie: Movie) => ({ ...movie, isChecked: false })));
    }
    loadMovies();
  }, []);

  const filteredMovies = movies.filter(
    (movie) => 
      movie.nome.toLowerCase().includes(props.filterMovie.toLowerCase()) || 
      movie.genero.toLowerCase().includes(props.filterMovie.toLowerCase())
  );

  function check(id: number) {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isChecked: !movie.isChecked } : movie
      )
    );
  }

  return (
    <div className="table">
      {filteredMovies.length > 0 ? (
        <table>
          <thead>
            <tr className="titles">
              <th className="rounded-top-left">Nome</th>
              <th>Gênero</th>
              <th className="rounded-top-right">Capa</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie, index) => (
              <tr key={movie.id} className={index % 2 === 0 ? "content" : "content_middle"}>
                <td>
                  <input type="checkbox" className="checkbox" onChange={() => { check(movie.id); alert("Filme selecionado: " + movie.nome); }} checked={movie.isChecked}/>
                  {movie.nome}
                </td>
                <td>{movie.genero}</td>
                <td><img className="banner" src={movie.imagem} alt={movie.nome} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum filme encontrado</p>
      )}
    </div>
  );
}

export default RenderMoviesTable;
