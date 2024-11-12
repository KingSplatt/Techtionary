import * as tf from '@tensorflow/tfjs';
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./css/estilos.css";

import { FaCamera, FaSyncAlt } from "react-icons/fa";

const Camara = () => {
    const webcamRef = useRef(null);
    const dialogRef = useRef(null);
    const [model, setModel] = useState(null);
    const [facingMode, setFacingMode] = useState("user");
    const [predictions, setPredictions] = useState([]);

    // Cargar el modelo
    useEffect(() => {
        const loadModel = async () => {
            // const modelURL = `${process.env.PUBLIC_URL}/model/model.json`;
            const modelURL = `${process.env.PUBLIC_URL}/model2/model.json`;
            const loadedModel = await tf.loadLayersModel(modelURL);
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    // Capturar la imagen de la cámara
    const capture = useCallback(async () => {
        if (webcamRef.current && model) {
            setPredictions([]);
            const imageSrc = webcamRef.current.getScreenshot();
            // Crea una imagen HTML a partir de la cadena de base64 para usar con `fromPixels`
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => predict(img);
        }
    }, [webcamRef, model]);

    // Alternar entre cámaras
    const toggleFacingMode = () => {
        setFacingMode(prevMode => (prevMode === "user" ? "environment" : "user"));

    };

    // Función de predicción
    const predict = async (img) => {
        if (model) {
            const tImg = tf.browser.fromPixels(img)
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .expandDims();

            const prediction = await model.predict(tImg).data();

            // const clases = ["Auxiliar", "Cable de audio RCA", "Cable coaxial", "Unidad central de procesamiento (CPU)", "Disipador", "Cable DisplayPort", "Cable DVI", "Ethernet", "HDMI", "Lightning", "Micro USB", "Unidad de fuente de alimentación (PSU)", "Puerto USB A", "RAM", "SATA", "Tarjeta de video", "Tarjeta madre", "Teclado", "USB Tipo A", "USB Tipo B", "USB Tipo C", "VGA", "Mouse"];

            const clases = ["Cable tipo barril", "Bateria", "Cable Doble Barril", "Ethernet", "HDMI", "HDMI (Entrada)", "Jack de audio", "MicroSD", "USB Micro usb", "USB A", "USB C", "Procesador", "Mouse", "Teclado"]

            console.log('Probabilidades de cada clase:');
            clases.forEach((clase, i) => {
                console.log(`${clase}: ${prediction[i]}`);
            });

            const maxPrediction = Math.max(...prediction);
            const maxIndex = prediction.indexOf(maxPrediction);
            const maxClass = clases[maxIndex];
            setPredictions([{ className: maxClass, probability: maxPrediction }]);

            console.log('Clase con mayor probabilidad:');
            console.log({ className: maxClass, probability: maxPrediction });

            dialogRef.current.showModal();

        }
    };

    // Cerrar el modal
    const closeModal = () => {
        dialogRef.current.close();
    };

    return (
        <div id='mainCamara'>
            <Webcam
                key={facingMode}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode }}
                className="webcam"
                mirrored={false}
            />
            <button onClick={capture} id='capturar'><FaCamera />  Capturar </button>
            <button onClick={toggleFacingMode} id='cambiarCamara'><FaSyncAlt /></button>

            <dialog ref={dialogRef} className="modal">
                <div className="modal-content">
                    <button className="close" onClick={closeModal}>×</button>
                    {predictions.map((prediction, i) => (
                        <div key={i}>
                            <p>{prediction.className}</p>
                            <p>{(prediction.probability * 100).toFixed(2)}%</p>
                        </div>
                    ))}
                </div>
            </dialog>

        </div>
    );
};

export default Camara;
