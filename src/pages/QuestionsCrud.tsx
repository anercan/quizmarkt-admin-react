import React, {useEffect, useState} from "react";
import {apiCall} from "../utils/apiCaller";
import {
    Button,
    Paper, Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow,
    Typography
} from "@mui/material";
import {useLocation, useSearchParams} from "react-router-dom";
import QuestionModal from "../components/QuestionModal";

interface IQuestionsCrud {
}

const QuestionsCrud: React.FC<IQuestionsCrud> = (props) => {

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const questionList:any  = location.state as { questionList: any[] };
    const quizId = searchParams.get('quizId') || undefined;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState({});

    useEffect(() => {
        fetchAndSetData();
    }, []);

    const fetchAndSetData = async () => {
        try {
            console.log(questionList)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const editQuestion = (item: any) => {
        setSelectedQuestion(item);
        setShowEditModal(true);
    }

    return (
        <>
            <QuestionModal show={showEditModal} quizId={quizId} onClose={() => setShowEditModal(false)} question={selectedQuestion} refresh={() => fetchAndSetData()}/>
            <Paper sx={{width: '100%', overflow: 'hidden', p: 4}}>
                <div style={{marginBottom: 20}}>
                    <Button
                        onClick={()=> editQuestion(undefined)}
                        variant="contained"
                        color="info">
                        New Question
                    </Button>
                </div>
                <Typography variant="h4" gutterBottom>
                    Questions of {quizId}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Content</TableCell>
                                <TableCell color='info' align="left">Created Date</TableCell>
                                <TableCell color='info' align="left">Image Url</TableCell>
                                <TableCell color='info' align="left">Priority</TableCell>
                                <TableCell align="left">Attributes</TableCell>
                                <TableCell align="left">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questionList?.map((item: any, index:any) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell
                                        align="left"
                                        style={{
                                            color: item.active ? '#ffffff' : '#c20101',
                                        }}>
                                        {item.content}
                                    </TableCell>
                                    <TableCell align="left">{item.createdDate}</TableCell>
                                    <TableCell align="left">{item.imgUrl}</TableCell>
                                    <TableCell align="left">{item.priority}</TableCell>
                                    <TableCell align="left">{JSON.stringify(item.attributes)}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => editQuestion(item)} color={'info'}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*<TablePagination
                component="div"
                count={totalItems}
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={itemsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />*/}
            </Paper>
        </>
    );
};

export default QuestionsCrud;
