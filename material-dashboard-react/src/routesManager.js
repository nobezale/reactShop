/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Home from "@material-ui/icons/Home";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Phone from "@material-ui/icons/Phone";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Shop from "@material-ui/icons/Shop";
import People from "@material-ui/icons/People";
import Collections from "@material-ui/icons/Collections";
import PhotoAlbum from "@material-ui/icons/PhotoAlbum";
import Loyalty from "@material-ui/icons/Loyalty";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import ContactMail from "@material-ui/icons/ContactMail";

import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Try from "@material-ui/icons/BeachAccess";

// core components/views for Admin layout
//import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
//import TableList from "views/TableList/TableList.js";
/*import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";*/
import BlogPosts from "views/BlogPosts/BlogPosts.js";
import Orders from "views/ListOfOrders/ListOfOrders.js";
import DressGallery from "views/DressGallery/DressGallery.js";
import HomePage from "views/Home/Home.js";
import ScrafGalary from "views/ScrafGalary/ScrafGalary.js";
import Sale from "views/Sale/Sale.js";
import AboutUs from "views/AboutUs/AboutUs.js";
import ContactUs from "views/ContactUs/ContactUs.js";
import ListOfProduct from "views/ListOfProduct/ListOfProduct.js";


// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/Home",
    name: "Home",
    icon: Home,
    component: HomePage,
    layout: "/admin"
  },
  {
    path: "/User",
    name: "Users Management",
    icon: People,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/ListOfProducts",
    name: "Products Management",
    icon: "content_paste",
    component: ListOfProduct,
    layout: "/admin"
  },
  {
    path: "/ListOfOrsers",
    name: "Orders Management",
    icon: LibraryBooks,
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/DressGallery",
    name: "Dress Gallery",
    icon: Collections,
    component: DressGallery,
    layout: "/admin"
  },
  {
    path: "/ScarfGallery",
    name: "Scarf Gallery",
    icon: PhotoAlbum,
    component: ScrafGalary,
    layout: "/admin"
  },
  {
    path: "/Sale",
    name: "Sale",
    icon: Loyalty,
    component: Sale,
    layout: "/admin"
  },
  {
    path: "/AboutUs",
    name: "About Us",
    icon: PriorityHigh,
    component: AboutUs,
    layout: "/admin"
  },
  {
    path: "/ContactUs",
    name: "Contact Us",
    icon: Phone,
    component: ContactUs,
    layout: "/admin"
  },

  
];

export default dashboardRoutes;
