import React, { Component } from 'react';
import '../assets/style/style.scss';
import '../assets/style/flexboxgrid.min.css';


class About extends Component {
  render() {
    return (
        <div className="About">
            <section className="container">
                <div className="row jc-between ai-end">
                    <div className="col-md-6 pt-130">
                        <div className="text-xxl">Find your sentence</div>
                        <div className="text-sm c-grey mb-20">Through our program, you will have to choose through an interactive wheel the format</div>
                    </div>
                    <div className="col">
                        <div class="btn"><a href="">Next</a></div>
                    </div>
                </div>
            </section>
            <section class="boxes container mt-130">
                <div className="row jc-between">
                    <div className="box box-red col-md-3 ta-c">
                        <div className="number">01</div>
                        <div className="text-lg mb-20">Subject</div>
                        <div className="c-grey text-sm">The subject will allow to establish a first word to create a sentence. They are many and varied. Choose it according to your desires or your curiosity!</div>
                    </div>
                    <div className="box box-blue col-md-3 ta-c">
                        <div className="number">02</div>
                        <div className="text-lg mb-20">Verb</div>
                        <div className="c-grey text-sm">The different verbs will be proposed to you after having chosen the subject.</div>
                    </div>
                    <div className="box box-purple col-md-3 ta-c">
                        <div className="number">03</div>
                        <div className="text-lg mb-20">Object</div>
                        <div className="c-grey text-sm">The choice of the add-in will allow you to generate a random sentence among our resource. You will see different statistics.</div>
                    </div>
                </div>
            </section>

            <img src={process.env.PUBLIC_URL + '/img/gradient-3.svg'} id="__id__" className="about-gradient" alt=""/>

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

export default About;
