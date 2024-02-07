import "../App.css"
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <h1
        className="logo-text"
        onClick={() => { navigate('/') }}
      >
        掲示板
      </h1>
      <Link to="/thread/new" className="link">スレッドをたてる</Link>
    </header>
  )
}

export default Header