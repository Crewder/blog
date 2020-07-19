import React, {Component} from "react";
import API from '../utils/API';

class Author extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authors: []
        };
    }

    async componentDidMount() {
        let authorData = await API.get('/authors');
        authorData = authorData.data["hydra:member"];
        console.log(authorData);
        this.setState({authors: authorData});
    }

    render() {
        return (
            <div>
                <h2>Liste des auteurs</h2>
                <table id="authorsTable" border="1px">
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.authors.map(author =>
                                <tr key={author.id}>
                                    <td>{author.firstname}</td>
                                    <td>{author.lastname}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Author;