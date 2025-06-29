import background from '../../images/HomeBackground.png';
import './Home.scss';
import { Link } from "react-router-dom";
const Home = () => {
    return(
        <div className='background'>
            <h1>Welcome to Habit Tracker</h1>
            <h2> Sign up to start tracking</h2>
            <Link to={"/signUp"} className='button-link'> Sign Up</Link>
            <h2>
                Login if you already have an account
            </h2>
            <Link to={"/login"} className='button-link'>Login</Link>
        </div>
    )
}
export default Home;