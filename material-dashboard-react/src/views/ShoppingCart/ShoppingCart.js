import React, { Component, useState } from 'react'
import { render } from 'react-dom';
//import {DataContext} from '../Context'
import {Link} from 'react-router-dom'

import Image1 from '../../assets/img/VelvetAntiquePink.jpg';
import Image2 from '../../assets/img/nectarpixl.jpg';
import Image3 from '../../assets/img/sea.jpg';
import Image4 from '../../assets/img/Lucypixl.jpg';
import Image5 from '../../assets/img/SquareScarfpixl.jpg';
import dress1 from '../../assets/img/dresses/dress1pixl.jpg';
import dress2 from '../../assets/img/dresses/dress2pixl.jpg';
import dress3 from '../../assets/img/dresses/dress3pixl.jpg';
import dress4 from '../../assets/img/dresses/dress4pixl.jpg';
import dress5 from '../../assets/img/dresses/dress5pixl.jpg';
import dress6 from '../../assets/img/dresses/dress6pixl.jpg';
import dress7 from '../../assets/img/dresses/dress7pixl.jpg';
import dress8 from '../../assets/img/dresses/dress8pixl.jpg';
import dress9 from '../../assets/img/dresses/dress9pixl.jpg';
//import Colors from './Colors'
import './Details.css'
import './Cart.css'

//var listOrders=[];

/*function setListOrders(cartsRes)
    {
     /* dressesRes.forEach(element => {
        console.log(element);
        listDresses.push(element);
      });*
      listOrders= cartsRes;
    }  */

    async function reduction(order_id)
    {
     console.log("in function reduction");
     console.log(order_id);
       try {
         
        const response = await fetch('/reduction', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json' },
         body: JSON.stringify({orderToReduction:order_id})});
         
         console.log("in shoppingCart in component");
         console.log(response);
       
    }catch (error) {
    console.error('Error:', error);
    }
    }
    
    async function increase(order_id)
    {
        console.log("in function reduction");
        console.log(order_id);
          try {
            
           const response = await fetch('/increase', {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json' },
            body: JSON.stringify({orderToIncrease:order_id})});
            
            console.log("in shoppingCart in component");
            console.log(response);
          
       }catch (error) {
       console.error('Error:', error);
       }
    }
    async function removeOrders(order_id)
    {
        console.log("in function reduction");
        console.log(order_id);
          try {
            
           const response = await fetch('/removeOrders', {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json' },
            body: JSON.stringify({orderToRemove:order_id})});
            
            console.log("in shoppingCart in component");
            console.log(response);
          
       }catch (error) {
       console.error('Error:', error);
       }
    }
 /*   async function total(order_id)
    {
    /* console.log("in function reduction");
     console.log(order_id);
       try {
         
        const response = await fetch('/reduction', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json' },
         body: JSON.stringify({orderToReduction:order_id})});
         
         console.log("in shoppingCart in component");
         console.log(response);
         
    }catch (error) {
    console.error('Error:', error);
    }*
    }*/
 //   const [data, setData] = useState({orders: [], isFetching: false});

export class Cart extends Component {
state= {
    listOrders:[],
    totalPrice:''
}

    componentDidMount(){
     /*   const fetchCart = async () => {
        try{    
    //    setData({orders: data.orders, isFetching: true});
        const response = await fetch('/getSoppingCrat');
        console.log("ths response dress "+ response);
        const cartsRes = await response.json();
        console.log(cartsRes);
     //   setListOrders(cartsRes);
        console.log("in useEffect func");
        console.log("List orders to shopping cart:");
        this.setState({listOrders:cartsRes});
        console.log( state.listOrders);
  //      console.log(typeof(listOrders));
 //       setData({orders: cartsRes, isFetching: false});
    } catch (e) {
        console.log(e);
   //     setData({orders: data.orders, isFetching: false});
    }
    };
    fetchCart();*/

    fetch('/getSoppingCrat')
    .then((response) => response.json())
    .then(cart => {
        let totalprice=0;//.concat(state.listOrders); // Clone array with concat or slice(0)
       
        cart.forEach(element => {
            console.log("element:");
            console.log(element);
            
            totalprice= totalprice+element.count*element.price;
         //       this.setState({listOrders: this.state.listOrders.filter(item => item.order_id != order_id)});

           //     element.count=element.count+1;
        
        });
        this.setState({ listOrders: cart , totalPrice:totalprice});
        console.log(totalprice);
        console.log(this.state.totalPrice);
    });
    }
         
    setListOrderReduction(order_id)
    {
        console.log("in setListOrder");
        this.state.listOrders.forEach(element => {
            console.log("element:");
            console.log(element);
            if(element._id==order_id)
            {
                this.setState((state) => {
                    // Important: read `state` instead of `this.state` when updating.
                  //  console.log(listOrders.element.count-1);
                  //  return {count: state.listOrders.element.count-1}
                   return {count: state.count - 1}
                  });
                element.count=element.count-1;
                console.log(element.count);
            }
        });
        this.total();
        reduction(order_id);
    }

