import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import QuizCrud from "../pages/QuizCrud";
import QuestionsCrud from "../pages/QuestionsCrud";
import Login from "../pages/Login";
import QuizGroupCrud from "../pages/QuizGroupCrud";

export const routes = [
    {path: '/', element: <Login/>, title: 'Login'},
    {path: '/dashboard', element: <Dashboard/>, title: 'Dashboard'},
    {path: '/users', element: <Users/>, title: 'Users'},
    {path: '/quiz-group', element: <QuizGroupCrud/>, title: 'Quiz Groups'},
    {path: '/quizzes', element: <QuizCrud/>, title: 'Quiz List'},
    {path: '/questions', element: <QuestionsCrud/>, title: 'Questions List'},
];
