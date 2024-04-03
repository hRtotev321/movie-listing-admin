import { Button, Grid, OutlinedInput, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LoginBoxGrid,
  StyledErrorsBox,
  StyledFormTitle,
  StyledPaper,
} from "./Components";
import { useAuth, useLoading } from "../../app/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { checkAuth, loginUser, logout } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/enums";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { setLoadingState, loading } = useLoading();
  const { user } = useAuth();
  const [userAdmin, setUserAdmin] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth().then((isAuthenticated) => {
      if (isAuthenticated) {
        navigate(ROUTES.HOME);
      }
    });
  }, [user]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoadingState(true);
      const isAdmin = await loginUser(data);

      if (!isAdmin) {
        setUserAdmin(false);
        await logout();
      } else {
        setUserAdmin(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <LoginBoxGrid container>
      <Grid component={Paper} elevation={6} square>
        <StyledPaper onSubmit={handleSubmit(onSubmit)}>
          <StyledFormTitle>Sign In Movies Admin</StyledFormTitle>
          <Controller
            control={control}
            name="email"
            rules={{
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <OutlinedInput
                placeholder="email"
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
            name="password"
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <OutlinedInput
                placeholder="password"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                size="small"
                type="password"
              />
            )}
          />
          <Button
            sx={{ m: 1, width: 100 }}
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <StyledErrorsBox>
            <Typography color="red">
              {errors.email && "Email missing or invalid"}
            </Typography>
            <Typography color="red">
              {errors.password && "Password must be at least 6 characters long"}
            </Typography>
            <Typography color="red">
              {!userAdmin && "This user do not have ADMIN Rights"}
            </Typography>
          </StyledErrorsBox>
        </StyledPaper>
      </Grid>
    </LoginBoxGrid>
  );
};

export default Login;
