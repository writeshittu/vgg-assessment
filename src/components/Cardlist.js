import React from 'react';
import NavBar from './NavBar';
import Searchbox from './searchfield';
import { withRouter } from 'react-router-dom';

class Cardlist extends React.Component {



  render() {
    const lessonList = [
      {
        id: "1",
        name: 'HTML & CSS',
        image: 'https://res.cloudinary.com/undercover/image/upload/v1586649811/VGG-Udemy_clone/html_jh7oq9.png',
      },
      {
        id: "2",
        name: 'Sass',
        image: 'https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/sass.svg',
      },
      {
        id: "3",
        name: 'JavaScript',
        image: 'https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/es6.svg',
      },
      {
        id: "4",
        name: 'React',
        image: 'https://res.cloudinary.com/undercover/image/upload/v1586649740/VGG-Udemy_clone/react_f3vtsp.png',
      },
      {
        id: "5",
        name: 'PYTHON',
        image: 'https://res.cloudinary.com/undercover/image/upload/v1586649759/VGG-Udemy_clone/python_nbyhp8.png',
      },
      {
        id: "6",
        name: 'Node js',
        image: "https://img.icons8.com/color/144/000000/nodejs.png"
      },
      {
        id: "7",
        name: 'Angular js',
        image: "https://res.cloudinary.com/undercover/image/upload/v1586649303/VGG-Udemy_clone/angular-icon_yfzdmk.svg"
      },
      {
        id: "8",
        name: 'C-SHARP',
        image: "https://res.cloudinary.com/undercover/image/upload/v1586649326/VGG-Udemy_clone/C_Sharp_logo_shqcoo.png"
      },
    ];
    return (
      <div>
        <NavBar />
        <Searchbox />

        <div className="container-fluid mt4">
          <div className="row justify-content-center">
            {
              lessonList.map((lessonItem) =>
                <div key={lessonItem.id} className="col-sm-3 col-xs-6 grow br3 tc ma4 bg-light-blue pa2 shadow-2">
                  <p  >{lessonItem.name}</p>
                  <img src={lessonItem.image} alt="course-logo" width="200px" />
                </div>)
            }
          </div>
        </div>

      </div>
    )
  }
}
export default withRouter(Cardlist);