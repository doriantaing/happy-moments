import React from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
/*
import { TransitionGroup, CSSTransition } from "react-transition-group";
*/

// View Components 
import Home from '../views/Home/Home';
import About from '../views/About/About';
import Graph from '../views/Graph/Graph';
import page404 from '../views/page404';

const AppRouter = ({graphData}) => {
    return(
        <Router>
            {/*<Route render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        timeout={{ enter: 300, exit: 300 }}
                        classNames={'fade'}>*/}
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/graph" render={() => <Graph data={graphData}/>} />
                            <Route component={page404}/>
                        </Switch>
               {/*     </CSSTransition>
                </TransitionGroup>
            )}/>*/}
        </Router>
    )
};

export default AppRouter;