import React from "react";
import axios from "axios";

let backgroundStyle = {
  backgroundImage:
    "url(https://res.cloudinary.com/undercover/image/upload/v1586189926/VGG-Udemy_clone/udemy_clone_t2xg5v.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "400px",
  backgroundSize: "cover",
};

class Searchbox extends React.Component {
  constructor() {
    super();
    this.state = {
      course: [],
      searchfield: "",
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.filteredcourses = this.filteredcourses.bind(this);
  }
  onSearchChange = (event) => { 
    this.setState({ searchfield: event.target.value });
    // console.log(event);
  };

   filteredcourses =(e) => { 
       e.preventDefault();
    // axios.get('https://my-vgg-json-server2.herokuapp.com/courses')
    axios
        .get("http://localhost:3000/courses")
      // .then((response) => response.json())
        .then(res => {
        if (res.data !== undefined && res.data.courses !== undefined) {
            console.log(res);

          this.setState({
            course: res.data.courses !== undefined ? res.data.courses : [],
          });
          res.data.course.filter(course => {
                return course.name
                 .toLowerCase()
                 .includes(this.state.searchfield.toLowerCase())
                })
        }})
        .catch(err=> {
            console.log("Error",err);
            console.error(err);
           
        });
        this.setState({searchfield : " "})
    }
    
  
  render() {
    return (
      <div style ={backgroundStyle}>
        <div className="container-fluid">
          <div className="row center">
            <div className="col-sm-3 mt5 offset-2 bg-white">
              <h3 className="ma3"> Let’s start something</h3>
              <p>Begin a plan to meet your 2020 goals with our courses</p>
              <input
                className="pa2 w-60-m bg-light-gray"
                type="search"
                placeholder="search here"
                value={this.state.onSearchChange}
              />
              <button onClick ={this.filteredcourses}  className ='pa2 mb3'><i className="fa fa-search fa-search"></i></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Searchbox;
