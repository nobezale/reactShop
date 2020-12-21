import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import Image1 from '../../assets/img/VelvetAntiquePink.jpg';
import Image2 from '../../assets/img/nectarpixl.jpg';
import Image3 from '../../assets/img/sea.jpg';
import Image4 from '../../assets/img/Lucypixl.jpg';
import Image5 from '../../assets/img/SquareScarfpixl.jpg';
import Image6 from '../../assets/img/dresses/dress1pixl.jpg';
import Image7 from '../../assets/img/dresses/dress2pixl.jpg';
import Image8 from '../../assets/img/dresses/dress3pixl.jpg';
import Image9 from '../../assets/img/dresses/dress4pixl.jpg';
import Image10 from '../../assets/img/dresses/dress5pixl.jpg';
import Image11 from '../../assets/img/dresses/dress6pixl.jpg';
import Image12 from '../../assets/img/dresses/dress7pixl.jpg';
import Image13 from '../../assets/img/dresses/dress8pixl.jpg';
import Image14 from '../../assets/img/dresses/dress9pixl.jpg';

import $ from "jquery";
import axios from 'axios';



export default function MaterialTableDemo() {
 // const Image1 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/img2.jpg')} />
  //const Image2 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/nectar.jpg')} />
  /*const Image3 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/Lucy.jpg')} />
  const Image4 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/SquareScarf.jpg')} />
  const Image5 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/img3.jpg')} />
*/
const [data, setData] = useState({products: [], isFetching: false});
const [orderId, orderIdSet] = React.useState(0);
//const { clearCart } = useContext(CartContext);
const [activeStep, setActiveStep] = React.useState(0);

const handleNext = () => {
  setActiveStep(activeStep + 1);
};


  const [state, setState] = React.useState({
    columns: [
    //  { title: 'Image', field: 'render' },
      { title: 'Image', field: 'image',
      cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,  
       textAlign:"center"
      }, lookup: { VelvetAntiquePink: <div><img src={Image1}/> </div>, nectar: <div><img src={Image2}/> </div> , sea: <div><img src={Image3}/> </div>, Lucy: <div><img src={Image4}/> </div>, SquareScarf: <div><img src={Image5}/> </div>
      , dress1: <div><img src={Image6}/> </div>, dress2: <div><img src={Image7}/> </div>, dress3: <div><img src={Image8}/> </div>, dress4: <div><img src={Image9}/> </div>, dress5: <div><img src={Image10}/> </div>, dress6: <div><img src={Image11}/> </div>
      , dress7: <div><img src={Image12}/> </div>, dress8: <div><img src={Image13}/> </div>, dress9: <div><img src={Image14}/> </div>}},
      { title: 'ID', field: 'productID',cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,
        textAlign:"center"
      }, },
      { title: 'Name', field: 'productName',cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,
        textAlign:"center"
      }, },
      { title: 'Type', field:'productType',lookup: { Dress: 'Dress', Scraf: 'Scraf' },cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,
        textAlign:"center"
      }, },
      { title: 'price', field: 'price',cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,
        textAlign:"center"
      },},
      { title: 'Units in stock', field: 'unitsInStock', type: 'numeric' ,cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,
        textAlign:"center"
      },},
      
      { title: 'Sale', field: 'sale', lookup: { Yes: 'Yes', No: 'No' },cellStyle: {
        width: 10,
        maxWidth: 10, 
       textAlign:"center"
      },
      headerStyle: {
        width:10,
        maxWidth: 10,
        textAlign:"center"
      }, },


    ],
    data: [
    ],
  });


  useEffect(() => {
    const fetchProducts = async () => {
        try {
            setData({products: data.products, isFetching: true});
            const response = await fetch('/getAllProduct');
            const productsRes = await response.json();
            console.log(productsRes);
            setData({products: productsRes, isFetching: false});
        } catch (e) {
            console.log(e);
            setData({products: data.products, isFetching: false});
        }
    };
    fetchProducts();
}, []);


async function deleteProduct(productDelete)
{
 console.log("in function deleteproduct");
   console.log(productDelete);
   try {
     
    const response = await fetch('/deleteProduct', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json' },
     body: JSON.stringify({productToDelete:productDelete})});
     console.log(response);
}catch (error) {
console.error('Error:', error);
}



/*
$.ajax({
  type: "POST",
  url: "/deleteProduct",
  data: productDelete,
})
  .done(function(data) {
    orderIdSet(data);
    //clearCart();
    handleNext();
  })
  .fail(function(jqXhr) {
    alert("Sorry! your order is not received, please try again ");
  });*/


 /* 
  axios
  .post('/deleteProduct', productDelete)
  .then(() => console.log('Book Created'))
  .catch(err => {
    console.error(err);
  });*/
}


async function updateProduct(productToUpdate, productNew)
{
 console.log("in function updateproduct");
   console.log(productToUpdate);
   console.log(productNew);
   try {
     
    const response = await fetch('/updateProduct', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json' },
     body: JSON.stringify({productToUpdate:productToUpdate, productNew: productNew})});
     console.log(response);
}catch (error) {
console.error('Error:', error);
}
}

async function addProduct(productAdd)
{
 console.log("in function addproduct");
   console.log(productAdd);
   try {
     
    const response = await fetch('/addProduct', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json' },
     body: JSON.stringify({productToAdd:productAdd})});
     console.log(response);
}catch (error) {
console.error('Error:', error);
}
}
  return (
    <MaterialTable 
      title="List of scarfs and dress"
      columns={state.columns}
      data={data.products}
      isFetching={data.isFetching}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            {
              addProduct(newData);
             }
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            {
              updateProduct(oldData, newData);
             }
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            {
             deleteProduct(oldData);
            }
            setTimeout(() => {
              console.log("in delete");
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
