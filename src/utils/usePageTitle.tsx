import {useLocation} from 'react-router-dom';
import {routes} from "./routes";


export const usePageTitle = () => {
    const location: any = useLocation();
    const title = routes.filter(r => r.path === location.pathname)[0].title
    return title || '';
};
