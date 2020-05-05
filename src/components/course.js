import React from "react";
import StarRating from './courseRating';
import Card from 'react-bootstrap/Card';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import util from '../util/util';



class Cards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            modalTitle : "",
            url : "",
            subscribedCourses : []
        };

    }
    setModalHide = () => {
        this.setState({ modalShow: false, modalTitle : "", url : "" })
    }

    setModalShow = (description, url) => {
        this.setState({ modalShow: true, modalTitle : description, url : url })
    }

    render() {
        return (
            <div>
                <Card >
                    
                    <Card.Img className ="pointer grow" variant="top" src={this.props.image} height={200} onClick={() => this.setModalShow(this.props.name, this.props.links[0].url)} />
                    <Card.Body >
                        <Card.Text style={{minHeight:"50px"}}>
                            {this.props.name}
                            <p>{this.props.description}</p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="text-right">
                            {this.props.subscribed && <button className="pa2 btn-primary pointer o-20" disabled onClick={()=>this.props.onSubscribe(this.props.id)}>SUBSCRIBE</button>}
                            {!this.props.subscribed && <button className="pa2 btn-primary"  onClick={()=>this.props.onSubscribe(this.props.id)}>SUBSCRIBE</button>}
                            </div>
                        <p className="tc"><StarRating /></p>
                    </Card.Footer>
                </Card>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.modalShow}
                    onHide={() => this.setModalHide(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.modalTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="embed-responsive embed-responsive-21by9">
                        <iframe title={this.state.courseId} src={this.state.url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true"></iframe>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { this.setState({ modalShow: false }) }}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

class Courses extends React.Component {

    constructor(props) {
        // console.log("API ==> " + util.API_BASE_URL);
        super(props);
        this.state = {
            subscribedCourses : []
        };

        axios.get(`${util.API_BASE_URL}subscriptions/${window.localStorage.getItem('email')}`)
        .then(res => {
            this.setState({subscribedCourses : res.data.courses !== undefined ? res.data.courses : []});
        })

    }

    onSubscribe = (courseId)=> {
        // console.log("Passed Id is " + courseId);
        axios.get(`${util.API_BASE_URL}subscriptions/${window.localStorage.getItem('email')}`)
        .then(res => {
            if (res.data !== undefined && res.data.id !== undefined) {
                var currentSubscribedCourses = res.data.courses;
                currentSubscribedCourses.push(courseId);
                // console.log("Data to put ");
                console.log(currentSubscribedCourses);
                axios.put(`${util.API_BASE_URL}subscriptions/${window.localStorage.getItem('email')}`, { courses : currentSubscribedCourses})
                .then(res=>{
                this.setState({subscribedCourses : currentSubscribedCourses});
                })
                .catch(err=> {
                    console.log("Error occurred while subscribing due to ");
                    console.error(err);
                });
            } else {

            }
            
        }).catch(err=> {
            console.log("Record not found. Adding course from scratch");
            console.log(err);
            // this.setState({subscribedCourses : res.data.courses != undefined ? res.data.courses : []});
            // var currentSubscribedCourses = this.state.subscribedCourses;
            var currentSubscribedCourses = [courseId];
            axios.post(`${util.API_BASE_URL}subscriptions`, { courses : currentSubscribedCourses, id : window.localStorage.getItem('email')})
            .then(res=>{
                this.setState({subscribedCourses : currentSubscribedCourses});
            })
            .catch(err=> {
                console.log("Error occurred while subscribing due to ");
                console.error(err);
            });
        })
        
        var currentSubscribedCourses = this.state.subscribedCourses;
        currentSubscribedCourses = currentSubscribedCourses.push(courseId);


    }

    render() {
        return (
            <div>
                        <p>You have Subscribed {this.state.subscribedCourses.length} Courses</p>
                <div className="container-fluid">
                    <div className="row center">
                        {
                            this.props.data.map(data =>
                                <div className="col-sm col-md-3 col-xs mb4" key = {data.id}>
                                    
                                    <Cards name={data.name} description={data.description} onSubscribe={this.onSubscribe} subscribed={(this.state.subscribedCourses === undefined) ? false : this.state.subscribedCourses.includes(data.id)} id={data.id} links={data.links} image={data.image} />
                                </div>
                            )
                        } 
                    </div>

                </div>
            </div>
        )
    }
}
export default Courses;