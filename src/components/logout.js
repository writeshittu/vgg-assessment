import React from "react";
import {GoogleLogout} from 'react-google-login';
import {withRouter} from "react-router-dom";


class Logout extends React.Component{

    logout = (response) => {
        window.localStorage.removeItem('token_id')
        window.localStorage.removeItem('isStudent');
        window.localStorage.removeItem('name');
        window.localStorage.removeItem('email');
        this.props.history.push({pathname:"/"});
        

      }
  
   render(){
     return(
       <GoogleLogout
       clientId="568403139567-nde0j10n0crvensdfsi4vres3806rbp8.apps.googleusercontent.com"
       render={renderProps => (
         <button variant="outline-success" className="bg-light-blue" onClick={renderProps.onClick}>Log me Out</button>
       )}
         buttonText="Logout"
         onLogoutSuccess={this.logout}
         onFailure={this.logout}
     >
     </GoogleLogout>
     )
   }
 }


export default withRouter(Logout);