import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";


const Userjobdatagrid=({rows, onApply, userId})=>{
  const navigate = useNavigate();
const columns=[
    { field: "profilename", headerName: "Profile Name", width: 250 },
    {field:"description",headerName:"Description",width:300},
    {field:"experience",headerName:"Experience",width:150},
    {field:"salary",headerName:"Salary",width:150},
    {field:"location",headerName:"Location",width:150},
    {field:"lastdate",headerName:"Lastdate",width:150},
    {
  field: "action",
  headerName: "Action",
  width: 150,
  sortable: false,
  renderCell: (params) => {

    const applied = params.row.applied === true;

    return (
      <Button
        variant="contained"
        color={applied ? "success" : "primary"}
        size="small"
        disabled={applied}
        //disabled= true or false
        onClick={() =>
          !applied && navigate(`/applynow/${params.row._id}`)
        }
      >
        {applied ? "Applied" : "Apply Now"}
      </Button>
    );
  }
}

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
export default Userjobdatagrid;