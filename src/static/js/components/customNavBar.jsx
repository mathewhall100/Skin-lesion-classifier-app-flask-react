const Navbar = window.Reactstrap.Navbar;
const NavbarBrand = window.Reactstrap.NavbarBrand;
const Nav = window.Reactstrap.Nav;
const NavItem = window.Reactstrap.NavItem;
const NavLink = window.Reactstrap.NavLink;

class CustomNavBar extends React.Component {

      render() {

        return (
            <div>

                <div class="web">
                    <Navbar style={{paddingRight: "20px"}} color="dark" dark expand="md">
                        <div className="crop-container">
                            <img className="navbar-image" src="https://www.hivplusmag.com/sites/hivplusmag.com/files/2018/07/19/melanoma-750x.jpg" width="250px" height="auto" alt="lesion under inspection"></img>  
                        </div>
                        <NavbarBrand className="navbar-brand" href="/">{APP_CONFIG.title}</NavbarBrand>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/about">About</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/github">GitHub</NavLink>
                                </NavItem>
                            </Nav>
                    </Navbar>
                 </div>

                 <div class="mobile">
                    <div class='banner-text'>
                        <div class='banner-title'>Skin Lesion<br />Identification</div>
                        <div class='banner-subtitle'>Powered by deep learning</div>
                    </div>
                    <div class='crop-container'>
                        <img src="https://www.hivplusmag.com/sites/hivplusmag.com/files/2018/07/19/melanoma-750x.jpg" width="100%" height="auto" alt="lesion under inspection" />
                    </div>
                    <ul class="mobile-nav">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/guthub">GitHub</a>
                        </li>
                    </ul>
                </div>

            </div>

        );
    }
}
