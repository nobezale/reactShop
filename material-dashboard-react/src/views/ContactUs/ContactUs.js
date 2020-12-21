import React, { Component } from 'react'

//import Layout from '../components/layout'
import GridContainer from "components/Grid/GridContainer.js"
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Phone from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";
import LocationOn from "@material-ui/icons/LocationOn";
import SvgIcon from '@material-ui/core/SvgIcon';
import backgroundim from '../../assets/img/flowers-background.jpg';

import { Button, FormFeedback, Form, FormGroup, Label, Input } from 'reactstrap'
//const API_PATH = 'http://localhost/material-dashboard-react-master/api/contact/index.php';
import {useStyles} from './useStyles.js';





const CustomSkinMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 31.768318, lng: 35.213711 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
      <Marker position={{ lat: 31.784230, lng: 35.215990 }} />
    </GoogleMap>
  ))
);




class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }

  
handleSubmit(e) {
    e.preventDefault()
    const { name, email, subject, message } = this.state
    let templateParams = {
      from_name: email,
      to_name: '<YOUR_EMAIL_ID>',
      subject: subject,
      message_html: message,
     }
     /*emailjs.send(
      'gmail',
      'template_XXXXXXXX',
       templateParams,
      'user_XXXXXXXXXXXXXXXXXXXX'
     )*/
     console.log("in handle")
 //    console.log(`${API_PATH}`)
    /* axios({
      method: "POST",
      url: "http://localhost:3002/send",
      headers: { "content-type": "application/json" },
      data: templateParams
    })
      .then(result => {
        if (result.data.sent) {
          console.log("succeeded")
      //    setmailSent(result.data.sent)
      //    setError(false)
        } else {
       //   setError(true)
       console.log("error")

        }
      })
      .catch();*/

      fetch('http://localhost:3002/send',{
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(
    	(response) => (response.json())
       ).then((response)=>{
      if (response.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
      }else if(response.status === 'fail'){
        alert("Message failed to send.")
      }
    })
     this.resetForm()
 }
resetForm() {
    this.setState({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }
handleChange = (param, e) => {
    this.setState({ [param]: e.target.value })
  }

  



  



render() {

    return (
      
      <React.Fragment>
        <div  style={{backgroundImage: "url("+backgroundim+")", height:'240px'} }> 
          <Container maxWidth="lg" style={{  height:'100%', display: 'flex', alignItems: 'center',justifyContent: 'center'}}  >
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom style={{fontWeight: "bold", verticalAlign:'middle'}}>
            Keep in touch with us
            </Typography>
          </Container>
          </div>

        <GridContainer  container component="main" >
        <Grid item xs={6} sm={4} md={4}  style={{marginTop:'50px', marginRight:'auto', marginLeft:'auto'}}>
        <div class="col-md-12">
          <Typography variant="subtitle1" component="h2"   gutterBottom  >
          {'If you have any question about one of our products, or maybe a special inquiry or just want to share with us.. this is the right place🙂'}
        </Typography>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="formBasicEmail">
              <Label className="text-muted">Email address</Label>
              <Input
                type="email"
                name="email"
                value={this.state.email}
                className="text-primary"
                onChange={this.handleChange.bind(this, 'email')}
                placeholder="Enter email"
              />
            </FormGroup>
<FormGroup controlId="formBasicName">
              <Label className="text-muted">Name</Label>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                className="text-primary"
                onChange={this.handleChange.bind(this, 'name')}
                placeholder="Name"
              />
            </FormGroup>
<FormGroup controlId="formBasicSubject">
              <Label className="text-muted">Subject</Label>
              <Input
                type="text"
                name="subject"
                className="text-primary"
                value={this.state.subject}
                onChange={this.handleChange.bind(this, 'subject')}
                placeholder="Subject"
              />
            </FormGroup>
<FormGroup controlId="formBasicMessage">
              <Label className="text-muted">Message</Label>
              <Input
                type="textarea"
                name="message"
                className="text-primary"
                value={this.state.message}
                onChange={this.handleChange.bind(this, 'message')}
              />
            </FormGroup>
<Button variant="primary" type="submit">
              Send a message
            </Button>
          </Form>
          </div>
          </Grid>



          <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square style={{marginTop:'50px', marginRight:'auto', marginLeft:'auto'}}>
          <div class="col-md-12">
          <CssBaseline />
          <Container component="main" >
      <Container  elevation={6} >
     
      <CustomSkinMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgct_3KpAAAoy8pBPcDxCtEamSzDuqUhg"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `70vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      
        />
</Container>
<Grid align="center">

<Typography variant="h5" component="h2" gutterBottom >
<SvgIcon component={LocationOn} />
          {' Jaffa, Jerusalem'}
        </Typography>
       
        <Typography variant="h5" component="h2" gutterBottom>
        <SvgIcon component={Phone} />
          {' 050-1234567'}
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom>
        <SvgIcon component={Email} />
          {' storewebsiteproject@gmail.com'}
        </Typography>
        </Grid>
      </Container>
      </div>
          </Grid>

        </GridContainer>
        </React.Fragment>
    )
  }
}
export default ContactForm