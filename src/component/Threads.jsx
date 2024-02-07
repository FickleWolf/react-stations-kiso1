import '../App.css'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const Threads = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    getThreads();
  }, []);

  async function getThreads(offset) {
    try {
      let url = `${baseUrl}/threads`;
      if (offset !== undefined) url += `?offset=${offset}`;

      const response = await fetch(url);
      await response.json().then((data) => {
        const status = response.status;
        if (status !== 200) {
          alert(`スレッドの取得に失敗しました。\nstuas:${status}`);
          return;
        }
        setShowMore(data.length === 10);
        setThreads((prefState) => [
          ...prefState,
          ...data
        ]);
        setLoading(false);
      });
    }
    catch (error) {
      alert(`スレッドの取得に失敗しました。\n${error}`);
      return;
    }
  }

  return (
    <div className='wrapper'>
      <h2 >新着スレッド</h2>
      <div className='threads'>
        {loading ?
          <div className='wrapper-loader'>
            <div className='loader' />
          </div>
          : <>
            {
              threads.map((thread) =>
                <div
                  className='thread'
                  key={thread.id}
                  onClick={() => {
                    navigate(`/thread/${thread.id}`, { state: { threadTittle: thread.title } })
                  }}
                >
                  <p className='thread-id-text'>{`ID:${thread.id}`}</p>
                  <span>{thread.title}</span>
                </div>
              )
            }
            {
              showMore ? <button className='more' onClick={() => {
                const threadLength = threads.length;
                getThreads(threadLength);
              }}>
                もっと表示する
              </button> : null
            }

          </>
        }
      </div>
    </div>
  )
}

export default Threads