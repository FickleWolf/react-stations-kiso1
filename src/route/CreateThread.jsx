import '../App.css';
import Header from '../component/Header';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function CreateThread() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [threadTittle, setThreadTittle] = useState('');
  const [alertText, setAlertText] = useState('');

  async function createThread() {
    if (threadTittle === '') {
      alert('スレッドのタイトルを入力してください。');
      setAlertText('スレッドのタイトルを入力してください。');
      return;
    }

    const obj = { "title": threadTittle };
    const method = "POST";
    const body = JSON.stringify(obj);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    try {
      const responce = await fetch(`${baseUrl}/threads`, { method, headers, body });
      await responce.json().then((json) => {
        const status = responce.status;
        if (status !== 200) {
          alert(`スレッドの作成に失敗しました。\nstuas:${status}`);
          switch (status) {
            case 400:
              setAlertText('スレッドの作成に失敗しました。\nバリデーションエラー');
              return;
            case 500:
              setAlertText('スレッドの作成に失敗しました。\nサーバーでエラーが発生しました。');
              return;
            default:
              setAlertText(`スレッドの作成に失敗しました。\n不明なエラー statusCode:${status}`);
              return;
          }
        }
        
        const threadId = json.id;
        alert(`スレッドを作成しました。\nthreadId:${threadId}`);
        navigate('/');
      })
    }
    catch (error) {
      alert(`スレッドの作成に失敗しました。\nerror:${error}`);
      setAlertText(`スレッドの作成に失敗しました。\n内部エラー\nerror:${error}`);
      return;
    }
  }

  return (
    <div className='app'>
      <Header />
      <div className='wrapper'>
        <h2 >スレッドの作成</h2>
        <form className='form'>
          <textarea
            value={threadTittle}
            required={true}
            placeholder='スレッドのタイトルを入力してください。'
            onChange={(e) => {
              setThreadTittle(e.target.value);
            }} />
          <button onClick={(e) => {
            e.preventDefault();
            setAlertText('');
            createThread();
          }}>作成</button>
          <p className='alert-text'>{alertText}</p>
        </form>
      </div>
    </div>
  );
}

export default CreateThread;

