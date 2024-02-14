import "../App.css";
import { useState } from 'react';

export const CreatePost = (props) => {
  const threadId = props.threadId;
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const setShowCreatePost = props.setShowCreatePost;
  const getPosts = props.getPosts;
  const [postContent, setPostContent] = useState('');
  const [alertText, setAlertText] = useState('');

  async function createPost() {
    if (postContent === '') {
      alert('投稿内容を入力してください。');
      setAlertText('投稿内容を入力してください。');
      return;
    }

    const obj = { "post": postContent };
    const method = "POST";
    const body = JSON.stringify(obj);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    try {
      const responce = await fetch(`${baseUrl}/threads/${threadId}/posts`, { method, headers, body });
      await responce.json().then((json) => {
        const status = responce.status;
        if (status !== 200) {
          alert(`投稿に失敗しました。\nstuas:${status}`);
          switch (status) {
            case 400:
              setAlertText('投稿に失敗しました。\nバリデーションエラー');
              return;
            case 500:
              setAlertText('投稿に失敗しました。\nサーバーでエラーが発生しました。');
              return;
            default:
              setAlertText(`投稿に失敗しました。\n不明なエラー statusCode:${status}`);
              return;
          }
        }
        const postId = json.id;
        alert(`投稿しました。\npostId:${postId}`);
        getPosts();
        setShowCreatePost(false);
      })
    }
    catch (error) {
      alert(`投稿に失敗しました。\n内部エラー\nerror:${error}`);
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
          <button onClick={(e) => {
            e.preventDefault();
            setAlertText('');
            createPost();
          }}>作成</button>
          <p className='alert-text'>{alertText}</p>
        </form>
      </div>
    </div>
  )
}

export default CreatePost