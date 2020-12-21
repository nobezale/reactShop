import React , {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import backgroundim from '../../assets/img/flowers-background.jpg';
import { common } from '@material-ui/core/colors';
import imgabout from '../../assets/img/imgabout.jpg';

import socketIOClient from "socket.io-client";

//"https://source.unsplash.com/random"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
  //  padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '90%', // 16:9  56.25
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var listDresses=[];

function setListDresses(dressesRes)
{
/*  dressesRes.forEach(element => {
    console.log(element);
    listDresses.push(element);
  });*/
  listDresses= dressesRes;
}
function getListDresses()
{
   return listDresses;
}
export default function Album() {
  const classes = useStyles();
  // const listDresses=[];
  const [data, setData] = useState({dresses: [], isFetching: false});

  function send (countCart)
  { 
    console.log("in send");

    let newCountCart={
    type:'send',
    content:countCart
   }
  // let arr = messages.allMessage;
  // arr.push(newMessage);
 //  setMessages({allMessage: arr});
 //  this.setState({message: ''});

    let sendCountCart = {...newCountCart};
    sendCountCart.type = "recieve";
    const socket = socketIOClient("localhost:4001");
    socket.emit('countCart', sendCountCart)

  }


  useEffect(() => {
    const fetchDresses = async () => {
        try {
            setData({dresses: data.dresses, isFetching: true});
            const response = await fetch('/getAllScraf');
            console.log("ths response dress "+ response);
            const dressesRes = await response.json();
            console.log(dressesRes);
            setListDresses(dressesRes);
            console.log("in useEffect func");
            console.log("List Dresses:");
            console.log( listDresses);
            console.log(typeof(listDresses));
            setData({dresses: dressesRes, isFetching: false});
           
        } catch (e) {
            console.log(e);
            setData({dresses: data.dresses, isFetching: false});
        }
    };
    fetchDresses();
}, []);


async function addCart(productID){
  console.log("in function addCart");
  console.log(productID);
    try {
      
     const response = await fetch('/addOrderProduct', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json' },
      body: JSON.stringify({productID:productID})});
      
      console.log("in tableList in component");
      const Res = await response.json();
      console.log(Res);
    send(Res[0]);
    
 }catch (error) {
 console.error('Error:', error);
 }
}



  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">

      </AppBar>
      <main>
        

        <div className={classes.heroContent}>
        <div  style={{backgroundImage: "url("+backgroundim+")", height:'240px'} }> 
          <Container  style={{  height:'100%', display: 'flex', alignItems: 'stretch',justifyContent: 'center', flexDirection:'column'}}>
     
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom style={{fontWeight: "bold"}}>
            Scarfes summer 2020
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph style={{fontWeight: "bold"}}>
            Get our chic scarfes collection. Here for you!!!
            </Typography>
      
          </Container>
          </div>
          </div>
        <Container className={classes.cardGrid} maxWidth="md">
          
          <Grid container spacing={4}>
            {listDresses.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                {console.log(card.image)}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    
                    image={require('../../assets/img/dresses/'+card.image+'.jpg')}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                     {card.productName}
                    </Typography>
                    <Typography>
                    {card.price}$
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={()=>addCart(card.productID)}>
                    Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      
      <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        
        O&M Designs
  
      </Typography>
     
      <Typography variant="h6" align="center" gutterBottom>

      You are most beautiful when you are comfortable!

    </Typography>
    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">

    All rigts reserved to O&M Designs
 
   </Typography>
      </footer>
      
    </React.Fragment>
  );
}



/*import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import backgroundim from '../../assets/img/flowers-background.jpg';
import img from '../../assets/img/flowers-background.jpg';
import bg from '../../assets/img/flowers-background.jpg';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
  //  padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();

return (
    <React.Fragment >
      
      <CssBaseline />
      <AppBar position="relative">

      </AppBar>
      <main>
        {/* Hero unit *}
        <div className={classes.heroContent}>
        <div  style={{backgroundImage: "url("+backgroundim+")", height:'240px'} }> 
          <Container style={{  height:'100%', display: 'flex', alignItems: 'center',justifyContent: 'center', flexDirection:'column'}} >
     
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom style={{fontWeight: "bold"}}>
            Scarfes summer 2020
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph style={{fontWeight: "bold"}}>
            Get our chic scarfes collection. Here for you!!!
            </Typography>
      
          </Container>
          </div>
          </div>



        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit *}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer *}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer *}
    </React.Fragment>
  );
}*/