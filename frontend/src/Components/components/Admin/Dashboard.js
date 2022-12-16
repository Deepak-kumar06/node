import React, { useEffect, useState } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@mui/material'
import AddAlert from './PopUp'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
    const [userData, setUserData] = useState([])
    const [records, setRecords] = useState([]);
    const [updateData, setUpdataData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
    })
    const { firstName, lastName, email, phone, organization } = updateData

    const [open, setOpen] = useState(false)
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id;
            const response = await fetch(`/user/${id}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setUpdataData(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setUpdataData({ ...updateData, [name]: value });

    };

    const openPopUpUpdate = async (id) => {
        setOpen(`${true} ${id}`)
        console.log(id, "Id user =>>>>>>>>>>>")
        await axios.get(`/user/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res, "teri maa ka __________")
        })
    }
    const [Data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
    })
    const onClose = () => {
        setOpen(false)
    }
    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
            firstName,
            lastName,
            email,
            phone,
            organization
        };

        // This will send a post request to update the data in the database.
        await fetch(`/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        navigate("/");
    }

    const UpdateField = () => {
        return (
            <div className="overflow-auto">
                <form className="Auth-form" onSubmit={onSubmit}>
                    <div className="Auth-form-content">
                        <div className="form-group mt-3">
                            <label>First Name</label>
                            <TextField
                                // error={FirstNameError.length > 0}
                                // helperText={FirstNameError}
                                name="firstName"
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
                                value={firstName}
                                onChange={handleChanged}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Last Name</label>
                            <TextField
                                // error={lastNameError.length > 0}
                                // helperText={lastNameError}
                                name="lastName"
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Kumar"
                                value={lastName}
                                onChange={handleChanged}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email</label>
                            <TextField
                                // error={emailError.length > 0}
                                // helperText={emailError}
                                name="email"
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
                                value={email}
                                onChange={handleChanged}
                            />
                            <div className="form-group mt-3">
                                <label>Phone</label>
                                <TextField
                                    // error={phoneError.length > 0}
                                    // helperText={phoneError}
                                    name="phone"
                                    type="phone"
                                    className="form-control mt-1"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={handleChanged}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Organization</label>
                                <TextField
                                    // error={organizationError.length > 0}
                                    // helperText={organizationError}
                                    name="organization"
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Organization"
                                    value={organization}
                                    onChange={handleChanged}
                                />
                            </div>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
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

    return (<div style={{ marginTop: 20 }}>
        {/* <Drawer anchor='left' sx={{ marginTop: 20, background: 'blue' }} variant="permanent">
            <Box p={2} textAlign="center" width="250px" role='presentation'>
                <Typography variant='h6' component='div'>
                    Sidebar
                </Typography>
            </Box>
        </Drawer> */}
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
                                <Button variant="outlined" color="success" sx={{ marginRight: 1 }} onClick={() => openPopUpUpdate(data._id)}  >EDIT</Button>
                                <Button variant="outlined" color="error" onClick={() => deleteRecord(data._id)}  >DELETE</Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        {/* <UpdateField /> */}
        <AddAlert open={open} onClose={onClose} header="Update Form" >
            <UpdateField />
        </AddAlert>
        <Button onClick={onClose}>PopUp</Button>

    </div>
    )
}

export default Dashboard