    setListOrderIncrease(order_id)
    {
        console.log("in setListOrder");
        this.state.listOrders.forEach(element => {
            console.log("element:");
            console.log(element);
            if(element._id==order_id)
            {
                this.setState((state) => {
                    // Important: read `state` instead of `this.state` when updating.
                  //  console.log(listOrders.element.count-1);
                  //  return {count: state.listOrders.element.count-1}
                   return {count: state.count + 1}
                  });
                element.count=element.count+1;
                console.log(element.count);
            }
        });
        this.total();
        increase(order_id);
    }

    setListRemoveOrders(order_id)
    {
        console.log("in setListRemoveOrders");
       // const item = getItem(this.state.listOrders, order_id); // Method to get item in list through comparison (IE: find some item with item.id), it has to return ITEM and INDEX in array
        const newlist = [];//.concat(state.listOrders); // Clone array with concat or slice(0)
       
        this.state.listOrders.forEach(element => {
            console.log("element:");
            console.log(element);
            if(element._id!=order_id)
            {
                newlist.push(element);
         //       this.setState({listOrders: this.state.listOrders.filter(item => item.order_id != order_id)});

           //     element.count=element.count+1;
                console.log(element.count);
            }
            this.setState({listOrders:newlist});
        });
        this.total();
        removeOrders(order_id);
    }
    
    total()
    {
        console.log("in total fuction");
       // const item = getItem(this.state.listOrders, order_id); // Method to get item in list through comparison (IE: find some item with item.id), it has to return ITEM and INDEX in array
        let totalprice=0;//.concat(state.listOrders); // Clone array with concat or slice(0)
       
        this.state.listOrders.forEach(element => {
            console.log("element:");
            console.log(element);
            
            totalprice= totalprice+element.count*element.price;
         //       this.setState({listOrders: this.state.listOrders.filter(item => item.order_id != order_id)});

           //     element.count=element.count+1;
        
        });
        console.log(totalprice);

        this.setState({totalPrice:totalprice});

     //   removeOrders(order_id);
    }
    
    render() {
   //     const {cart,increase,reduction,removeProduct,total} = this.context;
        if(this.state.listOrders.length === 0){
            return <h2 style={{textAlign:"center"}}>Nothings Product</h2>
        }else{
            return (
                <>
                {console.log(this.state.listOrders)}
                {console.log(this.state.listOrders[0].image)}
                    {
                        this.state.listOrders.map(item =>(
                            <div className="details cart" key={item._id}>
                            {console.log(item.image)}
                       
                                <img src={require('../../assets/img/dresses/'+item.image+'.jpg')} alt=""/>
                                <div className="box">
                                    <div className="row">
                                        <h2>{item.productName}</h2>
                                        <span>${item.price * item.count}</span>
                                    </div>

                                    <p>{item.description}</p>
                                    <p>{item.content}</p>
                                    <div className="amount">
                                        <button className="count" onClick={() => this.setListOrderReduction(item._id) }> - </button>
                                        <span>{item.count}</span>
                                        <button className="count" onClick={() => this.setListOrderIncrease(item._id)}> + </button>
                                    </div>
                                </div>
                                <div className="delete" onClick={() => this.setListRemoveOrders(item._id)}>X</div>
                            </div>
                        ))
                    }
                    <div className="total">
                        <Link to="/admin/payment">Payment</Link>
                        <h3>Total: ${this.state.totalPrice}</h3>
                    </div>
                </>
                )
            }
        }
}

export default Cart


/*import React, { Component } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import Colors from './Colors'
import '../css/Details.css'
import '../css/Cart.css'

export class Cart extends Component {
    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }
    
    render() {
        const {cart,increase,reduction,removeProduct,total} = this.context;
        if(cart.length === 0){
            return <h2 style={{textAlign:"center"}}>Nothings Product</h2>
        }else{
            return (
                <>
                    {
                        cart.map(item =>(
                            <div className="details cart" key={item._id}>
                                <img src={item.src} alt=""/>
                                <div className="box">
                                    <div className="row">
                                        <h2>{item.title}</h2>
                                        <span>${item.price * item.count}</span>
                                    </div>
                                    <Colors colors={item.colors}/>
                                    <p>{item.description}</p>
                                    <p>{item.content}</p>
                                    <div className="amount">
                                        <button className="count" onClick={() => reduction(item._id)}> - </button>
                                        <span>{item.count}</span>
                                        <button className="count" onClick={() => increase(item._id)}> + </button>
                                    </div>
                                </div>
                                <div className="delete" onClick={() => removeProduct(item._id)}>X</div>
                            </div>
                        ))
                    }
                    <div className="total">
                        <Link to="/payment">Payment</Link>
                        <h3>Total: ${total}</h3>
                    </div>
                </>
                )
            }
        }
}

export default Cart*/