import '../App.css'
import CreatePost from './CreatePost';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

export const Posts = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const threadId = props.threadId;
  const threadTittle = location.state.threadTittle;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts(offset) {
    if (threadId === undefined) {
      alert('threadIdが指定されていません。');
      navigate('/');
      return;
    }

    try {
      let url = `${baseUrl}/threads/${threadId}/posts`;
      if (offset !== undefined) url += `?offset=${offset}`;
      else setPosts([]);

      const response = await fetch(url);
      await response.json().then((data) => {
        const status = response.status;
        if (status !== 200) {
          alert(`投稿の取得に失敗しました。\nstuas:${status}`);
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

            </>
          }
        </div>
      </div>
    </>
  )
}

export default Posts