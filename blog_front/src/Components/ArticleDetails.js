import React, {Component} from "react";
import API from '../utils/API';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class ArticleDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    async componentDidMount() {
        const articleId = this.props.match.params.id;
        let articleData = await API.get(`/articles/${articleId}`);
        articleData = [articleData.data];
        console.log([articleData]);
        this.setState({articles: articleData});
    }

    render() {
        return (
            <div className="list">
                <h2>Détails de l'article {this.props.match.params.id}</h2>

                <table id="articleDetailsTable" border="1px">
                    <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Contenu</th>
                        <th>Date de création</th>
                        <th>Date de mise à jour</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.articles.map(article =>
                            <tr key={article.id}>
                                <td>{article.title}</td>
                                <td>{article.content}</td>
                                <td>{(new Date(article.createdAt)).toLocaleDateString()}</td>
                                <td>{(new Date(article.updatedAt)).toLocaleDateString()}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>



            </div>
        );
    }
}

export default ArticleDetails;