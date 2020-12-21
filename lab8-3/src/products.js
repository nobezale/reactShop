import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import ProductImage from './product-image';

class Products extends Component {
    state = {products: []};

    async componentDidMount() {
        try {
            const resp = await fetch('/shop/products');
            if (!resp.ok) { // noinspection ExceptionCaughtLocallyJS
                throw Error(resp.statusText);
            }
            const products = await resp.json();
			this.setState({products});
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <table border="1" align="center">
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Units In Stock</th>
                    <th>Units On Order</th>
                    <th>Image</th>
                    <th>Is In Stock?</th>
                </tr>
                </thead>
                <tbody>
                {this.state.products.map(product => <tr key={product.productID}>
                    <td><Link
                        to={'/products/' + product.productID + "/" + product.productName}>{product.productName}</Link>
                    </td>
                    <td>{new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(product.unitPrice)}</td>
                    <td>{product.unitsInStock}</td>
                    <td>{product.unitsOnOrder}</td>
                    <td><ProductImage imageSrc={product.productID}/></td>
                    <td><ProductImage imageSrc={product.unitsInStock > 0 ? 'eY4aR2m' : 'vcfGWWW'}/></td>
                </tr>)}
                </tbody>
            </table>
        );
    }
}

export default Products;
