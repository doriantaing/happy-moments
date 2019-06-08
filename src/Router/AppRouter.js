import React from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';

// View Components 
import Home from '../views/Home/Home';
import About from '../views/About/About';
import Graph from '../views/Graph/Graph';
import page404 from '../views/page404';

const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/graph" component={Graph}/>
                <Route component={page404}/>
            </Switch>
        </Router>
    )
};

export default AppRouter;