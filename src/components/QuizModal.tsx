import React, {useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControlLabel,
    IconButton,
    Modal,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {apiCall} from "../utils/apiCaller";

interface IQuizModal {
    show: boolean;
    onClose: () => void;
    refresh: () => void;
    quiz?: any;
    groupId?:any
}

const QuizModal: React.FC<IQuizModal> = (props) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: props.quiz?.id,
        name: props.quiz?.name,
        priority: props.quiz?.priority,
        active: props.quiz?.active,
        quizGroupIds:props.quiz?.quizGroupList?.map((q:any)=> q.id).join(','),
        attributes: JSON.stringify(props.quiz?.attributes),
        isPremium: !props.quiz?.availablePremiumTypes?.includes('NONE'),
        availablePremiumTypes:['']
    });

    useEffect(() => {
        if (props.show) {
            setFormData({
                id: props.quiz?.id,
                name: props.quiz?.name,
                priority: props.quiz?.priority,
                active: props.quiz?.active,
                quizGroupIds:props.quiz ? props.quiz?.quizGroupList.map((q:any)=> q.id).join(',') : props.groupId,
                attributes: JSON.stringify(props.quiz?.attributes),
                isPremium: !props.quiz?.availablePremiumTypes?.includes('NONE'),
                availablePremiumTypes:['']
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
        formData.quizGroupIds = formData?.quizGroupIds?.split(',').map(Number);

        let premiumTypes = [];
        if(formData.isPremium) {
            premiumTypes.push("LEVEL1");
        } else {
            premiumTypes.push("LEVEL1");
            premiumTypes.push("NONE");
        }

        formData.availablePremiumTypes = premiumTypes;
        apiCall('/save-quiz', 'POST', formData)
            .then(() => {
                props.refresh();
                alert('Created')
            })
            .catch(() => {props.refresh()});
        handleClose();
        props.onClose();
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.checked});
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
                            p: 4,
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="h6">
                                {props.quiz ? 'Quiz - ' + props.quiz.id : 'Create Quiz'}
                            </Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            {props.quiz &&
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
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="name"
                                value={formData.name}
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
                            <TextField
                                label="Quiz Groups (add with comma)"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                disabled={props.quiz == undefined && props.groupId}
                                name="quizGroupIds"
                                value={formData.quizGroupIds}
                                onChange={handleChange}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isPremium}
                                        onChange={handleSwitchChange}
                                        name="isPremium"
                                        color="primary"
                                    />
                                }
                                label={'isPremium'}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.active}
                                        onChange={handleSwitchChange}
                                        name="active"
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

export default QuizModal;
