import styles from '../styles/gasto.module.css';
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import CountUp from 'react-countup';
import { ChevronsLeft } from "lucide-react";

export default function Gasto(){

    const tempoRef = useRef(null);
    const pesoRef = useRef(null);
    const veloRef = useRef(null);
    const [kcal, setKcal] = useState((0).toFixed(1));

    function obterCalorias(tempo, peso, velocidade){

        if(tempo < 1 || peso < 1 || velocidade < 0){
            setKcal((0).toFixed(1));
            return;
        }

        const veloMetroPorMin = (velocidade * 1000) / 60;
        const volumeOxigenio = (0.1 * veloMetroPorMin) + 3.5;
        const kcalPorMin = (volumeOxigenio * peso / 1000) * 5;
        const kcalTotal = `${(kcalPorMin * tempo).toFixed(1)}`;

        setKcal(kcalTotal);

    }

    document.addEventListener("keydown", event => {

        const keyPressed = event.key.toLowerCase();
        if(keyPressed === "enter"){
            obterCalorias(
                tempoRef.current.value, 
                pesoRef.current.value, 
                veloRef.current.value
            );
        }

    });    

    return(

        <section className={styles['gasto-section']}>

            <Link to="/" className={styles['page-back-link']}><ChevronsLeft className={styles.icon}/> Voltar</Link>

            <h1 className={styles['gasto-total']}> 
                <CountUp 
                start={0}
                end={parseFloat(kcal)}
                duration={3}
                decimals={1} /> kcal
            </h1>
            <h2 className={styles['gasto-subtitle']}>Gastas no seu treino!</h2>

            <div className={styles['inputs-container']}>

                <div className={styles['tempo-input']}>
                    <input type="number" ref={tempoRef} />
                    <h3>Tempo (min)</h3>
                </div>

                <div className={styles['peso-input']}>
                    <input type="number" ref={pesoRef} />
                    <h3>Seu Peso (kg)</h3>
                </div>

                <div className={styles['velo-input']}>
                    <input type="number" ref={veloRef} />
                    <h3>Velocidade (km/h)</h3>
                </div>

            </div>

            <button className={styles['calc-btn']} 
            onClick={() => {
                obterCalorias(
                    tempoRef.current.value, 
                    pesoRef.current.value, 
                    veloRef.current.value
                );
                window.scrollTo(0, 0);
            }}
            >Obter calorias</button>

        </section>

    );

}