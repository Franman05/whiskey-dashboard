import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from '@material-ui/core';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { WhiskeyForm } from '../WhiskeyForm';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'name', headerName: 'Whiskey Name', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'size', headerName: 'Size', flex: 1 },
    { field: 'proof', headerName: 'Proof', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
];

interface gridData {
    data: {
        id?:string
    }
}

export const DataTable = () => {

    let { whiskeyData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({data:{}});
    const [selectionModel, setSelectionModel] = useState<any>([]);
    

    let handleOpen = () => {
        setOpen(true)
    };
    let handleClose = () => {
        setOpen(false)
    };

    let deleteData = () => {
        server_calls.delete(selectionModel);
        console.log(gridData.data.id);
        getData();
        setTimeout( () => { window.location.reload(); }, 1000)
    }

    console.log(gridData.data.id!);
    console.log(`testing for data ${whiskeyData}`)


    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2>My List</h2>

        <DataGrid rows={ whiskeyData } columns={ columns } pageSize={ 5 } checkboxSelection={true} 
        onSelectionModelChange={ (item) => {
            setSelectionModel(item)
          }}/>

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

        {/* Dialog pop-up */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update List {selectionModel}</DialogTitle>
            <DialogContent>
                <DialogContentText>Update List</DialogContentText>
                    <WhiskeyForm id={selectionModel!}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color="primary">Done</Button>
            </DialogActions>
        </Dialog>
            
        </div>
    )
}