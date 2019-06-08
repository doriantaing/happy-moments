import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {sources} from '../../assets/img/index';

class About extends Component {
   state = {
       icons: [ 'icon-sofa','icon-popcorn','icon-octopus','icon-cat','icon-popcorn','icon-donut','icon-chocolate'],
   };

  render() {
    const {icons} = this.state;

    return (
        <div className="About">
            <section className="container">
                <div className="row jc-between ai-end">
                    <div className="col-md-6 pt-130">
                        <div className="text-xxl">Find your sentence</div>
                        <div className="text-sm c-grey mb-20">Through our program, you will have to choose through an interactive wheel the format</div>
                    </div>
                    <div className="col">
                        <div className="btn">
                            <Link to="/graph">Let's check happiness</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="boxes container mt-130">
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

            <img src={sources.gradient3} id="__id__" className="about-gradient" alt=""/>

            {/*
            |
            |-- Icons 
            |
            */}
            {icons.map((el, i) => {
                return(
                    <i className={`home-icon icon-${i + 1} ${el}`} id="__id__" key={i}/>
                )
            })}
        </div>
    );
  }
}

export default About;
