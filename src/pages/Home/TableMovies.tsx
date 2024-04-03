import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { MovieType } from "../../app/types";
import { Rating, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  border: "1px solid lightGray",
  padding: 4,
  alignItems: "center",
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.action.focus,
  },
}));

const StyledImage = styled("img")({
  marginTop: 5,
  height: 100,
  width: 100,
  objectFit: "cover",
});

type TableMoviesType = {
  movies: MovieType[];
};

const TableMovies: React.FC<TableMoviesType> = ({ movies }) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => () => {
    navigate(path);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Added by</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Genre</StyledTableCell>
            <StyledTableCell align="center">Comments</StyledTableCell>
            <StyledTableCell align="center">Rating</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <StyledTableRow
              onClick={handleNavigate(`/movie/${movie?.movieId}`)}
              key={movie.title}
            >
              <StyledTableCell align="center" component="th" scope="row">
                {movie.title}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {movie.creator}
              </StyledTableCell>
              <StyledTableCell variant="body" align="center">
                <div
                  style={{
                    display: "block",
                    width: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {movie.description}
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                {movie?.genre?.join(", ")}
              </StyledTableCell>
              <StyledTableCell align="center">
                {movie.comments?.length}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>{`(${
                  Number(movie?.rating || 0) / (movie?.comments?.length || 0) ||
                  0
                }/5)`}</Typography>
                <Rating
                  name="read-only"
                  value={
                    Number(movie?.rating || 0) / (movie?.comments?.length || 0)
                  }
                  readOnly
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledImage src={movie.image} alt="err" />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMovies;
