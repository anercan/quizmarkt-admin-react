import Dashboard from "../pages/Dashboard";
import Data from "../pages/Data";
import QuizGroupCrud from "../pages/QuizGroupCrud";
import Users from "../pages/Users";
import QuizCrud from "../pages/QuizCrud";
import QuestionsCrud from "../pages/QuestionsCrud";

export const routes = [
    {path: '/', element: <Dashboard/>, title: 'Home'},
    {path: '/dashboard', element: <Dashboard/>, title: 'Dashboard'},
    {path: '/data', element: <Data/>, title: 'Data'},
    {path: '/users', element: <Users/>, title: 'Users'},
    {path: '/life-in-the-uk-data', element: <QuizGroupCrud appId={1} />, title: 'Life In the UK Data'},
    {path: '/quizzes', element: <QuizCrud appId={1} />, title: 'Quiz List'},
    {path: '/questions', element: <QuestionsCrud/>, title: 'Questions List'},
];
