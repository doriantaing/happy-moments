import React , {Component} from 'react';
import Sunburst2 from '../../components/Sunburst2';
import {Link} from "react-router-dom";
import {sources} from "../../assets/img";

class Graph extends Component{
    render(){
        return(
            <section className="graph container">
                <div className="row jc-center">
                    <div className="col-md-8">
                        <Link to="/" className="main-logo">
                            <img src={sources.logo} alt="logo"/>
                        </Link>
                    </div>
                    <div className="col-md-2 d-flex ai-end jc-end">
                        <div className="btn btn--back">
                            <Link to="/about">Back</Link>
                        </div>
                    </div>
                </div>
                <Sunburst2 data={this.props.data}/>
                <img src="/img/gradient-4.svg" alt="" className="graph-gradient"/>
            </section>
        )
    }
}

export default Graph;