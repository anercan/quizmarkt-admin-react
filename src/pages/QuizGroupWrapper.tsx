import { useSearchParams } from 'react-router-dom';
import QuizGroupCrud from './QuizGroupCrud';

export const QuizGroupCrudWrapper = () => {
    const [searchParams] = useSearchParams();
    const appId = Number(searchParams.get('appId')) || 0;
    console.log('gırd')
    return <QuizGroupCrud appId={appId} />;
}
