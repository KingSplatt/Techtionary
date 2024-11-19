import "./css/estilos.css";
import React, { useState } from 'react';


const TarjetasDispositivos = () => {

    const [searchValue, setSearchValue] = useState('');

  const filterCards = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const cards = document.querySelectorAll(".tarjetas .card");

    cards.forEach((card) => {
      const cardName = card.dataset.name.toLowerCase();
      if (cardName.includes(searchValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };
    
    return (
        <div>
            <input
            type="text" id="searchBar" placeholder="Buscar..." onInput={filterCards}/>
            <div className="tarjetas">
            <div class="card" data-name="Alimentacion de barril">
            <img class="imgCard" src="https://http2.mlstatic.com/D_NQ_NP_887914-MLM47837967232_102021-O.webp"></img>
                    <div class="contenidoCard">
                        <h3><b>Alimentación de barril</b></h3>
                        <p>De los tipos más comunes para transmitir corriente continua (DC) desde una fuente de alimentación a un dispositivo electronico</p>
                    </div>
            </div>
            <div class="card" data-name="Alimentacion de doble barril">
            <img class="imgCard" src="https://www.steren.com.mx/media/catalog/product/cache/295a12aacdcb0329a521cbf9876b29e7/image/15916bec3/cable-de-alimentacion-interlock-de-2-m.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>Alimentación de doble barril</b></h3>
                        <p>Cilindros huecos que se utilizan para transmitir corriente continua (DC) desde una fuente de alimentación, como un adaptador de corriente, hacia un dispositivo electrónico.</p>
                    </div>
            </div>
            <div class="card" data-name="Bateria">
            <img class="imgCard" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDHjmH5RXHFr5X3ZvMj5ZkDtqioCaBsQHOJiOnmhOzMiSIDhMw_f5cSSqZ0I2MwveHe4xrfgDqj79qXmpYMeZWAEWgPoikHAmUXctlbEIUZpvkUMETOcPgRClpORq2i9LHemqPaFQGYsfe/s1600/pilaa.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>Batería</b></h3>
                        <p>Fuente de energía portátil que almacena electricidad para alimentar dispositivos.</p>
                    </div>
            </div>
            <div class="card" data-name="Ethernet">
            <img class="imgCard" src="https://m.media-amazon.com/images/I/61eW6g833-L.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>Ethernet</b></h3>
                        <p>Conexión por cable para redes de alta velocidad y estabilidad.</p>
                    </div>
            </div>
            <div class="card" data-name="HDMI">
            <img class="imgCard" src="https://m.media-amazon.com/images/I/718BY-GUm0L._AC_UF1000,1000_QL80_.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>HDMI</b></h3>
                        <p>Estándar para transmitir video y audio de alta definición en un solo cable.</p>
                    </div>
            </div>
            <div class="card" data-name="HDMI (puerto)">
            <img class="imgCard" src="https://cloudfront-us-east-1.images.arcpublishing.com/eluniversal/ZZJ7HKKTD5BVJPR3CPF2ATFHS4.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>HDMI (puerto)</b></h3>
                        <p>Conector para cables HDMI en dispositivos como TVs o computadoras.</p>
                    </div>
            </div>
            <div class="card" data-name="Jack de audio">
            <img class="imgCard" src="https://m.media-amazon.com/images/I/81Tab-D+smL.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>Jack de audio</b></h3>
                        <p>Conector circular para auriculares o sistemas de sonido.</p>
                    </div>
            </div>
            <div class="card" data-name="MicroSD">
            <img class="imgCard" src="https://www.steren.com.mx/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/19445d8b8/memoria-microsd-de-64-gb-kingston-clase-u1-v10-a1.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>MicroSD</b></h3>
                        <p>Tarjeta de memoria pequeña para almacenamiento en dispositivos portátiles.</p>
                    </div>
            </div>
            <div class="card" data-name="Mouse">
            <img class="imgCard" src="https://i5.walmartimages.com/asr/7d237a80-54cb-438d-85c2-f8e9010aa3a6.92807fada6611bb4b4971522eedf5299.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"></img>
                    <div class="contenidoCard">
                        <h3><b>Mouse</b></h3>
                        <p>Dispositivo de entrada para controlar el puntero en la interfaz gráfica.</p>
                    </div>
            </div>
            <div class="card" data-name="Procesador">
            <img class="imgCard" src="https://i.ytimg.com/vi/ziMuHUTdDYE/sddefault.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>Procesador</b></h3>
                        <p>Unidad central de procesamiento que ejecuta instrucciones de software.</p>
                    </div>
            </div>
            <div class="card" data-name="Teclado">
            <img class="imgCard" src="https://m.media-amazon.com/images/I/612RsETDnzL._AC_UF894,1000_QL80_.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>Teclado</b></h3>
                        <p>Dispositivo de entrada para escribir texto o comandos en un sistema.</p>
                    </div>
            </div>
            <div class="card" data-name="USB tipo A">
            <img class="imgCard" src="https://m.media-amazon.com/images/I/61Dwrp7qfCL.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>USB tipo A</b></h3>
                        <p>Conector estándar rectangular para periféricos y transferencia de datos.</p>
                    </div>
            </div>
            <div class="card" data-name="USB tipo B">
            <img class="imgCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfgYiK5nE5c21MstC2gOalX4PGvX0qWvdKQ&s"></img>
                    <div class="contenidoCard">
                        <h3><b>USB tipo B</b></h3>
                        <p>Conector cuadrado usado principalmente en impresoras y dispositivos grandes.</p>
                    </div>
            </div>
            <div class="card" data-name="USB micro">
            <img class="imgCard" src="https://media.startech.com/cms/products/gallery_large/usbaubxmbk.c.jpg"></img>
                    <div class="contenidoCard">
                        <h3><b>USB micro</b></h3>
                        <p>Conector compacto para dispositivos móviles y electrónicos pequeños.</p>
                    </div>
            </div>
            </div>
        </div>
    );
}

export default TarjetasDispositivos;