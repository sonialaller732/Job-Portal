import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box ,Button} from "@mui/material"
import { useNavigate } from "react-router-dom";
const Jobdatagrid=({rows,onEdit, onDelete})=>{
  const navigate = useNavigate();
const columns=[
    { field: "profilename", headerName: "Profile Name", width: 250 },
    {field:"description",headerName:"Description",width:250},
    {field:"companyname",headerName:"Company name",width:250},
    {field:"experience",headerName:"Experience",width:100},
    {field:"salary",headerName:"Salary",width:150},
    {field:"location",headerName:"Location",width:150},
    {field:"lastdate",headerName:"Lastdate",width:100},
     {field:"action",headerName:"Action",width:300,
        renderCell:(params=>(<div>
            <Button color="primary" onClick={() => navigate(`/editjob/${params.row._id}`)}>Edit</Button> 
              <Button color="error" onClick={()=>onDelete(params.row)}>Delete</Button>
                  
        </div>))
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
export default Jobdatagrid;