import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>404 Not Found</h2>
            <p>Page could not be found.</p>
            <Link to="/">Take me back to Home</Link>
        </div>
    );
}

export default NotFound;