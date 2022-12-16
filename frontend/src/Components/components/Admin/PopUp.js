import React from "react";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

const Popup = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{ color: "#5c3d0b", textAlign: 'center' }} id="alert-dialog-title">
                {props.header}
            </DialogTitle>
            <DialogContent >
                <DialogContentText
                    sx={{ color: "#5c3d0b" }}
                // id="alert-dialog-description"
                >
                    {props.children}
                </DialogContentText>
            </DialogContent>
            {/* <DialogActions>
                <Button
                    sx={{
                        color: "#fff",
                        background: "#f27630",
                        width: 100,
                        height: "30px",
                        ":hover": { background: "#f27630" },
                    }}
                    onClick={props.onClose}
                >
                    Update
                </Button>
            </DialogActions> */}
        </Dialog>
    );
}

export default Popup;