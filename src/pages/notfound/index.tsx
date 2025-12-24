import { Link } from "react-router-dom";
import styles from "./notfound.module.css";

export function NotFound() {
    return(
        <div className={styles.container}>
            <h1>Página não Encontrada :(</h1>
            <div className={styles.button}>
                <Link to="/">
                <span>RETORNAR PAPRA HOME</span>
                </Link>
            </div>
        </div>
    )
}