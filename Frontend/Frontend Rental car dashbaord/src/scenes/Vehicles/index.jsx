import { Box, useTheme, Button, IconButton, Tooltip, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import api from '../../api/axios';
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    fetchVehicles();
  }, [paginationModel]);

  const fetchVehicles = async () => {
    try {
        const response = await api.get('/api/account/vehicules', {
            params: {
                offset: paginationModel.page * paginationModel.pageSize,
                pageSize: paginationModel.pageSize,
            },
        });
        console.log('Vehicles:', vehicles);
        setVehicles(response.data);
        setLoading(false);
    } catch (error) {
        if (error.response?.status === 401) {
            window.location.href = '/login';
        } else {
            console.error("Error fetching vehicles:", error);
            setLoading(false);
        }
    }
};


const handleDelete = async (matricule) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
        try {
            const response = await api.delete(`/api/account/vehicules/${matricule}`);
            console.log('Vehicle deleted successfully:', response.data);
            fetchVehicles();
        } catch (error) {
            console.error("Error during delete operation:", error);
            if (error.response) {
                console.error("Backend response error:", error.response.data, error.response.status);
            } else if (error.request) {
                console.error("Network error:", error.request);
            } else {
                console.error("Unexpected error:", error.message);
            }

            if (error.response?.status === 401) {
                window.location.href = '/login';
            }
        }
    }
};


  const handleView = (matricule) => {
    window.location.href = `/vehicles/view/${matricule}`;
  };

  const handleEdit = (matricule) => {
    window.location.href = `/vehicles/edit/${matricule}`;
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        console.log(params.row.image); // Debugging
        const base64Image = params.row.image ? `data:image/jpeg;base64,${params.row.image}` : null;
        return (
            <Avatar
                src={base64Image}
                alt={`${params.row.brand} ${params.row.model}`}
                sx={{ width: 50, height: 50 }}
            />
        );
    },
    
    },
    { 
      field: "matricule", 
      headerName: "Matricule", 
      flex: 1 
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
    },
    {
      field: "year",
      headerName: "Year",
      type: "number",
      width: 100,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1,
      renderCell: (params) => (
        `$${params.value.toFixed(2)}`
      ),
    },
    {
      field: "statu",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Box
          width="90%"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            params.value === "Available"
              ? colors.greenAccent[600]
              : params.value === "Rented"
              ? colors.redAccent[600]
              : colors.blueAccent[600]
          }
          borderRadius="4px"
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" gap="8px">
            <Tooltip title="View">
              <IconButton
                onClick={() => handleView(params.row.matricule)}
                sx={{ color: colors.greenAccent[500] }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => handleEdit(params.row.matricule)}
                sx={{ color: colors.blueAccent[500] }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDelete(params.row.matricule)}
                sx={{ color: colors.redAccent[500] }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Vehicles" subtitle="Managing the stored Vehicles" />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: colors.greenAccent[500],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            ":hover": {
              bgcolor: colors.greenAccent[700],
            },
          }}
          component={Link}
          to="/vehicles/add"
        >
          Add Vehicle
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[500],
          },
        }}
      >
        <DataGrid
          rows={vehicles}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.matricule}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          disableSelectionOnClick
          disableColumnSelector
          autoHeight
        />
      </Box>
    </Box>
  );
};

export default Team;