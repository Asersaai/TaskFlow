import {Link} from "react-router-dom";

function Error404Page(){
    return (
        <div>
            <h2>Page not found</h2>
            <p>The page you requested does not exist.</p>
            <Link className="button_login not-found-link" to="/login">Back to login</Link>
        </div>
    );
}
export default Error404Page;
