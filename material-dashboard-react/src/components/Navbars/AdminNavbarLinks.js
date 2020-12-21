import React, {useEffect} from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import socketIOClient from "socket.io-client";


const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [countCart, setCountCart] = React.useState(0);


  useEffect(() => {
    const fetchCountCart = async () => {
        try {
      //    setCountCart({countCart: data.countCart, isFetching: true});
            const response = await fetch('/getSoppingCrat');
            console.log("ths response dress "+ response);
            const orderRes = await response.json();
            console.log(orderRes);
        //    setListDresses(orderRes);
            console.log("in useEffect func");
          //  console.log("List Dresses:");
        //    console.log( listDresses);
          //  console.log(typeof(listDresses));
          console.log(orderRes.length);
          setCountCart(orderRes.length);
           
        } catch (e) {
            console.log(e);
        //    setCountCart({countCart: data.countCart, isFetching: false});
        }
    };
    fetchCountCart();
    const socket = socketIOClient("localhost:4001");
    socket.on('countCart', (countcart) => {
     /* if(message.name !== this.user.userName)
      {
       let arr = this.message.allMessage;
        arr.push(message);
        this.setState({allMessage: arr});
      }*/
      console.log("in socket Admin");
      console.log(countcart.content);
      setCountCart(countcart.content);
      })
}, []);


  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const handleClickShoppingCart =()=>
  {
    console.log("handleClickShoppingCart");
    window.location.href="http://localhost:8080/admin/shoppingcart";

  };
  
  const handleChat =()=>
  {
    console.log("handleChat");
    //window.location.href="http://localhost:8080/admin/Chat";
    handleCloseNotification();
  };

  const handleSignOut = async () => {
    try {
        const response = await fetch('/getSignOut');
        const Res = await response.json();
        console.log(Res);
    } catch (e) {
        console.log(e);
    }
    handleCloseProfile();
};

  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="ShoppingCart"
        className={classes.buttonLink}
        onClick={handleClickShoppingCart}
      >
        <ShoppingCart className={classes.icons} />
        <span className={classes.notifications}>{countCart}</span>
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>ShoppingCart</p>
        </Hidden>
      </Button>

      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                       <a href= {"http://localhost:8080/signin"}  >
                         Sign In
                     </a>
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      <a href= {"http://localhost:8080/signup"}  >
                         Sign Up
                     </a>
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleSignOut}
                      className={classes.dropdownItem}
                    >
                      <a href= {"http://localhost:8080/signout"}  >
                      Sign Out
                     </a>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
