import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { Button, Grid, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import DataTable from "../../components/DataTable";
import VariableService from "../../services/VariableService";
import CrearVariable from "./CrearVariable";
import EditarVariable from "./EditarVariable";

const Variables = () => {
  const [variables, setVariables] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({
    id: -1,
  });
  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "magnitud", label: "Magnitud" },
    { field: "unidad", label: "Unidad" },
    { field: "cantidad", label: "Cantidad" },
    { field: "planta", subfield: "nombre", label: "Planta" },
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
      VariableService.getAllVariables()
        .then((response) => {
          setVariables(response);
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
    VariableService.deleteVariable(id)
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
    const found = variables.find((rol) => rol.id === Number(id));
    setItemToEdit(found);
  };

  return (
    <>
      <Helmet>
        <title>Tablero</title>
        <meta
          name="Tablero"
          content="Registros de variables de un cultivo hidropónico."
        />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Variables
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
        rows={variables}
        headers={headers}
        editAction={editAction}
        deleteAction={deleteAction}
      />
      <CrearVariable
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
      <EditarVariable
        handleClose={handleCloseEdit}
        open={openEdit}
        notify={notify}
        item={itemToEdit}
      />
      <ToastContainer />
    </>
  );
};

export default Variables;
