import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";


const Getapplynowgrid=({rows, onApply,userId})=>{
  const navigate = useNavigate();
const columns=[
   
   
    {
    field: "name",
    headerName: "Name",
    width: 200,
    valueGetter: (value, row) => row?.userId?.name
    },
     {
    field: "appliedprofile",
    headerName: "Applied Profile",
    width: 200,
    valueGetter: (value, row) => row?.jobId?.profilename
    },
     {
    field: "email",
    headerName: "Email",
    width: 200,
    valueGetter: (value, row) => row?.userId?.email
    },
     {
    field: "mobileno",
    headerName: "Mobileno",
    width: 200,
    valueGetter: (value, row) => row?.userId?.mobileno
    },
     {field:"experience",headerName:"Experience",width:200},
    {field:"location",headerName:"Location",width:200},
    {field:"skills",headerName:"Skills",width:200},
     {field:"currentctc",headerName:"Current CTC",width:200,},
      {field:"expectedctc",headerName:"Expected CTC",width:200,},

      {field:"action",headerName:"Action",width:150,
      
             
         renderCell: (params) => {
                 const applied = params.row.appliedBy?.includes(userId);
                 return (
                   <Button
                     variant="contained"
                     color={applied ? "success" : "primary"}
                     size="sm"
                     disabled={applied}
                     onClick={() => !applied && navigate(`/viewapplied/${params.row._id}`)}
                   >
                     {applied ? "Action" : "View"}
                   </Button>
                 );
               }
              },
     {
    field: "status",
    headerName: "Status",
    width: 200
      },
      
              

         ];
return(
    <Box sx={{height:400,width:"100%"}}>
     <DataGrid 
     rows={rows}
     columns={columns}
     getRowId={(row) => row._id || row.id} // handles MongoDB _id
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
     />    
    </Box>
)
}

export default Getapplynowgrid;