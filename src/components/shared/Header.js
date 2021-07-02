import { FaFacebookSquare, FaInstagramSquare, FaTwitter } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';
const Header = () => {
    return (
        <div className="header">
            <div className="container">

                <div className="logo">
                    <a href="/">
                    <h1>News<span>Reader</span></h1>
                    </a>
                </div>

                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <div className="header-socials">
                    <FaTwitter size={25} />
                    <FaFacebookSquare size={25} />
                    <FaInstagramSquare size={25} />
                </div>
            </div>
        </div>

    )
};
export default Header;