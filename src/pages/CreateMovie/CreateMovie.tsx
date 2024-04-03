import React from "react";
import { useLoading } from "../../app/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MovieGenre } from "../../app/enums";
import {
  Autocomplete,
  Checkbox,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import {
  CustomButton,
  PageTitle,
  StyledGridColumn,
  StyledGridImageBox,
} from "./Components";
import { createMovie } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Inputs = {
  title: string;
  description: string;
  genre: MovieGenre[];
  image: string;
};

const CreateMovie: React.FC = () => {
  const { setLoadingState, loading } = useLoading();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoadingState(true);
      const movieId = await createMovie(data);
      navigate(`/movie/${movieId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageTitle align="center">Add Movie</PageTitle>
      <Grid justifyContent={"space-around"} gap={2} container>
        <StyledGridColumn xs={4} item>
          <Controller
            control={control}
            name="title"
            rules={{ required: true, minLength: 4 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <OutlinedInput
                placeholder="Title (min 4 characters)"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                size="small"
                type="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            rules={{ required: true, minLength: 20 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <OutlinedInput
                placeholder="Description (min 20 characters)"
                multiline={true}
                maxRows={10}
                rows={10}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                size="small"
                type="outlined"
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
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
          <CustomButton
            disabled={loading}
            type={"submit"}
            color="primary"
            variant="contained"
          >
            add movie
          </CustomButton>
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
          <Typography color="red">
            {errors.image && "Image is required"}
          </Typography>
        </StyledGridColumn>
        <StyledGridImageBox xs={6} item>
          <Controller
            rules={{ required: true }}
            control={control}
            name="image"
            render={({ field: { onChange, value } }) => (
              <ImageUpload onChange={onChange} value={value} />
            )}
          />
        </StyledGridImageBox>
      </Grid>
    </form>
  );
};

export default CreateMovie;
