import React, {Component} from 'react';
import './style.css';

class ProductImage extends Component {
    state = {};
    styles = {
        margin: 3,
        padding: 3,
        border: '1px solid black',
        width: 80,
        height: 80
    };
    imgStyle = {width: 80, height: 80};

    render() {
        return (
            <div style={this.styles}>
                <img style={this.imgStyle} src={"https://i.imgur.com/" + this.props.imageSrc + ".jpg"} alt={'no image available'}/>
            </div>
        );
    }
}

export default ProductImage;
