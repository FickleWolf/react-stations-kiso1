import '../App.css';
import Header from '../component/Header';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function CreateThred() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [threadTittle, setThreadTittle] = useState('');

  async function createThred() {
    if (threadTittle === '') {
      alert('スレッドのタイトルを入力してください。')
      return;
    }

    try {
      const obj = { "title": threadTittle };
      const method = "POST";
      const body = JSON.stringify(obj);
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const request = await fetch(`${baseUrl}/threads`, { method, headers, body });
      await request.json().then((res) => {
        const status = request.status;
        if (status !== 200) {
          alert(`スレッドの作成に失敗しました。\nstuas:${status}`);
          return;
        }
        const threadId = res.id;
        alert(`スレッドを作成しました。\nthreadId:${threadId}`)
        navigate('/');
      })
    }
    catch (error) {
      alert(`スレッドの作成に失敗しました。\nerror:${error}`);
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
          <button onClick={() => {
            createThred();
          }}>作成</button>
        </form>
      </div>
    </div>
  );
}

export default CreateThred;

