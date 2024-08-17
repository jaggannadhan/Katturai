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
    width: "40vw",
    height: "12vw",
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {msg}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 1, justifyContent: "flex-end" }}>
                    <Button size="small" onClick={handleUserCallBack}>
                        Yes
                    </Button>
                    <Button size="small" onClick={handleClose}>
                        No
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
