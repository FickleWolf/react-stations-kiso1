import '../App.css'
import CreatePost from './CreatePost';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

export const Posts = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const threadId = props.threadId;
  const [threadTittle, setThreadTittle] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [alertText, setAlertText] = useState('');

  useEffect(() => {
    setThreadTittle(location.state.threadTittle)
    getPosts();
  }, []);

  async function getPosts(offset) {
    if (threadId === undefined) {
      alert('threadIdが指定されていません。');
      navigate('/');
      return;
    }

    let url = `${baseUrl}/threads/${threadId}/posts`;
    if (offset !== undefined) url += `?offset=${offset}`;
    else setPosts([]);

    try {
      const response = await fetch(url);
      await response.json().then((data) => {
        const status = response.status;
        if (status !== 200) {
          alert(`投稿の取得に失敗しました。\nstuas:${status}`);
          switch (status) {
            case 400:
              setAlertText('投稿の取得に失敗しました。\nバリデーションエラー');
              break;
            case 404:
              setAlertText('投稿の取得に失敗しました。\nそのスレッドは存在しません。');
              break;
            case 500:
              setAlertText('投稿の取得に失敗しました。\nサーバーでエラーが発生しました。');
              break;
            default:
              setAlertText(`投稿の取得に失敗しました。\n不明なエラー statusCode:${status}`);
              break;
          }
          setLoading(false);
          return;
        }
        setShowMore(data.posts.length === 10);
        setPosts((prefState) => [
          ...prefState,
          ...data.posts
        ]);
        setLoading(false);
      });
    }
    catch (error) {
      alert(`投稿の取得に失敗しました。\n${error}`);
      setAlertText(`投稿の取得に失敗しました。\n${error}`);
      setLoading(false);
      return;
    }
  }

  return (
    <>
      {
        showCreatePost ? <CreatePost getPosts={getPosts} threadId={threadId} setShowCreatePost={setShowCreatePost} /> : null
      }
      <div className='wrapper'>
        <h2 >{threadTittle}</h2>
        <div className='posts'>
          {loading ?
            <div className='wrapper-loader'>
              <div className='loader' />
            </div>
            : <>
              <img src='../icon/post_icon.svg' alt='post-icon' className='post-icon' onClick={() => setShowCreatePost(true)} />
              {posts.map((post) =>
                <div className='post' key={post.id}>
                  <span>{post.post}</span>
                </div>
              )}
              {
                showMore ? <button className='more' onClick={() => {
                  const postsLength = posts.length;
                  getPosts(postsLength);
                }}>
                  もっと表示する
                </button> : null
              }
              <p className='alert-text'>{alertText}</p>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Posts