import React, { Component } from 'react';
import '../../assets/style/flexboxgrid.min.css';
import {Link} from 'react-router-dom';
import {sources} from '../../assets/img/index';

class Home extends Component {
  state = {
    icons: [ 'icon-sofa','icon-popcorn','icon-octopus','icon-cat','icon-popcorn','icon-donut','icon-chocolate'],
  };

    render() {
    const {icons} = this.state;
    return (
        <div className="Home">
            <div className="container">
                <div className="row text-container jc-center">
                    <div className="col-md-10">
                        <Link to="/" className="main-logo home">
                            <img src={sources.logo} alt="logo"/>
                        </Link>
                        <div className="text-xl mb-40">Welcome to happy feel</div>
                        <div className="text-md mb-20">Don't worry, be happy</div>
                        <div className="home-desc mb-50">Through the different studies we have found around what makes people happy. We found today why people are happy in the last 24 hours. Through more than 116,000 testimonials, you may find the little secrets of people to be happy ?</div>
                        <div className="btn">
                            <Link to="/about">Next</Link>
                        </div>
                    </div>
                </div>
            </div>


            {/*
            |
            |-- Images svg en haut droite 
            |
            */}
            <div className="img-container">
                <img src={sources.gradient1} id="__id__" className="home-gradient" alt=""/>
                <img src={sources.gradient2} id="__id__" className="home-gradient" alt=""/>
                <img src={sources.gradientImg} id="__id__" className="home-gradient" alt=""/>
            </div>

            {/*
            |
            |-- Icons 
            |
            */}
            { icons.map((el, i) => {
                return(
                    <i className={`home-icon icon-${i + 1} ${el}`} id="__id__" key={i}/>
                )
            })}
        </div>
    );
  }
}

export default Home;
