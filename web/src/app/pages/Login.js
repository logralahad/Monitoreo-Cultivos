import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { LoadingButton } from "@mui/lab";

import {
  AccountCircle,
  Lock,
  LoginRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import Logo from "../images/login icon.png";
import Banner from "../images/portada.jpg";
import UsuarioService from "../services/UsuarioService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { currentUser, signin } = useContext(AuthContext);

  const iniciarSesion = () => {
    setLoading(true);
    const user = {
      correo: correo,
      password: password,
    };

    UsuarioService.login(user)
      .then((response) => {
        signin(response);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.error ? error.error : "Credenciales inválidas",
        });
        setLoading(false);
      });
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <>
      <Helmet>
        <title>Iniciar sesi&oacute;n</title>
        <meta name="Login" content="Página de iniciar sesión" />
      </Helmet>
      <section className="vh-100" style={{ backgroundColor: "wheat" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-11">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={Banner}
                      alt="Salud mental"
                      className="img-fluid"
                      width={800}
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center pr-4">
                    <div className="card-body text-black">
                      <div className="d-flex justify-content-center">
                        <img
                          src={Logo}
                          alt="ASAP - Logo"
                          className="img-fluid mb-3"
                          width={150}
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <Typography
                          variant="h5"
                          marginBottom={5}
                          color="#7795d8"
                          fontWeight="bolder"
                        >
                          Iniciar sesi&oacute;n
                        </Typography>
                      </div>

                      <div className="form-outline mb-4">
                        <TextField
                          fullWidth
                          label="Correo electrónico"
                          variant="outlined"
                          value={correo}
                          onChange={(event) => setCorreo(event.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="passwordInput">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="passwordInput"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            startAdornment={
                              <InputAdornment position="start">
                                <Lock />
                              </InputAdornment>
                            }
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Contraseña"
                          />
                        </FormControl>
                      </div>

                      <div className="mb-4 px-5">
                        <LoadingButton
                          onClick={iniciarSesion}
                          startIcon={<LoginRounded />}
                          fullWidth
                          loading={loading}
                          variant="contained"
                          color="primary"
                        >
                          Entrar
                        </LoadingButton>
                      </div>
                      <div className="d-flex justify-content-center">
                        <a className="small px-5" href="#!">
                          OLVID&Eacute; LA CONTRASE&Ntilde;A
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
