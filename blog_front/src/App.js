import React, {Component} from 'react';
import Author from "./Components/Author";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from "./Components/Home";
import Article from "./Components/Article";
import ArticleDetails from "./Components/ArticleDetails";
import CreateArticle from "./Components/CreateArticle";
import ModifierArticle from "./Components/ModifierArticle";
import DeleteArticle from "./Components/DeleteArticle";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authors: ['1',2]
        };
    }

    render() {
        return (
            <div className="App">
                <h1>Blog Symfony - React</h1>
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Page d'accueil</Link>
                                </li>
                                <li>
                                    <Link to="/admin">Liste des auteurs</Link>
                                </li>
                                <li>
                                    <Link to="/articles">Liste des articles</Link>
                                </li>
                            </ul>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/admin">
                                <Author/>
                            </Route>
                            <Route path="/articles">
                                <Article />
                            </Route>
                            <Route path="/createArticle">
                                <CreateArticle />
                            </Route>
                            <Route path={`/article/update/:id`} render={(props) => <ModifierArticle {...props}/>}/>
                            <Route path={`/article/delete/:id`} render={(props) => <DeleteArticle {...props}/>}/>
                            <Route path={`/article/:id`} render={(props) => <ArticleDetails {...props}/>}/>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;


