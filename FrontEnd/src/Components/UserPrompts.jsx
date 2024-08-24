import React, { useState } from 'react';
import { 
    Box,
    Modal,
    Stack,
    Button,
    Typography,
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "fit-content",
    height: "fit-content",
    borderRadius: "2vw",
    bgcolor: 'background.paper',
    boxShadow: '0 0 14px 0px #7b5607',
    padding: "2vw 3vw",
    outline: "none"
};

export default function UserPrompts(props) {
    const { show, title, msg, callback, setShowPrompt } = props;
    const handleClose = () => {
        setShowPrompt(false);
    };

    const handleUserCallBack = () => {
        callback();
        setShowPrompt(false);
    }

    return (
        <Modal
            open={show || false}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ m: 0, fontSize: "1.2vw" }}>
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ m: 0, mb: "1vw", fontSize: "1vw" }}>
                    {msg}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ width: "20vw", mt:"2vw", mb: "1vw", justifyContent: "flex-end" }}>
                    <Button size="small" onClick={handleUserCallBack} sx={{ minWidth: "5vw", padding: 0, fontSize: "1vw" }}>
                        Yes
                    </Button>
                    <Button size="small" onClick={handleClose} sx={{ minWidth: "5vw", padding: 0, fontSize: "1vw" }}>
                        No
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
