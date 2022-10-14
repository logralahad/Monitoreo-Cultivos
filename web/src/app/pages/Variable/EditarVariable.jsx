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
import { Formik } from "formik";
import { useEffect, useState } from "react";

import VariableService from "../../services/VariableService";
import PlantaService from "../../services/PlantaService";

const EditarVariable = ({ open, handleClose, notify, item }) => {
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar rol</DialogTitle>
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
          magnitud: item?.magnitud || "",
          unidad: item?.unidad || "",
          cantidad: item?.cantidad || 0,
          plantaId: item?.plantaId || -1,
        }}
        validationSchema={yup.object({
          magnitud: yup.string().required("Magnitud requerida"),
          unidad: yup.string().required("Unidad requerida"),
          cantidad: yup
            .number()
            .positive("Debe ser una cantidad mayor a 0")
            .required("Cantidad requerida"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          values.id = item?.id;
          VariableService.updateVariable(values)
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
                    label="Magnitud"
                    name="magnitud"
                    variant="outlined"
                    value={props.values.magnitud}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.magnitud && Boolean(props.errors.magnitud)
                    }
                    helperText={props.touched.magnitud && props.errors.magnitud}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    name="unidad"
                    label="Unidad de medida"
                    variant="outlined"
                    value={props.values.unidad}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.unidad && Boolean(props.errors.unidad)}
                    helperText={props.touched.unidad && props.errors.unidad}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    name="cantidad"
                    label="Cantidad"
                    variant="outlined"
                    value={props.values.cantidad}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.cantidad && Boolean(props.errors.cantidad)
                    }
                    helperText={props.touched.cantidad && props.errors.cantidad}
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
                      value={props.values.plantaId}
                      label="Planta"
                      onChange={props.handleChange}
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

export default EditarVariable;
