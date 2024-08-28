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
import {Link, useNavigate} from "react-router-dom";
import QuizGroupModal from "../components/QuizGroupModal";

interface AppCrudOperationProps {
    appId: number;
}

const QuizGroupCrud: React.FC<AppCrudOperationProps> = (props) => {

    const navigate = useNavigate();
    const [quizGroupList, setQuizGroupList] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedQuizGroup, setSelectedQuizGroup] = useState({});

    useEffect(() => {
        fetchAndSetData();
        console.log(quizGroupList)
    }, []);

    const fetchAndSetData = async () => {
        try {
            let quizList = await apiCall('/get-quiz-groups', 'POST', {'page': 0, 'pageSize': 25});
            setQuizGroupList(quizList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const editQuizGroup = (item: any) => {
        setSelectedQuizGroup(item);
        setShowEditModal(true);
    }

    const routeQuizList = (id:any) => {
        navigate(`/quizzes?groupId=${id}`);
    }

    return (
        <>
            <QuizGroupModal show={showEditModal} onClose={() => setShowEditModal(false)} quizGroup={selectedQuizGroup} refresh={() => fetchAndSetData()}/>
            <div style={{marginBottom: 20}}>
                <Button
                    component={Link as any}
                    to="/quizzes"
                    variant="contained"
                    color="info">
                    All Quizzes
                </Button>
            </div>
            <Paper sx={{width: '100%', overflow: 'hidden', p: 4}}>
                <div style={{marginBottom: 20}}>
                    <Button
                        onClick={()=> editQuizGroup(undefined)}
                        variant="contained"
                        color="info">
                        New Quiz Group
                    </Button>
                </div>
                <Typography variant="h4" gutterBottom>
                    Quiz Groups
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell color='info' align="left">Last Modified Date</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Active Quizzes</TableCell>
                                <TableCell align="left">Attributes</TableCell>
                                <TableCell align="left">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quizGroupList.map((item: any, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="left">{item.lastModifiedDate}</TableCell>
                                    <TableCell
                                        onClick={() => routeQuizList(item.id)}
                                        align="left"
                                        style={{
                                            color: item.active ? '#ffffff' : '#c20101',
                                            textDecoration: 'underline',
                                            textDecorationColor: '#ccffe8' ,
                                            cursor: 'pointer'
                                        }}>
                                        {item.title}
                                    </TableCell>
                                    <TableCell align="left">{item.description}</TableCell>
                                    <TableCell align="left">{item.quizQuantity}</TableCell>
                                    <TableCell align="left">{JSON.stringify(item.attributes)}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => editQuizGroup(item)} color={'info'}>Edit</Button>
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

export default QuizGroupCrud;
