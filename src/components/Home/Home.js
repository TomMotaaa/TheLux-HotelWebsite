import React from "react";
import './Home.css';
import { useState, useEffect } from "react";
import Main from "../template/Main/Main";
import axios from "axios";
import HomeData from "./HomeData";
import Cards from "./Cards";

const title = 'Galeria de Hotéis';
const urlAPI = 'http://localhost:5027/api/hotel';
const infos = {
    hotel: {id: 0, nome: '', qtdEstrelas: '', localizacao: '', qtdQuartos: '', preco:'' },
    listaHotel: []
}

const randomAleat = () => {
    return Math.random().toString(36).substring(2, 9);
}

const Home = (props) => {

    const [listaHotel, setListaHotel] = useState(infos.listaHotel);
    const [hotel, setHotel] = useState(infos.hotel);


    useEffect(() => {
        axios(urlAPI)
            .then((resp) => setListaHotel(resp.data))
    }, []);

    const getHotelCadastrado = async (qtdEstrelas) => {
        return await axios(urlAPI)
                    .then((resp) => {
                        const listaHotel = resp.data
                        return listaHotel.filter(
                            (hotel) => hotel.qtdEstrelas == qtdEstrelas
                        )
                    })
    }

    const atualizarHotel = async(evento) => {
        const qtdEstrelas = evento.target.value;
        if (evento.target.value === '') {
            setListaHotel(infos.listaHotel)
            setHotel(infos.hotel)
            return
        }
        hotel.qtdEstrelas = Number(qtdEstrelas)
        if (!Array.isArray(listaHotel)) return;

        setListaHotel(listaHotel)
        setHotel(hotel)
    }

    const renderSelect = () => {
        return (
            <div className="select-container">
                 <label> Escolha um hotel: </label>
                <select className="selectHome" value={hotel.qtdEstrelas}  onChange={e => { atualizarHotel(e)}} required>
                    <option disabled={true} key="" value=""> Escolha um hotel: </option>
                    {listaHotel.map( (hotel) =>
                            <option  key={hotel.id} name="qtdEstrelas" value={hotel.qtdEstrelas}>
                                { hotel.nome } - { hotel.qtdEstrelas } - { hotel.localizacao } - {hotel.qtdQuartos} : {hotel.preco}
                            </option>
                    )}
                </select>
            </div>
        )
    }

    const renderCard = () => {
        <div className="card-row">
        {Array.isArray(listaHotel) && listaHotel.length > 0 ?
        listaHotel.map((hotel) => (
            <section className="gallery top">
                <div key={hotel.id} className="container grid">
                    {HomeData.map((value) => {
                        return <Cards imgaes={value.img} title={value.title}/>
                    })}
                    <span className="card-titulo">{hotel.nome}</span>
                    <span className="card-descricao">Estrelas: {hotel.qtdEstrelas}</span>
                    <span className="card-descricao">Localização: {hotel.localizacao} </span>
                    <span className="card-descricao">Quartos: {hotel.qtdQuartos} </span>
                    <span className="card-descricao">Preço: {hotel.preco} </span>
                </div>
            </section>
        )) : null}
    </div>
    }

  return (
    <div className="container home">
        <Main title={title}>
            {renderSelect()}
            <main>
                <div className="card-container">
                    {renderCard()}
                </div>
            </main>
        </Main>
    </div>
  )
}

export default Home