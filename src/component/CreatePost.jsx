import "../App.css";
import { useState } from 'react';

export const CreatePost = (props) => {
  const threadId = props.threadId;
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const setShowCreatePost = props.setShowCreatePost;
  const getPosts = props.getPosts;
  const [postContent, setPostContent] = useState('');

  async function createPost() {
    if (postContent === '') {
      alert('投稿内容を入力してください。')
      return;
    }

    try {
      const obj = { "post": postContent };
      const method = "POST";
      const body = JSON.stringify(obj);
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const request = await fetch(`${baseUrl}/threads/${threadId}/posts`, { method, headers, body });
      await request.json().then((res) => {
        const status = request.status;
        if (status !== 200) {
          alert(`投稿に失敗しました。\nstuas:${status}`);
          return;
        }
        const postId = res.id;
        alert(`投稿しました。\npostId:${postId}`);
        getPosts();
        setShowCreatePost(false);
      })
    }
    catch (error) {
      alert(`投稿に失敗しました。\nerror:${error}`);
      return;
    }
  }

  return (
    <div className='create-post'>
      <div className='create-post-body'>
        <img src='../icon/close_icon.svg' alt='close-icon' className='close-icon' onClick={() => setShowCreatePost(false)} />
        <h2 >投稿の作成</h2>
        <form className='form'>
          <textarea
            value={postContent}
            required={true}
            placeholder='投稿内容を入力してください。'
            onChange={(e) => {
              setPostContent(e.target.value);
            }} />
          <button onClick={() => {
            createPost()
          }}>作成</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost