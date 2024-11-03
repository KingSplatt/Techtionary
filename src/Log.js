import React from "react";
import Camara from "./Camara";

const Log = () => {
    return (
        <html>
            <body>
                <section id="contenedor">
                    <header class="header">
                        <h1>
                            Techtionary
                        </h1>
                    </header>
                    <section id="secc01">
                        <section id="condos">
                            <section>
                                <input type="button" value="Camara"></input>
                            </section>
                            <section>
                                <input type="button" value="Dispositivos"></input>
                            </section>
                        </section>
                    </section>
                    <section id="secc02">
                        <article id="contieneCamara">
                            <Camara />
                        </article>
                    </section>
                </section>
            </body>
        </html>
    );
};

export default Log;