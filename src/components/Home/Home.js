import React, { Component } from "react";
import './Home.css';
import Main from "../template/Main/Main";
import UserService from "../../Services/UserService";

const title = 'Galeria de Hotéis';
const infos = {
    hotel: {id: 0, nome: '', qtdEstrelas: '', localizacao: '', qtdQuartos: '', preco:'' },
    listaHotel: [],
    listaGaleria: [],
    mens: [],
}

export default class Home extends Component {
    state = {...infos}

    componentDidMount() {
        UserService.getPublicContent().then(
            (response) => {
                this.setState({ listaGaleria: response.data})
            },
            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                this.setState({mens: _mens})
                console.log('_mens: ' + _mens)
            }
        )
    }

    getListaAtualizadaHoteis(evento) {
        const qtdEstrelas = evento.target.value
        const listaHotel = this.state.listaHotel.filter(a => a.qtdEstrelas == qtdEstrelas)
        this.setState({listaGaleria: listaHotel})
        this.setState({hotel: this.state.hotel})
    }

    atualizaCampo() {
        const hotel = {...this.state.hotel}
        this.setState({hotel})
    }

    Cards() {
        return (
            <div className="card-row">
                {this.state.listaGaleria.map((hotel) => 
                    <div key={hotel.id} className="card-descricao">
                        <span>Nome: {hotel.nome} </span>
                        <span>Quantidade de Estrelas: {hotel.qtdEstrelas} </span>
                        <span>Localização: {hotel.localizacao} </span>
                        <span>Quantidade de Quartos: {hotel.qtdQuartos} </span>
                        <span>Preço: {hotel.preco} </span>
                    </div> )}
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {
                    (this.state.mens != null) ? 'Problema com Conexão ou Autenticação' : 
                    <>
                        {this.Cards()}
                    </>
                }
            </Main>
        )
    }
}

