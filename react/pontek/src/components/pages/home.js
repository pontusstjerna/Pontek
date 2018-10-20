import React, { Component } from 'react';
import generate from '../../autoflirt';
import Hero from '../organisms/hero.js';
import Apps from '../organisms/apps.js';

import windows from '../../assets/windows.svg';

class Home extends Component {

    componentDidMount() {
        document.title = 'nocroft.se - Home';
        setTimeout(() => window.scrollTo({
            top: 0,
              behavior: 'smooth',
          }), 5);
    }

    render() {
        return (
            <section id="section-home" className="home-container">
                <Hero imgs={['tree.jpg', 'sky.jpg']} />
                <Apps />
            </section>
        );
    }
}

export default Home;