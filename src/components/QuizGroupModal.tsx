import React, {useEffect, useState} from 'react';
import {
    Modal, Box, Typography, TextField, Button, Backdrop, Fade, IconButton, FormControlLabel, Switch
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {apiCall} from "../utils/apiCaller";

interface IQuizGroupModal {
    show: boolean;
    onClose: () => void;
    refresh: () => void;
    quizGroup?: any;
}

const QuizGroupModal: React.FC<IQuizGroupModal> = (props) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: props.quizGroup?.id,
        title: props.quizGroup?.title,
        description: props.quizGroup?.description,
        priority: props.quizGroup?.priority,
        active: props.quizGroup?.active,
        attributes: JSON.stringify(props.quizGroup?.attributes)
    });

    useEffect(() => {
        if (props.show) {
            setFormData({
                id: props.quizGroup?.id,
                title: props.quizGroup?.title,
                description: props.quizGroup?.description,
                priority: props.quizGroup?.priority,
                active: props.quizGroup?.active,
                attributes: JSON.stringify(props.quizGroup?.attributes)
            });
            handleOpen();
        }
    }, [props.show]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        props.onClose();
        setOpen(false)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        apiCall('/save-quiz-group', 'POST', formData)
            .then(() => props.refresh())
            .catch(() => {props.refresh()});
        handleClose();
        props.onClose();
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, active: e.target.checked });
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 24,
                            overflowY: "auto",
                            p: 4,
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="h6">
                                {props.quizGroup ? 'Quiz Group - ' + props.quizGroup.id : 'Create Quiz Group'}
                            </Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            {props.quizGroup &&
                                <TextField
                                    label="id"
                                    variant="outlined"
                                    disabled={true}
                                    fullWidth
                                    margin="normal"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                />}

                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Attributes"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="attributes"
                                value={formData.attributes}
                                onChange={handleChange}
                            />
                            <TextField
                                type={"number"}
                                label="Priority"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.active}
                                        onChange={handleSwitchChange}
                                        name="isActive"
                                        color="primary"
                                    />
                                }
                                label={formData.active ? 'Active' : 'Passive'}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default QuizGroupModal;
