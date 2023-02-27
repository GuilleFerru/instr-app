import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { formatDate } from '../../../../../Services/DateUtils';

export const NextEmpHoliday = ({ employee }) => {
    return (
        <div >
            <List dense disablePadding>
                <ListItem disableGutters>
                    <ListItemText primary={
                        <Typography variant="body2" color="textSecondary">
                            {employee.employeeName}: Del {formatDate(employee.startDate)} al {formatDate(employee.endDate)}. {employee.qtyDays} días.
                        </Typography>
                    } />
                </ListItem>
            </List>
        </div>
    )
}
