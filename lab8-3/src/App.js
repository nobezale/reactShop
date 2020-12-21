import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './style.css';
import Hello from './Hello';
import Products from './products';
import ProductDetails from './product-details';

class App extends Component {
    state = {
        name: 'LEV',
        count:0,
        tags:['apple','orange','banna']
    };

    render() {
        return (
            <div>
                <section>
                    <header>
                        <Hello name={this.state.name} />
                    </header>

                    <main>
                        <Router basename={'/shop'}>
                            <div>
                                <Switch>
                                    <Route exact path='/' component={Products} />
                                    <Route exact path='/products' component={Products} />
                                    
                                    <Route
                                        path='/products/:id/:name'
                                        component= {ProductDetails}
                                    />
                                </Switch>
                            </div>
                        </Router>
                    </main>

                    <footer>
                    </footer>
                </section>
            </div>
        );
    }
}

export default App;