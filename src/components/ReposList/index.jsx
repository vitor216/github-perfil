import { useEffect, useState } from "react";

import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setrepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resJson => {
            setTimeout(() => {
                setEstaCarregando(false);
                setrepos(resJson);
            }, 3000);
            
        })
    }, [nomeUsuario]);
    return (
        <div className="container">
        {estaCarregando ? (
            <h1>Carregando...</h1>
        ) :(
            <ul className={styles.list}>
            {repos.map(repositorio => (
                <li className={styles.listItem} key={repositorio.id}>
                    <div className={styles.listItemName}>
                    <b>Nome:</b> {repositorio.name}
                    </div>
                    <div className={styles.listItemLanguage}>
                    <b>Linguagem:</b> {repositorio.language}
                    </div>
                    <a className={styles.listItemLink} target="_blank" href={repositorio.html_url}>Visitar no github</a>
                </li>
            ))}
        </ul>
        )}
        </ div>
    )
}

export default ReposList;