import React, { Component } from 'react'

import Table from 'react-bootstrap/Table'


const CustomTable = ({ data, header, rowMap }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                   {header}
                </tr>
            </thead>
            <tbody>
                {data.map(rowMap)}                
            </tbody>
        </Table>
    )
}

export default CustomTable