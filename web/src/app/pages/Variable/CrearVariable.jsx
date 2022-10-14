import * as yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import VariableService from "../../services/VariableService";
import PlantaService from "../../services/PlantaService";

const CrearVariable = ({ open, handleClose, notify }) => {
  const [plantas, setPlantas] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      PlantaService.getAllPlantas()
        .then((response) => {
          setPlantas(response);
          setFetched(true);
        })
        .catch((error) => {
          setFetched(true);
        });
    }
  }, [fetched]);

  const validationSchema = yup.object({
    magnitud: yup.string().required("Magnitud requerida"),
    unidad: yup.string().required("Unidad requerida"),
    cantidad: yup
      .number()
      .positive("Debe ser una cantidad mayor a 0")
      .required("Cantidad requerida"),
  });

  const formik = useFormik({
    initialValues: { magnitud: "", unidad: "", cantidad: 0, plantaId: -1 },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      VariableService.createVariable(values)
        .then((response) => {
          if (response.message) {
            setSubmitting(false);
            resetForm();
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
      <DialogTitle>Agregar variable</DialogTitle>
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
                label="Magnitud"
                name="magnitud"
                variant="outlined"
                value={formik.values.magnitud}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.magnitud && Boolean(formik.errors.magnitud)
                }
                helperText={formik.touched.magnitud && formik.errors.magnitud}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="unidad"
                label="Unidad de medida"
                variant="outlined"
                value={formik.values.unidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.unidad && Boolean(formik.errors.unidad)}
                helperText={formik.touched.unidad && formik.errors.unidad}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="cantidad"
                label="Cantidad"
                variant="outlined"
                value={formik.values.cantidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cantidad && Boolean(formik.errors.cantidad)
                }
                helperText={formik.touched.cantidad && formik.errors.cantidad}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="lblPlanta" color="info">
                  Planta
                </InputLabel>
                <Select
                  labelId="slPlanta"
                  color="info"
                  id="lblPlanta"
                  name="plantaId"
                  value={formik.values.plantaId}
                  label="Planta"
                  onChange={formik.handleChange}
                >
                  {plantas?.map((planta) => {
                    return (
                      <MenuItem value={planta.id}>{planta.nombre}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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

export default CrearVariable;
