import './NavBar.scss';

const NavBar = () => {
    return (
        <nav className='nav-bar'>
            <div className='left'>
                <a href="" className='previous-route'>
                    <i className="las la-angle-left"></i>
                </a>
                <p className='path'>Dashboards / <span className='current'>Floor Plans</span></p>
            </div>
            <div className='right'>
                <i className="las la-bell alert"></i>
            </div>
        </nav>
    )
}

export default NavBar;