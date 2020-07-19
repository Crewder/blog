import React, {Component} from "react";
import API from '../utils/API';

class ModifierArticle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const articleId = this.props.match.params.id;
        let articleData = await API.get(`/articles/${articleId}`);
        articleData = [articleData.data];
        this.setState({title: articleData[0].title });
        this.setState({content: articleData[0].content});
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const articleId = this.props.match.params.id;
        try {
            const response = await API.put(`/articles/${articleId}`,
                {
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
            <div className="article-crud">
                <h2>Modification d'un article</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title :</label>
                        <input  className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Content :</label>
                        <input  className="form-control" type="text" name="content" value={this.state.content} onChange={this.handleChange} />
                    </div>

                    <input class="btn btn-primary" type="submit" value="Modifier" />
                </form>
            </div>
        );
    }
}

export default ModifierArticle;