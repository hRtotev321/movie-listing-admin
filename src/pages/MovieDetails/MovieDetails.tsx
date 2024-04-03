import React, { useEffect, useState } from "react";
import { MovieType } from "../../app/types";
import { useParams } from "react-router-dom";
import { editMovie, getMovie } from "../../firebase/firebase";
import { useLoading } from "../../app/hooks";
import {
  Autocomplete,
  Button,
  Checkbox,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { MovieGenre } from "../../app/enums";
import {
  GridButtonsBox,
  InfoBox,
  StyledGridImageBox,
  StyledImage,
} from "./Components";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import TableComments from "./TableComments";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type DataBoxType = {
  title: string;
  data?: string | number;
  register?: any;
};

type Inputs = {
  title: string;
  description: string;
  genre: MovieGenre[];
  image: string;
};

const MovieDetails: React.FC = () => {
  const { setLoadingState, loading } = useLoading();
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoadingState(true);
      await editMovie({ ...data, movieId: id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
      setLoadingState(false);
    }
  };

  async function getData() {
    setLoadingState(true);
    getMovie(id as string)
      .then((mov) => setMovie(mov))
      .finally(() => setLoadingState(false));
  }

  useEffect(() => {
    if (!isEditing) {
      getData();
    }
  }, [isEditing]);

  useEffect(() => {
    if (movie) {
      setValue("genre", movie.genre as MovieGenre[]);
      setValue("description", movie.description as string);
      setValue("title", movie.title as string);
      setValue("image", movie.image as string);
    }
  }, [movie, isEditing]);

  const DataBox = ({ title, data }: DataBoxType) => {
    return (
      <InfoBox>
        <Typography fontWeight={700}>{title}</Typography>
        <Typography>{data}</Typography>
      </InfoBox>
    );
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid xs={6} item>
            <InfoBox>
              <Typography fontWeight={700}>Title: </Typography>
              <Controller
                control={control}
                name="title"
                rules={{ required: true, minLength: 4 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <OutlinedInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    size="small"
                    type="outlined"
                  />
                )}
              />
            </InfoBox>

            <InfoBox>
              <Typography fontWeight={700}>Description: </Typography>
              <Controller
                control={control}
                rules={{ required: true, minLength: 20 }}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <OutlinedInput
                    multiline
                    maxRows={10}
                    fullWidth
                    rows={10}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    size="small"
                    type="outlined"
                  />
                )}
              />
            </InfoBox>
            <InfoBox>
              <Typography fontWeight={700}>Genre: </Typography>
              <Controller
                control={control}
                rules={{ required: true, minLength: 20 }}
                name="genre"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Autocomplete
                    onChange={(_, value) => {
                      onChange(value); // Set value for React Hook Form
                    }}
                    onBlur={onBlur}
                    value={value}
                    multiple
                    options={Object.values(MovieGenre)}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Genres"
                        placeholder="Genres"
                      />
                    )}
                  />
                )}
              />
            </InfoBox>
            <Typography color="red">
              {errors.genre && "Genre is required"}
            </Typography>
            <Typography color="red">
              {errors.description &&
                "Description is required min characters: 20!"}
            </Typography>
            <Typography color="red">
              {errors.title && "Title is required min characters: 4!"}
            </Typography>
          </Grid>
          <StyledGridImageBox xs={6} item>
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <ImageUpload onChange={onChange} value={value} />
              )}
            />
          </StyledGridImageBox>
          <GridButtonsBox item xs={12}>
            <Button
              disabled={loading}
              type={"submit"}
              color="primary"
              variant="contained"
            >
              save
            </Button>
            <Button
              disabled={loading}
              onClick={() => setIsEditing(false)}
              color="error"
              variant="contained"
            >
              cancel
            </Button>
          </GridButtonsBox>
        </Grid>
      </form>
    );
  }

  return (
    <div>
      <Grid container>
        <Grid xs={6} item>
          <DataBox title={"Title: "} data={movie?.title} />
          <DataBox title={"Description: "} data={movie?.description} />
          <DataBox title={"Creator: "} data={movie?.creator} />
          <DataBox title={"Movie ID: "} data={movie?.movieId} />
          <DataBox title={"Genre: "} data={movie?.genre?.join(", ")} />

          <DataBox
            title={"Last Change: "}
            data={moment(movie?.lastChange).format("YYYY.MM.DD  HH:mm A")}
          />

          <DataBox
            title={"Rating: "}
            data={(movie?.rating || 0) / (movie?.comments?.length || 0) || 0}
          />

          {movie?.comments?.length ? (
            <TableComments comments={movie?.comments} />
          ) : null}
        </Grid>
        <StyledGridImageBox xs={6} item>
          <StyledImage src={movie?.image} />
        </StyledGridImageBox>
        <GridButtonsBox item xs={12}>
          <Button
            onClick={() => setIsEditing(true)}
            color="primary"
            variant="contained"
          >
            edit
          </Button>
          <ConfirmDeleteDialog displayName={movie?.title} movieId={id} />
        </GridButtonsBox>
      </Grid>
    </div>
  );
};

export default MovieDetails;
