import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'

import firebase from '../../firebase'
import './new.css'

class New extends Component{

    constructor(props){
        super(props);
        this.state ={
            titulo: '',
            imagem: '',
            descricao: '',
            alert: ''
        }
        this.cadastrar = this.cadastrar.bind(this)
    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            alert('Você precisa estar logado para acessar esse caminho')
            return null;
        }
    }

    cadastrar = async(e) =>{
        e.preventDefault()

        if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao){
           let posts = firebase.app.ref('posts');
           let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.imagem,
                descricao: this.state.descricao,
                autor: localStorage.nome
            })
            this.props.history.push('/dashboard')
        }else{
            this.setState({alert: 'Preencha todos os compos'})
        }
    }

    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                    <span>{this.state.alert}</span>
                    <label>Titulo:</label><br/>
                    <input type="text" placeholder="Digite o nome do seu post" value={this.state.titulo} autoFocus 
                    onChange={(e)=> this.setState({titulo: e.target.value}) } /><br/>

                    <label>Url da Imagem:</label><br/>
                    <input type="text" placeholder="URL da Capa" value={this.state.imagem} autoFocus 
                    onChange={(e)=> this.setState({imagem: e.target.value}) } /><br/>

                    <label>Descrição:</label><br/>
                    <textarea type="text" placeholder="Descreva seu post" value={this.state.descricao} autoFocus 
                    onChange={(e)=> this.setState({descricao: e.target.value}) } /><br/>

                    <button type="submit">Cadastrar</button>


                </form>
            </div>
        )
    }
}
export default withRouter(New);