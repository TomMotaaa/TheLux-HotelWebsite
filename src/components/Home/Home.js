import { useState, useEffect } from "react";
import './Home.css';
import Main from "../template/Main/Main";
import axios from "axios";

const title = "Bem-vindo! Veja a galeria de Hotéis";
const urlAPI = 'http://localhost:5027/api/hotel';
const infos = {
    listaHotel: []
}

function Home(props) {
  
    const [listaHotel, setListaHotel] = useState(infos.listaHotel)

    const getHotelCadastrado = async (hotel) => {
        return await axios(urlAPI)
                        .then((resp) => {
                            const listaHotel = resp.data
                            return listaHotel.filter(
                                a => a.id === hotel.id
                            )
                        })
    }

    const atualizarHotel = async(evento) => {
        const qtdEstrelas = evento.target.value;
        if (evento.target.value === '') {
            setListaHotel(infos.listaHotel)
            return
        }
        listaHotel.qtdEstrelas = Number(qtdEstrelas)
        const listaHoteis = await getHotelCadastrado(listaHotel.qtdEstrelas)
        if (!Array.isArray(listaHoteis)) return;

        setListaHotel(listaHotel)
    }

    const renderCards = () => {
        <div className="card-row">
             {Array.isArray(listaHotel) && listaHotel.length > 0 ?
            listaHotel.map((hotel) => (
                <div key={hotel.id} className="card draw-border">
                    <span className="card-titulo">{hotel.nome}</span>
                    <span className="card-descricao">RA: {hotel.qtdEstrelas}</span>
                    <span className="card-descricao"> Curso: {hotel.localizacao} </span>
                    <span className="card-descricao"> Curso: {hotel.qtdQuartos} </span>
                    <span className="card-descricao"> Curso: {hotel.preco} </span>
                </div>
            )) : null}
        </div>
    }

    return (
        <div className="container home">
            <Main title={title}>
                {renderCards()}
            </Main>
        </div>
    )
}

export default Home
