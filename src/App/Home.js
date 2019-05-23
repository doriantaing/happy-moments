import React, { Component } from 'react';
import '../assets/style/style.scss';
import '../assets/style/flexboxgrid.min.css';


class Home extends Component {
  render() {
    return (
        <div className="Home">
            <div className="container">
                <div className="row text-container">
                    <div className="col-md-9">
                        <div className="text-xl mb-40">Welcome to happy feel</div>
                        <div className="text-md mb-20">Don't worry, be happy</div>
                        <div className="mb-50">Through the different studies we have found around what makes people happy. We found today why people are happy in the last 24 hours. Through more than 116,000 testimonials, you may find the little secrets of people to be happy ?</div>
                        <div class="btn"><a href="">Next</a></div>
                    </div>
                </div>
            </div>


            {/*
            |
            |-- Images svg en haut droite 
            |
            */}
            <div className="img-container">
                <img src={process.env.PUBLIC_URL + '/img/gradient-1.svg'} id="__id__" className="home-gradient" alt=""/>
                <img src={process.env.PUBLIC_URL + '/img/gradient-2.svg'} id="__id__" className="home-gradient" alt=""/>
                <img src={process.env.PUBLIC_URL + '/img/gradient-img.svg'} id="__id__" className="home-gradient" alt=""/>
            </div>


            {/*
            |
            |-- Icons 
            |
            */}
            <img src={process.env.PUBLIC_URL + '/img/icons/sofa.svg'} id="__id__" className="home-icon icon-1" alt=""/>
            <img src={process.env.PUBLIC_URL + '/img/icons/popcorn.svg'} id="__id__" className="home-icon icon-2" alt=""/>
            <img src={process.env.PUBLIC_URL + '/img/icons/octopus.svg'} id="__id__" className="home-icon icon-3" alt=""/>
            <img src={process.env.PUBLIC_URL + '/img/icons/cat.svg'} id="__id__" className="home-icon icon-4" alt=""/>
            <img src={process.env.PUBLIC_URL + '/img/icons/popcorn.svg'} id="__id__" className="home-icon icon-5" alt=""/>
            <img src={process.env.PUBLIC_URL + '/img/icons/donut.svg'} id="__id__" className="home-icon icon-6" alt=""/>
            <img src={process.env.PUBLIC_URL + '/img/icons/chocolate.svg'} id="__id__" className="home-icon icon-7" alt=""/>
        </div>
    );
  }
}

export default Home;
