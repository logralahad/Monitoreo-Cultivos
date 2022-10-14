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
import { useFormik } from "formik";
import PlantaService from "../../services/PlantaService";

const CrearPlanta = ({ open, handleClose, notify }) => {
  const validationSchema = yup.object({
    nombre: yup.string().required("Nombre requerido"),
    descripcion: yup.string().required("Descripción requerida"),
  });

  const formik = useFormik({
    initialValues: { nombre: "", descripcion: "" },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      PlantaService.createPlanta(values)
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
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar planta</DialogTitle>
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
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Nombre"
                name="nombre"
                variant="outlined"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="descripcion"
                label="Descripcion"
                variant="outlined"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.descripcion &&
                  Boolean(formik.errors.descripcion)
                }
                helperText={
                  formik.touched.descripcion && formik.errors.descripcion
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
              color="secondary"
              type="submit"
            >
              Agregar
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CrearPlanta;
