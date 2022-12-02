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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {Data.map((item) => (
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <th>{item.firstname}</th>
                            <th>{item.lastname}</th>
                            <th>{item.age}</th>
                            <Button style={{ height: 25, width: 60, background: 'red' }}>Edit</Button>{' '}
                        </tr>
                    ))}

                </tbody>

            </Table>
        </Fragment>
    )
}

export default Home