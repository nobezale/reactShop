import React, {useState} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import ShoppingCart from "views/ShoppingCart/ShoppingCart.js";

import routesClient from "routesClient.js";
import routesManager from "routesManager.js";
import routesEmployee from "routesEmployee.js";
import routesRouting from "routes.js";


import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { set } from "mongoose";


import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import socketIOClient from "socket.io-client";


let ps;
let flag=false;
//let routesRouting=routesManager;
//let routes = routesClient;
let permission="client";
let userid="";

const switchRoutes = (
  <Switch>
    {routesRouting.map((prop, key) => {
      if (prop.layout === "/admin") {
        {console.log(permission)}
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
    }
      return null;
    })}
    <Redirect from="/admin" to="/admin/Home" />
    <Redirect from="/signout" to="/admin/Home" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [data, setData] = useState({permission: [], isFetching: false});
  const [routes, setRoutes] = useState(routesClient);
  const [userID, setUserID] = useState(null);
  const [userName, setUserName]= useState('');
  const [messages, setMessages]=useState({ allMessage:[]});
  //const socket = socketIOClient("localhost:8080");
let socket;

  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    console.log("in handleDrawerToggle");
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const handleRoutes = () => {
    console.log("in handleRoutes");
    if(permission=="Employee"){
    setRoutes(routesEmployee);
    }
    if(permission=="Manager"){
      setRoutes(routesManager);
      }
  
  };

  const handleNewUserMessage = (newmessage) => {
    console.log(`New message incoming! ${newmessage}`);
    // Now send the message throught the backend API
    console.log(userName);
    send(newmessage);
  };

 /* const CurrentDate = ({date}) => {
    return new Date().getDate() !== new Date(date).getDate()
        ? new moment(date).format('LT')
        : new moment(date).format('ddd LT');
};*/

  function getTime(){
    let date = new Date();
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  }
  
  function send (newmessage)
  { 
    let newMessage={
    type:'send',
    content:newmessage,
    name: userName,
    idUser:userID,
    time: getTime()
   }
   let arr = messages.allMessage;
   arr.push(newMessage);
   setMessages({allMessage: arr});
 //  this.setState({message: ''});

    let sendMessage = {...newMessage};
    sendMessage.type = "recieve";
    const socket = socketIOClient("localhost:4001");
    socket.emit('message', sendMessage)

  }
  

/*  const setRoutes = () => {
    console.log("in set routes")
    if(permission=="employee")
    {
   //   routes=routesManager;
   //setRoutes(routesManager);
   console.log("routes is employee");
   return routesManager
    }
    else 
    {
  //    routes=routesClient;
  //setRoutes(routesClient);
  console.log("routes is client");
  return routesClient;
    }
  };*/
  
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({permission: data.permission, isFetching: true});
            const response = await fetch('/getPermissionUser');
         //   console.log("ths response dress "+ response);
            const PermissionRes = await response.json();
            console.log(PermissionRes);
            console.log(PermissionRes[0]);
            console.log(PermissionRes[1]);  
            console.log(PermissionRes[2]);  
            permission=PermissionRes[0];
            console.log("in useEffect func");
            setData({permission: PermissionRes, isFetching: false});
            if(PermissionRes[1]!=null)
            {
              let id=PermissionRes[1];
              setUserID(id);
              let name=PermissionRes[2];
              console.log(id);
              setUserName(name);
              userid=id;
              console.log(userid);
            //  setUser(PermissionRes[2]);
            }
            console.log("in check Permission");
          console.log(permission);
      /*   if(permission=="employee")
          {
            routes=routesManager;
            console.log("routes is employee");
          }
          else if(permission=="client")
          {
            routes=routesClient;
            console.log("routes is client");
          }*/
          handleRoutes();
      } catch (e) {
          console.log(e);
          setData({permission: data.permission, isFetching: false});
      }
  };

  
  if(!flag)
  {
  fetchUsers();
  socket = socketIOClient("localhost:4001");
  socket.on('message', (message) => {
    console.log(message.idUser);
    console.log(userid);
    if(message.idUser != userid)
    {
      console.log("another name");
     let arr = messages.allMessage;
     console.log(arr);
     console.log(message);
      arr.push(message);
      setMessages({allMessage: arr});
    //  renderCustomComponent(getTime, {date: message.time});
      addResponseMessage(message.content, message.time);
    }
    else{
      console.log("same name");
    }
    })

  addResponseMessage('Welcome to this awesome chat!');
  flag=true;
  }
  
    

 /* if(data.permission=="client")
  {
    routes=routesClient;
  }
  else{
    routes=routesManager;
  }*/
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };

 
  }, [mainPanel]);


  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"O&M Designs"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      >
      </Sidebar>
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
      {console.log(userID)}
      {userID!=null ?
      <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chat"
        subtitle="Talk to us"
      />
    </div>
    :<div/>}
    </div>
     
  );
}
