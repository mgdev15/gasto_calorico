import styles from '../styles/gasto.module.css';
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import CountUp from 'react-countup'; /* Lib para animação */
import html2canvas from "html2canvas"; /* Lib para compartilhar arquivos */
import { ChevronsLeft } from "lucide-react";
import { FaShare } from "react-icons/fa";

export default function Gasto(){

    const tempoRef = useRef(null);
    const pesoRef = useRef(null);
    const veloRef = useRef(null);
    const alturaRef = useRef(null);
    const resultadoRef = useRef(null);
    const [kcal, setKcal] = useState((0).toFixed(1));
    const [ searchParams ] = useSearchParams();
    const gender = searchParams.get("gender");
    const navigate = useNavigate();

    useEffect(() => {

        if(gender !== "homem" && gender !== "mulher"){ /* Identifica gênero do usuário */
            navigate("/", { replace: true });
        }

    }, [gender, navigate]);

    async function capturarTela(){ /* Função para tirar print da tela */

        const elemento = resultadoRef.current;
        if(!elemento) return;

        const canvas = await html2canvas(elemento);
        const dataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "resultado_treino.png";
        link.click();

    }

    async function compartilhar(){ /* Algoritmo para compartilhar o resultado */
 
        const elemento = resultadoRef.current;
        if(!elemento) return;

        const canvas = await html2canvas(elemento);
        const dataURL = canvas.toDataURL("image/png"); /* Transforma imagem em binário */

        const response = await fetch(dataURL);
        const blob = await response.blob(); /* Coleta dados brutos da foto */

        const novoArquivo = new File([blob], "resultado_treino.png", { type: "image/png" });
        /* Cria uma imagem com os dados fornecidos */

        if(navigator.canShare && navigator.canShare({ files: [novoArquivo]})){
            try{
                await navigator.share({
                    files: [novoArquivo] /* Libera o compartilhamento da imagem ao usuário */
                });
            } catch(err) {
                console.log("Erro ao compartilhar arquivos: ", err);
            }
        }
        else{
            alert("O compartilhamento de arquivos não é suportado nesse dispositivo.");
        }

    }

    function obterCalorias(tempo, peso, altura, velocidade){

        if(
            tempo < 1 || tempo > 11000 || 
            peso < 1 || peso > 600 ||
            velocidade <= 0 || velocidade > 50 || 
            altura < 60 || altura > 250
        ){
            setKcal((0).toFixed(1)); /* Seta limites para os campos de entrada de valores */
            return;
        }

        let LBM = 0; /* Massa magra do indivíduo */
        let volumeOxigenio = 0; /* Volume de oxigênio (VO₂) gasto */
        const veloMetroPorMin = (velocidade * 1000) / 60; /* Velocidade em m/min */

        if(gender === "homem"){
            LBM = 0.407 * peso + 0.267 * altura - 19.2; /* LBM masculina */
        } else{
            LBM = 0.252 * peso + 0.473 * altura - 48.3 /* LBM feminina */
        }

        if(velocidade < 6.4){ /* Gasto em CAMINHADA LENTA */
            volumeOxigenio = (0.1 * veloMetroPorMin) + 3.5;
        }
        else if(velocidade >= 6.4 && velocidade < 8){ /* Gasto em CAMINHADA RÁPIDA */
            volumeOxigenio = (0.15 * veloMetroPorMin) + 3.5;
        }
        else if(velocidade >= 8){ /* Gasto em CORRIDA */
            volumeOxigenio = (0.2 * veloMetroPorMin) + 3.5;
        }

        const kcalPorMin = (volumeOxigenio * peso / 1000) * 5; /* Calorias p/min */
        const kcalACSM = kcalPorMin * tempo; /* Calorias totais (despreza gênero e altura) */

        const kcalTotal = kcalACSM * (0.45 * LBM/peso + 0.55); /* Calorias totais com LBM, gênero e altura contabilizados*/

        setKcal(kcalTotal);

    }

    document.addEventListener("keydown", event => { /* Eventos do teclado (enter) */

        const keyPressed = event.key.toLowerCase();
        if(keyPressed === "enter"){
            obterCalorias(
                tempoRef.current.value,
                pesoRef.current.value,
                alturaRef.current.value,
                veloRef.current.value
            );
        }

    });    

    return(

        <section className={styles['gasto-section']}>

            <Link to="/" className={styles['page-back-link']}><ChevronsLeft className={styles.icon}/> Voltar</Link>

            <div className={styles['gasto-total-container']} ref={resultadoRef}>

                <h1 className={styles['gasto-total']}> 
                    <CountUp 
                    start={0}
                    end={parseFloat(kcal)}
                    duration={3}
                    decimals={1} /> kcal
                </h1>

                <h2 className={styles['gasto-subtitle']}>Gastas no seu treino!</h2>

            </div>

            <div className={styles['inputs-container']}>

                <div className={styles['tempo-input']}>
                    <input type="number" ref={tempoRef} id="tempoInput" />
                    <h3>Tempo (min)</h3>
                </div>

                <div className={styles['peso-input']}>
                    <input type="number" ref={pesoRef} id="pesoInput" />
                    <h3>Seu Peso (kg)</h3>
                </div>

                <div className={styles['velo-input']}>
                    <input type="number" defaultValue={4.5} ref={veloRef} id="veloInput" /> {/* Valor médio por adulto*/}
                    <h3>Velocidade (km/h)</h3>
                </div>

                <div className={styles['altura-input']}>
                    <input type="number" ref={alturaRef} id="alturaInput" />
                    <h3>Altura (cm)</h3>
                </div>

            </div>

            <button className={styles['calc-btn']} 
            onClick={() => {
                obterCalorias(
                    tempoRef.current.value, 
                    pesoRef.current.value,
                    alturaRef.current.value, 
                    veloRef.current.value
                );
                window.scrollTo(0, 0);
            }}
            >Obter calorias</button>

            <button className={styles['share-btn']} onClick={() => {capturarTela(), compartilhar()}}>Compartilhar resultado <FaShare /></button>

        </section>

    );

}