import Dashboard from "../pages/Dashboard";
import QuizData from "../pages/QuizData";
import Users from "../pages/Users";
import QuizCrud from "../pages/QuizCrud";
import QuestionsCrud from "../pages/QuestionsCrud";
import Login from "../pages/Login";
import {QuizGroupCrudWrapper} from "../pages/QuizGroupWrapper";

export const routes = [
    {path: '/', element: <Login/>, title: 'Login'},
    {path: '/dashboard', element: <Dashboard/>, title: 'Dashboard'},
    {path: '/data', element: <QuizData/>, title: 'Data'},
    {path: '/users', element: <Users/>, title: 'Users'},
    {path: '/quiz-group', element: <QuizGroupCrudWrapper/>, title: 'Life In the UK Data'},
    {path: '/quizzes', element: <QuizCrud appId={1}/>, title: 'Quiz List'},
    {path: '/questions', element: <QuestionsCrud/>, title: 'Questions List'},
];
