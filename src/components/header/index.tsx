import logoImg from '../../assets/logo.svg';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

export function Header() {
    return(
        <header>
            <Link to='/'>
                <img className={styles.logo} src={logoImg} alt="Logo DevCurrenchy" />
            </Link>
        </header>
    )
}