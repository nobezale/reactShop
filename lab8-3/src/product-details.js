import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import ProductImage from './product-image';

class ProductDetails extends Component {
    state = {products: [], product: {}};
    styles = {
        margin: 3,
        padding: 3,
        border: '1px solid black',
        width: 80,
        height: 80
    };

    constructor({match}) {
        super();
        //console.log('match',match);
        this.params = match.params;
    }

    // constructor(props) {
    //     super(props);
    //     const {match} = props; // object destructuring
    //     //console.log('match',match);
    //     this.params = match.params;
    // }

    async componentDidMount() {
        try {
            const resp = await fetch('/shop/products');
            if (!resp.ok) { // noinspection ExceptionCaughtLocallyJS
                throw Error(resp.statusText);
            }
            const products = await resp.json();
            let product = products.find(obj => obj.productID === this.params.id);
            this.setState({product: product});
            console.log('arr', this.state);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <span><ProductImage imageSrc={this.state.product.productID}/></span>
                <h2>Name: {this.state.product.productName}</h2>
                <h2>Price: {this.state.product.unitPrice}</h2>
                <h2>Stock: {this.state.product.unitsInStock}</h2>
                <h2>Order: {this.state.product.unitsOnOrder}</h2>
                <br/>
                <Link to={'/products'}>back to products list</Link>
            </div>
        );
    }
}

export default ProductDetails;