import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@mui/material'

const UpdateField = (props) => {

    const { firstName, lastName, email, phone, organization, handleChanged, onSubmit } = props
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
export default UpdateField;