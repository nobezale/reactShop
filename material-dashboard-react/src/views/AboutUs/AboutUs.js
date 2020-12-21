import React from 'react';
import Button from '@material-ui/core/Button';
import Person from "@material-ui/icons/Person";
import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
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
import imgabout from '../../assets/img/israelPic.png';
import imgabout2 from '../../assets/img/israelPic2.png';

import { Dashboard } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
   

  },
  image: {
    backgroundImage:  `url(${imgabout2})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  gridStyle: {

    backgroundImage:  `url(${imgabout2})`,
  },
  paper: {
    margin: theme.spacing(8, 4),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    
    <Grid container component="main" className={classes.root}  >

      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className= {classes.image}>
        
      
        

        <Button size="small" color="primary" style={   {height: 55,
    flex: 1,    borderWidth: 0,
    borderRadius: 0,
    marginTop: 200,
    marginLeft:300,
    justifyContent: "flex-start"} }>
                      <a href= {"http://localhost:8080/LocationView"}  >
תל אביב                     </a>
                    </Button>
      

                    <Button size="small" color="primary" style={   {height: 55,
    flex: 1,    borderWidth: 0,
    borderRadius: 0,
    marginTop: 200,
    marginLeft:300,
    justifyContent: "flex-start"} }>
                   באר שבע
                    </Button>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <div className={classes.root}>
      <CssBaseline />

      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom style={{fontWeight: "bold"}}>
          About Us
        </Typography>
 
      </Container>
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom style={{fontWeight: "bold"}}> 
        Our Mission
        </Typography>

      </Container>

    </div>

        </div>
      </Grid>
    </Grid>
  );
}
