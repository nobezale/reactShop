import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

/*const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];*/
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
var listProducts=[];
var total='';

function setListProducts(productRes)
{
  listProducts= productRes;
}
function setTotal(totalprice)
{
  total= totalprice;
}
export default function Review() {
  const classes = useStyles();
  const [data, setData] = useState({products: [],total:'', isFetching: false});

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            setData({products: data.products,total:'0', isFetching: true});
            const response = await fetch('/getSoppingCrat');
            console.log("ths response dress "+ response);
            const productRes = await response.json();
            console.log(productRes);
            setListProducts(productRes);
            console.log("in useEffect func");
            console.log("List productRes:");
            console.log( listProducts);
            console.log(typeof(listProducts));
            let totalprice=0;
            productRes.forEach(element => {
              console.log("element:");
              console.log(element);
              
              totalprice= totalprice+element.count*element.price;
           //       this.setState({listOrders: this.state.listOrders.filter(item => item.order_id != order_id)});
  
             //     element.count=element.count+1;
          
          });
          setTotal(totalprice);
            setData({products: productRes,total:totalprice, isFetching: true});
           
        } catch (e) {
            console.log(e);
            setData({products: data.products,total:data.total, isFetching: false});
        }
    };
    fetchProducts();
}, []);



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {listProducts.map((product) => (
          <ListItem className={classes.listItem} key={product.productName}>
               <Grid item xs={6}>
            <ListItemText primary={product.productName} secondary={product.desc} />
            </Grid>
            {console.log(product.count)}
            {console.log(product.price)}
            <Grid item xs={6}>
            <Typography variant="body2">{product.count}</Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="body2">{product.price}</Typography>
            </Grid>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${total}
          </Typography>
        </ListItem>
      </List>
      
    </React.Fragment>
  );
}