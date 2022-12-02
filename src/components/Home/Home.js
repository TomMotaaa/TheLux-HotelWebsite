import { useState, useEffect } from "react";
import './Home.css';
import Main from "../template/Main/Main";
import axios from "axios";

const title = "Bem-vindo! Veja a galeria de Hotéis";
const urlAPI = 'http://localhost:5027/api/hotel';
const infos = {
    hotel: {id: 0, nome: '', qtdEstrelas: 0, localizacao: '', qtdQuartos: 0, preco: 0},
    listaHotel: [],
}
 
 function Home() {

    // eslint-disable-next-line
    const [hotel, setHotel] = useState(infos.hotel)
    const [listaHotel, setListaHotel] = useState(infos.listaHotel)

    useEffect(() => {
        axios(urlAPI)
            .then((resp) => setListaHotel(resp.data))
    }, []);

    const renderCards = () => (
        <div className="card-row">
            {Array.isArray(listaHotel) && listaHotel.length > 0 ?
            listaHotel.map((hotel) => (
                <div key={hotel.id} className="card draw-border">
                    <span className="card-titulo">{hotel.nome}</span>
                    <span className="card-descricao">Estrelas: {hotel.qtdEstrelas}</span>
                    <span className="card-descricao">Localização: {hotel.localizacao}</span>
                    <span className="card-descricao">Quartos: {hotel.qtdQuartos}</span>
                    <span className="card-descricao">Preço: R$ {hotel.preco},00</span>
                </div>
            )) : null}
        </div>
    )

    return (
        <div className="container home">
            <Main title={title}>
                {renderCards()}
            </Main>
        </div>
    )
 }
 
 export default Home