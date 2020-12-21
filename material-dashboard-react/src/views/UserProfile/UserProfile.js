import React , {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import Image1 from '../../assets/img/person1pixl.jpg';
import Image2 from '../../assets/img/person2pixl.jpg';
import Image3 from '../../assets/img/person3pixl.jpg';
import Image4 from '../../assets/img/person4pixl.jpg';
import Image5 from '../../assets/img/person5pixl.jpg';

export default function MaterialTableDemo() {
  /*const Image1 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/person1.jpg')} />
  const Image2 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/person2.jpg')} />
  const Image3 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/person3.jpg')} />
  const Image4 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/person4.jpg')} />
  const Image5 = <img style = {{height: '50px', width: '50px'}} src = {require ('../../assets/img/person5.jpg')} />*/
  const [data, setData] = useState({users: [], isFetching: false});


  const [state, setState] = React.useState({
    columns: [
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
      } , lookup: { person1: <div><img src={Image1}/> </div>, person2: <div><img src={Image2}/> </div> , person3: <div><img src={Image3}/> </div>, person4: <div><img src={Image4}/> </div>, person5: <div><img src={Image5}/> </div>}},
      { title: 'ID', field: 'userID', cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,  
       textAlign:"center"
      } },
      { title: 'Name', field: 'userName', cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,  
       textAlign:"center"
      } },
      
      { title: 'Surname', field: 'surName', cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,  
       textAlign:"center"
      } },
      { title: 'Permission',
       field: 'permission',
       lookup: { Manager: 'manager', Employee: 'employee' , Client:'client', Provider:'provider'} , cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,  
       textAlign:"center"
      }},
      { title: 'Branch', field: 'branch', lookup: { Jerusalem: 'Jerusalem', TelAviv: 'Tel Aviv' , KiryatShmona:'Kiryat Shmona', BeerSheva:'Beer Sheva'}, cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,  
       textAlign:"center"
      } },

      { title: 'Birth Year', field: 'birthYear', type: 'numeric', cellStyle: {
        width: 0,
        maxWidth: 10,
        textAlign:"center"
      },
      headerStyle: {
        width:0,
        maxWidth: 10,  
       textAlign:"center"
      } },
    ],
    data: [
    ],
  });

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            setData({users: data.users, isFetching: true});
            const response = await fetch('/getAllUser');
            const usersRes = await response.json();
            console.log(usersRes);
            setData({users: usersRes, isFetching: false});
        } catch (e) {
            console.log(e);
            setData({users: data.users, isFetching: false});
        }
    };
    fetchUsers();
}, []);

async function deleteUser(userDelete)
{
 console.log("in function deleteuser");
   console.log(userDelete);
   try {
     
    const response = await fetch('/deleteUser', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json' },
     body: JSON.stringify({userToDelete:userDelete})});
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


async function updateUser(userToUpdate, userNew)
{
 console.log("in function updateuser");
   console.log(userToUpdate);
   console.log(userNew);
   try {
     
    const response = await fetch('/updateUser', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json' },
     body: JSON.stringify({userToUpdate:userToUpdate, userNew: userNew})});
     console.log(response);
}catch (error) {
console.error('Error:', error);
}
}

async function addUser(userAdd)
{
 console.log("in function adduser");
   console.log(userAdd);
   try {
     
    const response = await fetch('/addUser', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json' },
     body: JSON.stringify({userToAdd:userAdd})});
     console.log(response);
}catch (error) {
console.error('Error:', error);
}
}

  return (
    <MaterialTable
      title="List of Users"
      columns={state.columns}
      data={data.users}
      isFetching={data.isFetching}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            {addUser(newData);}
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
            {updateUser(oldData, newData);}
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
            {deleteUser(oldData);}
            setTimeout(() => {
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
/*
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import './style.css';
//import ProductImage from './product-image';

class userProfile extends Component {
   // state = {users: []};

    async componentDidMount() {
        try {
            const resp = await fetch('/admin/user');
            if (!resp.ok) { // noinspection ExceptionCaughtLocallyJS
                throw Error(resp.statusText);
            }
           console.log("hi");
            console.log(resp);
            const users = await resp.json();
		      	this.setState({users});
        } catch (err) {
            console.log(err);
        }
    }
    

    render() {
        return (
            <div >
              גגג

            </div>
        );
    }
  }

export default userProfile;
*/