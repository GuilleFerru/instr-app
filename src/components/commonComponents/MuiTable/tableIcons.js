import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ListAltIcon from '@material-ui/icons/ListAlt';
import UpdateIcon from '@material-ui/icons/Update';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import BuildIcon from '@material-ui/icons/Build';
import BackupIcon from '@material-ui/icons/Backup';
import ExploreIcon from '@material-ui/icons/Explore';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';



export const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Duplicate: forwardRef((props, ref) => <LibraryAddIcon {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Complete: forwardRef((props, ref) => <AssignmentTurnedInIcon {...props} ref={ref} />),
    Aditional: forwardRef((props, ref) => <DynamicFeedIcon {...props} ref={ref} />),
    ListAll: forwardRef((props, ref) => <ListAltIcon {...props} ref={ref} />),
    Update: forwardRef((props, ref) => <UpdateIcon {...props} ref={ref} />),
    DailyShift: forwardRef((props, ref) => <DateRangeIcon {...props} ref={ref} />),
    DeleteSweep: forwardRef((props, ref) => <DeleteSweepIcon {...props} ref={ref} />),
    EditTwo: forwardRef((props, ref) => <BuildIcon {...props} ref={ref} />),
    Backup: forwardRef((props, ref) => <BackupIcon {...props} ref={ref} />),
    ExploreIcon: forwardRef((props, ref) => <ExploreIcon {...props} ref={ref} />),
    EditAttributesIcon: forwardRef((props, ref) => <EditAttributesIcon {...props} ref={ref} />),
};