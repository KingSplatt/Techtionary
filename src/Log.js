import React from "react";
import { useState } from "react";
import Camara from "./Camara";
import TarjetasDispositivos from "./TarjetasDispositivos";

const Log = () => {
   
    const [mostrarCamara, setMostrarCamara] = useState(true);

    const activarCamara = () => {
        setMostrarCamara(true);
        document.body.style.overflow = 'hidden';
    };
    const desactivarCamara = () => {
        setMostrarCamara(false);
        document.body.style.overflow = 'visible';
    };

    return (
        <html>
            <body >
                <section id="contenedor">
                    <header class="header">
                        <h1>
                            Techtionary
                        </h1>
                    </header>
                    <section id="secc01">
                        <section id="condos">
                            <section>
                                <input type="button" onClick={() => activarCamara()} value="Camara"></input>
                            </section>
                            <section>
                                <input type="button" onClick={() => desactivarCamara()} value="Dispositivos"></input>
                        </section>
                    </section>
                </section>
            
                {mostrarCamara ? 
                
                <section id="secc02">
                    <article id="contieneCamara">
                    <Camara /> 
                    </article>
                </section>

                : 
                <article>
                <TarjetasDispositivos />
                </article>
                }
                </section>
            </body>
        </html>
    );
};

export default Log;
