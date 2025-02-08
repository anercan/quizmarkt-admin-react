import React, {useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    Fade, FormControl,
    FormControlLabel,
    IconButton, InputLabel, MenuItem,
    Modal, Select,
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
    question?: any;
    quizId: any
}

const QuestionModal: React.FC<IQuizModal> = (props) => {
    const [open, setOpen] = useState(false);
    const [otherSelected, setOtherSelected] = useState(false);

    const [formData, setFormData] = useState({
        id: props.question?.id,
        content: props.question?.content,
        imgUrl: props.question?.imgUrl,
        priority: props.question?.priority || 0,
        active: props.question?.active || true,
        attributes: JSON.stringify(props.question?.attributes) || "{}",
        subject: props.question?.attributes?.subject,
        explanation: props.question?.explanation,
        correctAnswerId:props.question?.correctAnswerId,
        quizId: props.quizId,
        createOrUpdateAnswerList:props?.question?.answersList?.length > 0 ? props.question.answersList : [{correctAnswer:true},{},{},{}]
    });

    useEffect(() => {
        if (props.show) {
            setFormData({
                id: props.question?.id,
                content: props.question?.content,
                imgUrl: props.question?.imgUrl,
                priority: props.question?.priority,
                active: props.question?.active || true,
                attributes: JSON.stringify(props.question?.attributes) || "{}",
                subject: props.question?.attributes?.subject,
                explanation: props.question?.explanation,
                correctAnswerId:props.question?.correctAnswerId,
                quizId: props.quizId,
                createOrUpdateAnswerList:props?.question?.answersList?.length > 0 ? props.question.answersList : [{correctAnswer:true},{},{},{}]
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

    const handleSelect = (e:any) => {
        const {name, value} = e.target;

        if (value == "Other") {
            setOtherSelected(true);
            return;
        } else {
            setOtherSelected(false);
        }

        let parse = JSON.parse(formData?.attributes);
        parse[name] = value;
        formData.attributes = JSON.stringify(parse);
        formData.subject = value;

        setFormData({...formData, attributes: formData.attributes});
    };

    const handleOther = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let parse = JSON.parse(formData?.attributes);
        parse[name] = value;
        formData.attributes = JSON.stringify(parse);
        formData.subject = value;
        setFormData({...formData, attributes: formData.attributes});
    }

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, answer: any) => {
        const {name, value, id} = e.target;
        let updatedAnswers:any = formData.createOrUpdateAnswerList;
        if (props.question) {
            updatedAnswers = formData.createOrUpdateAnswerList?.map((answer: any) => {
                if (answer.id == id) {
                    return {...answer, content: value};
                }
                return answer;
            });
        } else {
            updatedAnswers[name] = {content: value,correctAnswer:answer.correctAnswer};
        }
        setFormData({
            ...formData,
            createOrUpdateAnswerList: updatedAnswers
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formData.createOrUpdateAnswerList = formData.createOrUpdateAnswerList.filter((answer: any) => {
            // Check if the object has any own properties
            return Object.keys(answer).length !== 0;
        });

        apiCall('/save-question', 'POST', formData)
            .then(() => props.refresh())
            .catch(() => {
                props.refresh()
                alert('Created')
            });
        handleClose();
        props.onClose();
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, active: e.target.checked});
    };

    const subjects = [
        "Values and principles of the UK",
        "UK Geography",
        "Britain Since 1945",
        "A global power",
        "The 20th century",
        "The Middle Ages",
        "The Tudors and Stuarts",
        "Early Britain",
        "Arts and Culture",
        "Traditions and Customs",
        "Early Britain",
        "Leisure",
        "British Literature",
        "Place of interest",
        "Religion",
        "Sport",
        "The UK Today",
        "The development of British democracy",
        "The British constitution",
        "Respecting the Law",
        "British Literature",
        "Famous People and Achievements",
        "Other"
    ];

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
                            width: '60%',
                            bgcolor: 'background.paper',
                            overflowY: "auto",
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="h6">
                                {props.question ? 'Question - ' + props.question.id : 'Create Question'}
                            </Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Box display="flex" gap={2} flexDirection="row" flexWrap="wrap">
                                <Box flex="1">
                                    {props.question &&
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
                                        label="Content"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="content"
                                        multiline
                                        value={formData.content}
                                        onChange={handleChange}
                                    />
                                    <FormControl fullWidth margin="normal" variant="outlined">
                                        <InputLabel id="subject-label">Subject</InputLabel>
                                        <Select
                                            labelId="subject-label"
                                            id="subject-select"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleSelect}
                                            label="Subject"
                                        >
                                            {subjects.map((subject) => (
                                                <MenuItem key={subject} value={subject}>
                                                    {subject}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {otherSelected &&
                                        <TextField
                                            label="Other Subject"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleOther}
                                        />}
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
                                    {props.question?.correctAnswerId &&
                                        <TextField
                                            label="Correct Answer ID"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            name="correctAnswerId"
                                            value={formData.correctAnswerId}
                                            onChange={handleChange}
                                            disabled={true}
                                        />}
                                    <TextField
                                        label="Image Url"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="imgUrl"
                                        value={formData.imgUrl}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        label="Explanation"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="explanation"
                                        value={formData.explanation}
                                        onChange={handleChange}
                                        multiline
                                        rows={3}
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
                                </Box>
                                <Box flex="1">
                                    <b>Answers</b>
                                    {formData.createOrUpdateAnswerList?.map((answer: any,index:any) => (
                                            <TextField
                                                id={answer?.id}
                                                label={(props?.question && answer?.id === props?.question?.correctAnswerId) || answer.correctAnswer ? 'Correct Answer' : 'Wrong Answer'}
                                                variant="filled"
                                                fullWidth
                                                margin="normal"
                                                name={index}
                                                value={answer?.content}
                                                onChange={(e:any) => handleAnswerChange(e,answer)}
                                                sx={{
                                                    '.MuiFilledInput-root': {
                                                        backgroundColor: (props?.question && answer?.id === props?.question?.correctAnswerId) || answer.correctAnswer ? '#5bad51' : '#a78484',
                                                    },
                                                }}
                                                required={true}/>
                                        )
                                    )}

                                </Box>
                            </Box>

                            <Button onClick={(e) => handleSubmit(e)}
                                    variant="contained"
                                    color="primary" fullWidth>
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default QuestionModal;
