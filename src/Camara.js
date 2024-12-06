import * as tf from "@tensorflow/tfjs";
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
  const [detectedComponent, setDetectedComponent] = useState(null);

  // Datos de los componentes
  const componentes = [
    {
      name: "Cable tipo barril",
      image: "https://http2.mlstatic.com/D_NQ_NP_887914-MLM47837967232_102021-O.webp",
      description: "De los tipos más comunes para transmitir corriente continua (DC) desde una fuente de alimentación a un dispositivo electrónico.",
    },
    {
      name: "Bateria",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDHjmH5RXHFr5X3ZvMj5ZkDtqioCaBsQHOJiOnmhOzMiSIDhMw_f5cSSqZ0I2MwveHe4xrfgDqj79qXmpYMeZWAEWgPoikHAmUXctlbEIUZpvkUMETOcPgRClpORq2i9LHemqPaFQGYsfe/s1600/pilaa.jpg",
      description: "Fuente de energía portátil que almacena electricidad para alimentar dispositivos.",
    },
    {
      name: "Cable Doble Barril",
      image: "https://www.steren.com.mx/media/catalog/product/cache/295a12aacdcb0329a521cbf9876b29e7/image/15916bec3/cable-de-alimentacion-interlock-de-2-m.jpg",
      description: "Cilindros huecos que se utilizan para transmitir corriente continua (DC) desde una fuente de alimentación, como un adaptador de corriente, hacia un dispositivo electrónico.",
    },
    {
      name: "Ethernet",
      image: "https://m.media-amazon.com/images/I/61eW6g833-L.jpg",
      description: "Conexión por cable para redes de alta velocidad y estabilidad.",
    },
    {
      name: "HDMI",
      image: "https://m.media-amazon.com/images/I/718BY-GUm0L._AC_UF1000,1000_QL80_.jpg",
      description: "Estándar para transmitir video y audio de alta definición en un solo cable.",
    },
    {
      name: "HDMI (Entrada)",
      image: "https://cloudfront-us-east-1.images.arcpublishing.com/eluniversal/ZZJ7HKKTD5BVJPR3CPF2ATFHS4.jpg",
      description: "Conector para cables HDMI en dispositivos como TVs o computadoras.",
    },
    {
      name: "Jack de audio",
      image: "https://m.media-amazon.com/images/I/81Tab-D+smL.jpg",
      description: "Conector circular para auriculares o sistemas de sonido.",
    },
    {
      name: "MicroSD",
      image: "https://www.steren.com.mx/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/19445d8b8/memoria-microsd-de-64-gb-kingston-clase-u1-v10-a1.jpg",
      description: "Tarjeta de memoria pequeña para almacenamiento en dispositivos portátiles.",
    },
    {
      name: "USB Micro usb",
      image: "https://media.startech.com/cms/products/gallery_large/usbaubxmbk.c.jpg",
      description: "Conector compacto para dispositivos móviles y electrónicos pequeños.",
    },
    {
      name: "USB A",
      image: "https://m.media-amazon.com/images/I/61Dwrp7qfCL.jpg",
      description: "Conector estándar rectangular para periféricos y transferencia de datos.",
    },
    {
      name: "USB C",
      image: "https://m.media-amazon.com/images/I/61XyX6O5kqL._AC_SL1500_.jpg",
      description: "Conector reversible de alta velocidad utilizado para cargar y transferir datos.",
    },
    {
      name: "Procesador",
      image: "https://i.ytimg.com/vi/ziMuHUTdDYE/sddefault.jpg",
      description: "Unidad central de procesamiento que ejecuta instrucciones de software.",
    },
    {
      name: "Mouse",
      image: "https://i5.walmartimages.com/asr/7d237a80-54cb-438d-85c2-f8e9010aa3a6.92807fada6611bb4b4971522eedf5299.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      description: "Dispositivo de entrada para controlar el puntero en la interfaz gráfica.",
    },
    {
      name: "Teclado",
      image: "https://m.media-amazon.com/images/I/612RsETDnzL._AC_UF894,1000_QL80_.jpg",
      description: "Dispositivo de entrada para escribir texto o comandos en un sistema.",
    },
  ];
  

  // Cargar el modelo
  useEffect(() => {
    const loadModel = async () => {
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
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => predict(img);
    }
  }, [webcamRef, model]);

  // Alternar entre cámaras
  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  // Función de predicción
  const predict = async (img) => {
    if (model) {
      const tImg = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

      const prediction = await model.predict(tImg).data();

      const clases = [
        "Cable tipo barril",
        "Bateria",
        "Cable Doble Barril",
        "Ethernet",
        "HDMI",
        "HDMI (Entrada)",
        "Jack de audio",
        "MicroSD",
        "USB Micro usb",
        "USB A",
        "USB C",
        "Procesador",
        "Mouse",
        "Teclado",
      ];

      const maxPrediction = Math.max(...prediction);
      const maxIndex = prediction.indexOf(maxPrediction);
      const maxClass = clases[maxIndex];
      setPredictions([{ className: maxClass, probability: maxPrediction }]);

      // Buscar información del componente detectado
      const component = componentes.find((comp) => comp.name === maxClass);
      setDetectedComponent(component);

      dialogRef.current.showModal();
    }
  };

  // Cerrar el modal
  const closeModal = () => {
    dialogRef.current.close();
    setDetectedComponent(null);
  };

  return (
    <div id="mainCamara">
      <Webcam
        key={facingMode}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode }}
        className="webcam"
        mirrored={false}
      />
      <button onClick={capture} id="capturar">
        <FaCamera /> Capturar
      </button>
      <button onClick={toggleFacingMode} id="cambiarCamara">
        <FaSyncAlt />
      </button>

      <dialog ref={dialogRef} className="modal">
  <div className="modal-content">
    <button className="close" onClick={closeModal}>
      ×
    </button>
    {detectedComponent ? (
      <div className="modal-body">
        <img
          src={detectedComponent.image}
          alt={detectedComponent.name}
          className="modal-image"
        />
        <div className="modal-text">
          <h2>{detectedComponent.name}</h2>
          <p>{detectedComponent.description}</p>
        </div>
      </div>
    ) : (
      <p>No se encontró información para el componente detectado.</p>
    )}
  </div>
</dialog>

    </div>
  );
};

export default Camara;
