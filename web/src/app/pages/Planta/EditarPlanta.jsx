import * as yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import PlantaService from "../../services/PlantaService";

const EditarPlanta = ({ open, handleClose, notify, item }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar planta</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <Formik
        initialValues={{
          nombre: item?.nombre || "",
          descripcion: item?.descripcion || "",
        }}
        validationSchema={yup.object({
          nombre: yup.string().required("Nombre requerido"),
          descripcion: yup.string().required("Descripción requerida"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          values.id = item?.id;
          PlantaService.updatePlanta(values)
            .then((response) => {
              if (response.message) {
                setSubmitting(false);
                notify("success", response.message);
              } else {
                notify("error", response.error);
              }
            })
            .catch((error) => {
              notify("error", error);
            });
          handleClose();
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <DialogContent>
              <Grid container rowGap={2}>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    variant="outlined"
                    value={props.values.nombre}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.nombre && Boolean(props.errors.nombre)}
                    helperText={props.touched.nombre && props.errors.nombre}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    value={props.values.descripcion}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.descripcion &&
                      Boolean(props.errors.descripcion)
                    }
                    helperText={
                      props.touched.descripcion && props.errors.descripcion
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Box paddingBottom={2} paddingRight={2}>
                <Button
                  style={{ marginRight: 10 }}
                  variant="contained"
                  color="warning"
                  type="submit"
                >
                  Guardar
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancelar
                </Button>
              </Box>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditarPlanta;
