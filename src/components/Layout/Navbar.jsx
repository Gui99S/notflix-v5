import { useTheme } from '../../context/ThemeContext.jsx';
import { Link, useLocation } from 'react-router-dom';
import ModeToggle from '../../theme/ModeToggle.jsx';

const Navbar = () => {
    const { darkMode } = useTheme();
    const location = useLocation();

    // for darkMode hover effects
    const baseTextColor = darkMode ? '#f9fafb' : '#18181b';

    return (
        <nav className='navbar' style={{
            background: darkMode ? '#27272a' : '#fff',
            borderBottom: `1px solid ${darkMode ? '#3f3f46' : '#e5e7eb'}`,
            boxShadow: darkMode ? '0 2px 10px rgba(0, 0, 0, 0.5)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
            '--mode-toggle-border': darkMode ? '#3f3f46' : '#e5e7eb',
        }} draggable={false} onDragStart={e => e.preventDefault()}>
            <img className='logo' src="/public/icon.png" alt="NotFlix Logo" />
            <ul>
                <li>
                    <Link to="/" className="navbar-link" style={{
                            color: baseTextColor,
                            fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                        }}>
                        Search
                    </Link>
                </li>
                <li>
                    <Link to="/catalogue" className="navbar-link" style={{
                            color: baseTextColor,
                            fontWeight: location.pathname === '/catalogue' ? 'bold' : 'normal',
                        }}>
                        Catalogue
                    </Link>
                </li>
                <li>
                    <Link to="/favorites" className="navbar-link" style={{
                            color: baseTextColor,
                            fontWeight: location.pathname === '/favorites' ? 'bold' : 'normal',
                        }}>
                        Favorites
                    </Link>
                </li>
            </ul>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', }}>
                <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;