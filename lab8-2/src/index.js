import React, {Component} from 'react';
import {render} from 'react-dom';
import Hello from './Hello';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    state = {
        name: 'React',
        count: 0,
        tags: ['apple', 'orange', 'banna']
    };
    styles = {
        fontSize: 20,
        fontWeight: 'bold'
    };

    constructor(props) {
        super(props);
        this.increase = this.increase.bind(this);//first way
        //this.decrease = this.decrease.bind(this); //second =>
    }

    render() {
        return (
            <div>
                <div>
                    <Hello name={this.state.name}/>
                    <p>
                        and all lev & tal students
                    </p>
                </div>
                <div>
                    <span style={this.styles} className={this.getBadgeClasses()}>{this.formatCount()}</span>
                    <button onClick={this.increase} className="btn btn-secondary btn-sm">Increment</button>
                    <button onClick={this.decrease} className="btn btn-large m-2">Decrement</button>
                    {this.renderTags()}
                    {this.state.tags.length === 1 && "another way to handle condition!"}
                </div>
            </div>
        );
    }

    renderTags() { // condition
        if (this.state.tags.length === 0) return <p>no tags</p>;
        return <ul>{this.state.tags.map(tag => <li onClick={() => this.alertTags({tag})} key={tag}>{tag}</li>)}</ul>;
    }

    increase() {
        this.setState({count: this.state.count + 1});
    }

    alertTags = tag => {
        alert(tag.tag);
        console.log(tag);
    };

    decrease = () => { //second way
        this.setState({count: this.state.count - 1});
    };

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.state.count === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const {count} = this.state;
        if (count < 0)
            return <p>lower than zero</p>;
        return count === 0 ? "Zero" : count;
    }
}

render(<App/>, document.getElementById('root'));
