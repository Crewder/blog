import React, {Component} from "react";
import API from '../utils/API';

class CreateArticle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            author: '',
            title: '',
            content: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    async componentDidMount() {
        let authorData = await API.get('/authors');
        authorData = authorData.data["hydra:member"];
        console.log(authorData);
        this.setState({authors: authorData});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await API.post('/articles',
                {
                    "author": this.state.author,
                    "title": this.state.title,
                    "content": this.state.content,
                    "createdAt": new Date(),
                    "updatedAt": new Date()
                }
            );
            console.log('Returned data:', response);
            window.history.back();
        } catch (e) {
            console.log(`Request failed: ${e}`);
        }

    }

    render() {
        return (
            <div>
                <h2>Création d'un article</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Auteurs :</label>
                    <select value={this.state.author} name="author" onChange={this.handleChange}>
                        {
                            this.state.authors.map(author =>
                                <option key={author.id} value={author["@id"]}  >{author.firstname}</option>
                            )
                        }
                    </select>

                    <label>Title :</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />

                    <label>Content :</label>
                    <input type="text" name="content" value={this.state.content} onChange={this.handleChange} />

                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        );
    }
}

export default CreateArticle;