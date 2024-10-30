import * as tf from '@tensorflow/tfjs';
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const Camara = () => {
    const webcamRef = useRef(null);
    const [model, setModel] = useState(null);
    const [facingMode, setFacingMode] = useState("user");

    // aqui cargamos el modelo
    useEffect(() => {
        const loadModel = async () => {
            const modelURL = `${process.env.PUBLIC_URL}/model/model.json`;
            const loadedModel = await tf.loadLayersModel(modelURL);
            setModel(loadedModel);
        };
        loadModel();

    }, []);

    // capturar la imagen de la cámara
    const capture = useCallback(async () => {
        if (webcamRef.current && model) {
            const imageSrc = webcamRef.current.getScreenshot();

            console.log(imageSrc);
        }
    }, [webcamRef, model]);

    // Función para alternar entre cámaras
    const toggleFacingMode = () => {
        setFacingMode(prevMode => (prevMode === "user" ? "environment" : "user"));
    };

    return (
        <div>
            <h1>Techtionary - Reconocimiento de Imagen</h1>
            <Webcam
                key={facingMode}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode }}
                className="webcam"
            />
            <button onClick={capture}>Capturar</button>
            <button onClick={toggleFacingMode}>Cambiar Cámara</button>
        </div>
    );
};

export default Camara;
