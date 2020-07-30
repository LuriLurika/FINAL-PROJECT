import React from 'react'

import Table from 'react-bootstrap/Table'

import './index.css'

const CustomTable = ({ data, header, rowMap }) => {
    return (
        <Table className="data-table" hover>
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