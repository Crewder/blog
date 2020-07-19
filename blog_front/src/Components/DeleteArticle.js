import React, {Component} from "react";
import API from '../utils/API';
import {Link} from "react-router-dom";

class DeleteArticle extends Component{
    constructor(props) {
        super(props);
        this.deleteArticle = this.deleteArticle.bind(this);
    }

    async deleteArticle(event) {
        event.preventDefault();
        try {
            const articleId = this.props.match.params.id;
            const response = await API.delete(`/articles/${articleId}`);
            console.log('Returned data:', response);
            window.history.back();
        } catch (e) {
            console.log(`Request failed: ${e}`);
        }

    }

    render() {
        return (
            <div>
                <h2>Suppression d'un article</h2>
                <p>Etes-vous sûr de vouloir supprimer cet article ?</p>
                <button onClick={this.deleteArticle}>Oui</button>
                <button><Link to="/articles">Non</Link></button>
            </div>
        );
    }
}

export default DeleteArticle;