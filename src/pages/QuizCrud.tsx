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
import QuizModal from "../components/QuizModal";
import {useNavigate, useSearchParams} from "react-router-dom";

interface AppCrudOperationProps {
    appId: number;
}

const QuizCrud: React.FC<AppCrudOperationProps> = (props) => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get('groupId') || undefined;
    const [quizList, setQuizList] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    useEffect(() => {
        fetchAndSetData();
        console.log(quizList)
    }, []);

    const fetchAndSetData = async () => {
        try {
            let body = {
                page: 0,
                pageSize: 25,
            } as { page: number; pageSize: number; quizGroupId?: number };

            if (groupId) {
                body.quizGroupId = Number(groupId);
            }
            let quizList = await apiCall('/get-quizzes', 'POST', body);
            setQuizList(quizList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const editQuiz = (item: any) => {
        setSelectedQuiz(item);
        setShowEditModal(true);
    }

    const routeQuiz = (quiz:any) => {
        console.log('route',quiz.questionList)
        navigate(`/questions?quizId=${quiz.id}`, {state: quiz.questionList});
    }

    return (
        <>
            <QuizModal show={showEditModal} groupId={groupId} onClose={() => setShowEditModal(false)} quiz={selectedQuiz} refresh={() => fetchAndSetData()}/>
            <Paper sx={{width: '100%', overflow: 'hidden', p: 4}}>
                <div style={{marginBottom: 20}}>
                    <Button
                        onClick={()=> editQuiz(undefined)}
                        variant="contained"
                        color="info">
                        New Quiz
                    </Button>
                </div>
                <Typography variant="h4" gutterBottom>
                    Quiz List {groupId ? 'of id: ' + groupId + ' Group' : ''}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell color='info' align="left">Created Date</TableCell>
                                <TableCell align="left">Quiz Groups</TableCell>
                                <TableCell align="left">Attributes</TableCell>
                                <TableCell align="left">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quizList.map((item: any, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell
                                        onClick={() => routeQuiz(item)}
                                        align="left"
                                        style={{
                                            color: item.active ? '#ffffff' : '#c20101',
                                            textDecoration: 'underline',
                                            textDecorationColor: '#ccffe8' ,
                                            cursor: 'pointer'
                                        }}>
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="left">{item.createdDate}</TableCell>
                                    <TableCell align="left">{item.quizGroupList?.map((quizGroup:any) => quizGroup.id).join(', ')}</TableCell>
                                    <TableCell align="left">{JSON.stringify(item.attributes)}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => editQuiz(item)} color={'info'}>Edit</Button>
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

export default QuizCrud;
