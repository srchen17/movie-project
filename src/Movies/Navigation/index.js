import {Link, useLocation} from "react-router-dom";
import './styles.css';
function Navigation(){
    const links = ["Home","Profile","Search","Register"];
    const {pathname} = useLocation();
    return (

        <div className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" >

            {links.map((link, index) => (
                <Link
                    key={index}
                    to={`/${link}`}
                    className={`nav-item nav-link mx-4 me-4  my-lg-0 ${pathname.includes(link) && "active"}`}>
                    {link}
                </Link>

            ))}
            </div>



    );
}

export default Navigation;