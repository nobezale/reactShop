import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import backgroundim from '../../assets/img/imghom.jpg';
import backgrounImage from '../../assets/img/imgHome.jpeg';

import img from '../../assets/img/flowerback.jpg'
import { orange, pink } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  root: {
    width: '100%'
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
    paddingTop: '100%', // 16:9
  },
  cardMediaForAbout: {
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


const cards = [1, 2, 3];
const titleCards=["special sale","scarfs collection","dresses collection"];
const refCards=["http://localhost:8080/admin/Sale", "http://localhost:8080/admin/ScarfGallery", "http://localhost:8080/admin/DressGallery"];
export default function Album() {
  const classes = useStyles();
  return (
    <React.Fragment>



      <main>

        {/* Hero unit */}
      <Grid container component="main" className={classes.root}  >

        <div className={classes.root}>
        <img src={backgrounImage}  className={classes.root}/>
         </div>
      <CssBaseline />

    </Grid>


    <Typography variant="h3" component="h1" gutterBottom align="center" >
    <p>
    <br></br>
    </p>
         What would you like to shop today?
  </Typography>
   

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={require('../../assets/img/img'+card+'.jpg')}
                  
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {titleCards[card-1]} 
                    </Typography>
                   
                  </CardContent>
                  <CardActions>
            <a href= {refCards[card-1]}  >
            Press here
                     </a>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

  
<Grid container component="main" className={classes.root}  >

<CssBaseline />
<Grid item xs={false} sm={4} md={7} className={classes.root} >
  
<Container component="main" className={classes.root} maxWidth="sm">
<Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMediaForAbout}
                    image={require('../../assets/img/img5.jpg')}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                    What is the uniqueness of our store?
                    </Typography>  
                  </CardContent>
</Card>


</Container>

  

</Grid>
<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
  <div className={classes.paper}>
  <div className={classes.root}>
<CssBaseline />

<Container component="main" className={classes.main} maxWidth="sm">

  <Typography variant="h5" component="h2" gutterBottom>
    <p>
      <br></br>
    </p>
    {'O&M Designs is an international fast fashion platform. The company focuses on women wear and scarfs. The brand was founded in October 2008, and since then it has upheld the philosophy that "everyone can enjoy the beauty of fashion." '}
  </Typography>
</Container>


</div>

  </div>
</Grid>
</Grid>





    </main>
      {/* Footer */}
      <footer className={classes.footer} >

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

      {/* End footer */}
    </React.Fragment>
  );
}