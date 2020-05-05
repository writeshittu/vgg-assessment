import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {FcGoogle} from 'react-icons/fc';
import {withRouter} from "react-router-dom";
 class Login extends React.Component{
  
   responseGoogle = (response, isStudent) => {
    window.localStorage.setItem('token_id', response.tokenId);
    window.localStorage.setItem('isStudent', isStudent);
    console.dir((response));
     console.dir(response.Pt.Ad);
    this.props.history.push({pathname:"/dashboard", state:{loginSuccessful:"loginmarked", isStudent:isStudent}});
    

  }
     render(){
  return(  
          <GoogleLogin
          clientId="568403139567-nde0j10n0crvensdfsi4vres3806rbp8.apps.googleusercontent.com"
          render={renderProps => (
          <button className="bg-green" outline= "none" onClick={renderProps.onClick} > <FcGoogle size="15"/>{this.props.title}</button>
          )}
          buttonText="Login"
          onSuccess={(response)=>this.responseGoogle(response,this.props.isStudent)}
          onFailure={this.responseGoogle}
          // scope="profile email https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner"
          cookiePolicy={'single_host_origin'}
        />
          
);
 }
}
 export default withRouter(Login);