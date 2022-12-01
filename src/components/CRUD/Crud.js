import React, { Component } from 'react';
import './Crud.css';
import Main from '../template/Main/Main';
import UserService from '../../Services/UserService';
import axios from 'axios';

const title = "Cadastro de Hotéis";

const urlAPI = "http://localhost:5027/api/hotel";
const initialState = {
    hotel: { id: 0, nome: '', qtdEstrelas: 0, localizacao: '', qtdQuartos: 0, preco: 0},
    lista: [],
    mens: null
}

const user = JSON.parse(localStorage.getItem('user'))



export default class Crud extends Component {

    state = {...initialState}

    componentDidMount() {
        UserService.getAdminBoardCrud().then(
            (response) => {
                this.setState({ lista: response.data })
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

    limpar() {
        this.setState({ hotel: initialState.hotel })
    }

    salvar() {
        const hotel = this.state.hotel;
        hotel.qtdEstrelas = Number(hotel.qtdEstrelas);
        hotel.qtdQuartos = Number(hotel.qtdQuartos);
        hotel.preco = Number(hotel.preco);
        const metodo = hotel.id ? 'put' : 'post';
        const url = hotel.id ? `${urlAPI}/${hotel.id}` : urlAPI;

        axios[metodo](url, hotel)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data);
                this.setState({ hotel: initialState.hotel, lista })
            })
    }

    getListaAtualizada(hotel, add = true) {
        const lista = this.state.lista.filter(a => a.id !== hotel.id);
        if (add) lista.unshift(hotel);
        return lista;
    }

    atualizaCampo(event) {
        const hotel = { ...this.state.hotel };
        hotel[event.target.name] = event.target.value;
        this.setState({hotel});
    }

    carregar(hotel) {
        this.setState({hotel})
    }

    remover(hotel) {
        const url = urlAPI + '/' + hotel.id
        if (window.confirm("Confirma remoção do hotel: " + hotel.nome)) {
            console.log("entrou no confirm");

            axios['delete'](url, hotel)
                .then((resp) => {
                    const lista = this.getListaAtualizada(hotel, false)
                    this.setState({hotel: initialState.hotel, lista})
                })
        }
    }

    renderForm() {
        return (
            <div className='inclui-container'>

                <label>Nome: </label>
                <input 
                    type="text"
                    id="nome"
                    placehoder="Nome do Hotel"
                    className="form-input"
                    name="nome"
                    value={this.state.hotel.nome}
                    onChange={ e => this.atualizaCampo(e)}
                />
                <label>Qtd Estrelas: </label>
                <input 
                    type="number"
                    id="qtdEstrelas"
                    placehoder="0"
                    className="form-input"
                    name="qtdEstrelas"
                    value={this.state.hotel.qtdEstrelas}
                    onChange={ e => this.atualizaCampo(e)}
                />
                <label>Localização: </label>
                <input 
                    type="text"
                    id="localizacao"
                    placehoder="Localização"
                    className="form-input"
                    name="localizacao"
                    value={this.state.hotel.localizacao}
                    onChange={ e => this.atualizaCampo(e)}
                />
                <label>Quantidade de Quartos: </label>
                <input 
                    type="number"
                    id="qtdQuartos"
                    placehoder="0"
                    className="form-input"
                    name="qtdQuartos"
                    value={this.state.hotel.qtdQuartos}
                    onChange={ e => this.atualizaCampo(e)}
                />
                <label>Preço: </label>
                <input 
                    type="number"
                    id="preco"
                    placehoder="0"
                    className="form-input"
                    name="preco"
                    value={this.state.hotel.preco}
                    onChange={ e => this.atualizaCampo(e)}
                />

                <button className='btnSalvar' onClick={e => this.salvar(e)}>
                    Salvar
                </button>
                <button className='btnCancelar' onClick={e => this.limpar(e)}>
                    Cancelar
                </button>
            </div>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaHoteis" id="tblListaHoteis">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloQtdEstrelas">Quantidade de estrelas</th>
                            <th className="tabTituloLocalizacao">Localizacao</th>
                            <th className="tabTituloQtdQuartos">Quantidade de quartos</th>
                            <th className="tabTituloPreco">Preço</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (hotel) =>
                            <tr className='val-center' key={hotel.id}>
                                <td>{hotel.nome}</td>
                                <td>{hotel.qtdEstrelas}</td>
                                <td>{hotel.localizacao}</td>
                                <td>{hotel.qtdQuartos}</td>
                                <td>R$ {hotel.preco},00</td>
                                <td>
                                    <button className='btn-alterar' onClick={() => this.carregar(hotel)}>
                                        Alterar
                                    </button>
                                </td>
                                <td>
                                    <button className='btn-remover' onClick={() => this.remover(hotel)}>
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {console.log(this.state.mens)}
                {
                    (this.state.mens != null) ? 'Problema com conexão ou autorização (contactar administrador).' :
                    <>
                        {this.renderForm()}
                        {this.renderTable()}
                    </> 
                }
            </Main>
        )
    }
}