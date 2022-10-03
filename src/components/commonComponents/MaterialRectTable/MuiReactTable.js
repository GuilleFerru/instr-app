// import React from 'react';
// import MaterialReactTable from 'material-react-table';
// import { MRT_Localization_ES } from 'material-react-table/locales/es';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Typography from '@mui/material/Typography';
// import MenuItem from '@mui/material/MenuItem';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';





// export const MuiReactTable = ({ data, columns, initialState, enableRowSelection, enableEditing, editingMode, positionActionsColumn }) => {
//     //should be memoized or stable

//     // const memoColumns = useMemo(
//     //     () => columns, [columns],);




//     return <MaterialReactTable
//         columns={columns}
//         data={data}
//         initialState={initialState}
//         enableRowSelection={enableRowSelection}
//         enableEditing={enableEditing}
//         localization={MRT_Localization_ES}
//         editingMode={editingMode}
//         positionActionsColumn={positionActionsColumn}
//         enableRowActions
//         renderRowActionMenuItems={({ row, closeMenu }) => [
//             <MenuItem key={1}
//                 onClick={() => {
//                     console.info('Delete');
//                     console.info(row);
//                     closeMenu();
//                 }}
//             >
//                 <ListItemIcon>
//                     <DeleteOutlineIcon fontSize="small" />
//                 </ListItemIcon>
//                 <Typography variant="inherit">Borrar</Typography>
//             </MenuItem>
//             // <MenuItem key={index} onClick={() => console.info('Delete')}>Borrar</MenuItem>
//         ]}


//     />;
// }