import React, { Component } from 'react';
import RobotPi from '../organisms/robotpi-react';

import { API_URL } from './admin.js';

class Surveillance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secretMessage: '',
        }
    }

    componentDidMount = () => {
        this.checkAuth();
    }

    shouldComponentUpdate = () => {
        //return !this.state.robotPi;
        return true;
    }

    checkAuth = () => {
        const token = window.sessionStorage.getItem('token-surveillance');
        if (!token) {
            this.logout();
            return;
        }

        fetch(`${API_URL}/login`, {
            headers: {
                'Authorization': 'bearer ' + token,
            }
        }).then(response => {
            if (!response.ok) {
                response.text().then(console.log);
                this.logout();
            } else {
                return response.text();
            }
        }).then(text => this.setState({secretMessage: text}));
    }

    logout = () => {
        window.sessionStorage.removeItem('token-surveillance');
        window.location = "#/admin";
    }

    render() {
    
        const { robotPi, secretMessage } = this.state;

        return (
            <div className="p-surveillance">
                {robotPi &&
                    <div className="container">
                        <RobotPi />
                        <button onClick={() => this.setState({robotPi: false})}>Exit CatHunter </button>                        
                    </div>
                }
                {!robotPi &&
                    <div className="container">
                        <p>{this.state.secretMessage}</p>
                        <button onClick={() => this.setState({robotPi: true})}>CatHunter </button>
                    </div>
                }
                <button onClick={this.logout}>Log out</button>
            </div>
        );
    }
}

export default Surveillance;