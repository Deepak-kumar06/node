import React, { Fragment, useState } from 'react';
import { Table, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Data from './Data';

const Home = () => {
    return (
        <Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>

                    {Data.map((item) => (
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <th>{item.name}</th>
                            <th>{item.age}</th>
                        </tr>
                    ))}

                </tbody>

            </Table>
        </Fragment>
    )
}

export default Home