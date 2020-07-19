import React, {Component} from "react";
import API from '../utils/API';
import * as Icon from 'react-feather';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ArticleDetails from "./ArticleDetails";

class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    async componentDidMount() {
        let articleData = await API.get('/articles');
        articleData = articleData.data["hydra:member"];
        console.log(articleData);
        this.setState({articles: articleData});
    }

    render() {
        return (
            <div className="list">
                <h2>Liste des articles</h2>
                <table id="articleTable" border="1px">
                    <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Date de création</th>
                        <th>Date de mise à jour</th>
                        <th>Détails</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.articles.map(article =>
                            <tr key={article.id}>
                                <td>{article.title}</td>
                                <td>{(new Date(article.createdAt)).toLocaleDateString()}</td>
                                <td>{(new Date(article.updatedAt)).toLocaleDateString()}</td>
                                <td><Link to={`article/${article.id}`}>Voir plus</Link></td>
                                <td><Link to={`article/update/${article.id}`}><Icon.Edit /></Link></td>
                                <td><Link to={`article/delete/${article.id}`}><Icon.Trash2 /></Link></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <button className="btn btn-primary"><Link to={`createArticle`}>Créer un article</Link></button>
            </div>
        );
    }
}

export default Article;