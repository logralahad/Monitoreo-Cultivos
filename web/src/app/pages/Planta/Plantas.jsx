import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { Button, Grid, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import DataTable from "../../components/DataTable";
import PlantaService from "../../services/PlantaService";
import CrearPlanta from "./CrearPlanta";
import EditarPlanta from "./EditarPlanta";

const Plantas = () => {
  const [plantas, setPlantas] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({
    id: -1,
  });
  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "nombre", label: "Nombre" },
    { field: "descripcion", label: "Descripción" },
  ];

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const notify = useCallback(
    (action, message) => {
      setFetched(!fetched);
      const configuration = {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      };
      action === "success"
        ? toast.success(message, configuration)
        : toast.error(message, configuration);
    },
    [fetched]
  );

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
  }, [fetched, notify]);

  useEffect(() => {
    if (itemToEdit && itemToEdit.id !== -1) {
      handleOpenEdit();
    }
  }, [itemToEdit]);

  const deleteAction = (id) => {
    PlantaService.deletePlanta(id)
      .then((response) => {
        if (response.message) {
          notify("success", response.message);
        } else {
          notify("error", response.error);
        }
      })
      .catch((error) => {
        notify("error", error);
      });
  };

  const editAction = (id) => {
    const found = plantas.find((rol) => rol.id === Number(id));
    setItemToEdit(found);
  };

  return (
    <>
      <Helmet>
        <title>Tablero</title>
        <meta
          name="Tablero"
          content="Registros de plantas de un cultivo hidropónico."
        />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Plantas
          </Typography>
        </Grid>
        <Grid item xs={2} justifyContent="center">
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleOpenCreate}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
      <DataTable
        rows={plantas}
        headers={headers}
        editAction={editAction}
        deleteAction={deleteAction}
      />
      <CrearPlanta
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
      <EditarPlanta
        handleClose={handleCloseEdit}
        open={openEdit}
        notify={notify}
        item={itemToEdit}
      />
      <ToastContainer />
    </>
  );
};

export default Plantas;
