import React from 'react';


class Footer extends React.Component{

    render(){
        return(
            <div>
                <img  className="container-fluid mb-5" alt="imadge" src="https://res.cloudinary.com/undercover/image/upload/v1586191776/VGG-Udemy_clone/vgg_pww6ap.jpg" width="auto" />
                <footer className="container-fluid">
               <div className="row center">
               <div className="col-3 pointer">
                    <p className="link dim">Udemy for Business</p> 
                    <p className="link dim">Teach on Udemy</p>
                    <p className="link dim">Get the app</p>
                    <p className="link dim">About us</p>
                </div>
                <div className="col-3 pointer">
                    <p className="link dim">Careers</p>
                    <p className="link dim">Blog</p> 
                    <p className="link dim">Help and Support</p>
                    <p className="link dim">Affiliate</p>
                </div>
                <div className="col-3 pointer">
                <p className="link dim">Terms</p>
                <p className="link dim">Privacy policy and cookie policy</p>
                <p className="link dim">Sitemap</p>
                <p className="link dim">Featured courses</p>
                </div>
                <div className="col-sm">
                   <img alt="logo" src="https://res.cloudinary.com/undercover/image/upload/v1586194287/VGG-Udemy_clone/logo_xiojdz.png" width="50px"/><span className="f5 dark-green">VENTURE GARDEN GROUP</span>
                   <p>Venture Garden Group is a holding company for a group of financial technology entities dedicated to the innovative and data-driven financial technology solutions.
                        Transforming Africa through technology</p>
                    <em>Transforming Africa through technology</em>  
                </div>
               </div>

            </footer>
            </div>
        )
    }
}
export default Footer;