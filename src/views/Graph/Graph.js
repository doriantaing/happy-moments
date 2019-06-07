import React , {Component} from 'react';
import Sunburst2 from '../../components/Sunburst2';
import {Link} from "react-router-dom";

class Graph extends Component{
    render(){
        return(
            <section className="graph">
                <Sunburst2/>
                <img src="/img/gradient-4.svg" alt="" className="graph-gradient"/>
                <div className="btn btn--back">
                    <Link to="/about">Back</Link>
                </div>
            </section>
        )
    }
}

export default Graph;