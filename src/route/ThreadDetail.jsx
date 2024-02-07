import '../App.css';
import Header from '../component/Header';
import { Posts } from '../component/Posts';
import { useParams } from 'react-router-dom';

function ThreadDetail() {
    const params = useParams();
    const threadId = params.id;

    return (
        <div className='app'>
            <Header />
            <Posts threadId={threadId} />
        </div>
    );
}

export default ThreadDetail;
