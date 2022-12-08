import React, { useState } from 'react';
import { Pagination as MUIPagination } from "@material-ui/lab";

export const Pagination = ({ _DATA, PER_PAGE, rawData, variant, color }) => {

    const [page, setPage] = useState(1);
    const count = Math.ceil(rawData.length / PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return <MUIPagination
        count={count}
        page={page}
        variant={variant}
        onChange={handleChange}
        color={color}
    />

}
