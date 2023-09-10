import { Box, Button, Typography } from "@mui/material";
import { useUser } from "../hooks/useUser";
import { Delete, Remove } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CreateUserForm from "../components/CreateUserForm";

export default function UsersManagementPage() {
  const { users, updateUser, deleteUser, apiError } = useUser();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      type: "singleSelect",
      valueOptions: ["admin", "member"],
      width: 150,
      editable: true,
    },
    {
      field: "balance",
      headerName: "Balance (€)",
      type: "number",
      width: 110,
    },
    {
      field: "delete",
      headerName: "",
      width: 50,
    },
  ];

  const rows = users ? users.map((u) => u) : [];
  const [selectedRows, setSelectedRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(!formOpen);
  };

  const handleProcessRowUpdate = (newRow) => {
    newRow && updateUser(newRow.id, newRow);
  };

  const onRowsSelectionHandler = (ids) => {
    setSelectedRows(ids.map((id) => rows.find((row) => row.id === id)));
  };

  const deleteSelectedUsers = () => {
    selectedRows.forEach((row) => {
      if (row.id === JSON.parse(Cookies.get("user")).id) {
        toast.error("You cant delete your account", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        deleteUser(row.id);
      }
    });
  };

  return (
    <div>
      <Typography variant="h3">Users management</Typography>;
      {formOpen ? (
        <Button
          variant="outlined"
          onClick={handleFormOpen}
          sx={{ mt: 2, mb: 1 }}
          startIcon={<Remove />}
        >
          Close
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleFormOpen}
          sx={{ mt: 2, mb: 1 }}
          startIcon={<AddIcon />}
        >
          Add user
        </Button>
      )}
      {formOpen && <CreateUserForm />}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={(error) => {
            console.error(error, apiError);
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
        {selectedRows.length > 0 && (
          <Button
            onClick={deleteSelectedUsers}
            color="error"
            sx={{ mt: 1 }}
            variant="contained"
            startIcon={<Delete />}
          >
            Delete {selectedRows.length} user
            {selectedRows.length > 1 ? "s" : ""}
          </Button>
        )}
      </Box>
    </div>
  );
}
