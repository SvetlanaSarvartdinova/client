import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {Button} from "@mui/material"

const Pages = observer(() => {
    const {serial} = useContext(Context)
    const pageCount = Math.ceil( 30 / serial.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Button key={page} onClick={() => serial.setPage(page)}>
                <Pagination.Item key={page}>
                    {page}
                </Pagination.Item>
                </Button>
            )}
        </Pagination>
    );
});

export default Pages;