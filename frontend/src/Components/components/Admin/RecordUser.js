import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import Popup from './PopUp'
import axios from 'axios'
import UpdateField from './UpdateField'

const RecordUser = () => {
    const [userData, setUserData] = useState([])
    const [open, setOpen] = useState(false)
    const [updateData, setUpdataData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
    })


    const getRecords = async () => {
        const response = await fetch(`/user`);

        if (!response === 200) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const records = await response.json();
        setUserData(records);
        console.log("giltgufklwhi", records.firstName)
    }
    useEffect(() => {

        getRecords();

        return;
    }, [userData.length]);
    const onClose = () => {
        setOpen(false)
    }
    const getData = async (id) => {
        await axios.get(`/gettinguserdata/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res.data, "deepak ki jai")
            setUpdataData(res.data)
            setOpen(true);
        })
    }
    // async function onSubmit(e) {
    //     e.preventDefault();
    //     const editedPerson = {
    //         firstName,
    //         lastName,
    //         email,
    //         phone,
    //         organization
    //     };

    //     // This will send a post request to update the data in the database.
    //     await fetch(`/update/${params.id}`, {
    //         method: "POST",
    //         body: JSON.stringify(editedPerson),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     });
    //     // navigate("/");
    // }

    const deleteRecord = async (id) => {
        await fetch(`/deluser/${id}`, {
            method: "DELETE"
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }
        );

        const newRecords = userData.filter((el) => el._id !== id);
        setUserData(newRecords);
    }
    return (
        <div style={{ marginTop: 20 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData.map((data, index) => {
                        console.log(data, "cde3gffhr.lgfewr/l.g")
                        return (
                            <TableRow key={index}>
                                <TableCell>{data.firstName}</TableCell>
                                <TableCell>{data.lastName}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="success" sx={{ marginRight: 1 }} onClick={() => getData(data._id)}>EDIT</Button>
                                    <Button variant="outlined" color="error" onClick={() => deleteRecord(data._id)}  >DELETE</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {/* <UpdateField /> */}
            <Popup open={open} onClose={onClose} header="Update Form"  >
                <UpdateField firstName={updateData.firstName}
                    lastName={updateData.lastName}
                    email={updateData.email}
                    phone={updateData.phone}
                    organization={updateData.organization} />
            </Popup>

        </div>
    )
}

export default RecordUser