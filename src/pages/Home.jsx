import styles from '../styles/home.module.css';
import ManProfilePic from "../assets/man_photo.svg";
import WomanProfilePic from "../assets/woman_photo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home(){

    const [isManHovering, setIsManHovering] = useState(false);
    const [isWomanHovering, setIsWomanHovering] = useState(false);
    
    return(

        <main>
            
            <h1 className={styles['home-title']}>Descubra o seu gasto calórico <span>pós-esteira</span>!</h1>

            <h2 className={styles['select-gender-title']}>Selecione o seu gênero:</h2>

            <div className={styles['gender-cards']}>

                <Link to="/gasto-calorico">
                    <div className={styles['male-card']} 
                    onMouseEnter={() => setIsManHovering(true)} 
                    onMouseLeave={() => setIsManHovering(false)}>
                        <div className={`${styles['before-card']} ${isManHovering ? styles.vanish : ""}`} />
                        <img src={ManProfilePic} loading='lazy' onContextMenu={(e) => e.preventDefault()} />
                        <h3>Homem</h3>
                    </div>
                </Link>

                <Link to="/gasto-calorico">
                    <div className={styles['female-card']} 
                    onMouseEnter={() => setIsWomanHovering(true)} 
                    onMouseLeave={() => setIsWomanHovering(false)}>
                        <div className={`${styles['before-card']} ${isWomanHovering ? styles.vanish : ""}`} />
                        <img src={WomanProfilePic} loading='lazy' onContextMenu={(e) => e.preventDefault()} />
                        <h3>Mulher</h3>
                    </div>
                </Link>

            </div>

        </main>

    );

}