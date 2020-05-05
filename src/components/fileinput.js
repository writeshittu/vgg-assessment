import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import util from "../util/util";
import uuid from "react-uuid";
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      uploading: false,

      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
    // console.log(fields)
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["courseName"]) {
      formIsValid = false;
      errors["courseName"] = "Cannot be empty";
    }

    if (!fields["courseTitle"]) {
      formIsValid = false;
      errors["courseTitle"] = "Cannot be empty";
    }
    if (!fields["courseTitle"]) {
      formIsValid = false;
      errors["courseTitle"] = "Cannot be empty";
    }
    // if (!fields["imagefile"]) {
    //   formIsValid = false;
    //   errors["imagefile"] = "Image not selected ";
    // }
    // if (!fields["videofile"]) {
    //   formIsValid = false;
    //   errors["videofile"] = "Video not selected ";
    // }
    this.setState({ errors: errors });
    return formIsValid;
  }

  async uploadFile(e) {
    e.preventDefault();

    if (this.validateForm()) {
      alert("Form has Error");
    } else {
      const uploadPreset = "h13wbqtf";
      const url = "https://api.cloudinary.com/v1_1/undercover/upload";
      let formData = new FormData();
      let file = this.imageUpload.files[0];

      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append(
        "tags",
        `uploaded by ${window.localStorage.getItem("name")}`
      );
      console.dir(formData);
      this.setState({ uploading: true });
      try {
        var res = await axios.post(url, formData);
        console.log("Successfully uploaded image", res);
        var imageUrl;
        var videoUrl;
        if (res.data !== undefined && res.data.url !== undefined) {
          console.log("About uploading video");

          imageUrl = res.data.url;
          formData = new FormData();
          let videoFile = this.videoUpload.files[0];
          formData.append("file", videoFile);
          formData.append("upload_preset", uploadPreset);
          formData.append(
            "tags",
            `uploaded by ${window.localStorage.getItem("name")}`
          );
          res = await axios.post(url, formData);
          console.log("Successfully uploaded video", res);

          if (res.data !== undefined && res.data.url !== undefined) {
            console.log("About uploading course");

            videoUrl = res.data.url;
            let uuidString = uuid();
            console.log(uuidString);
            let course = {
              name: this.state.fields["courseName"],

              image: imageUrl,

              description: this.state.fields["courseTitle"],
              links: [
                {
                  url: videoUrl,

                  title: this.state.fields["description"],
                },
              ],
            };
            axios
              .post(`${util.API_BASE_URL}courses`, course, {
                headers: { "content-type": "application/json" },
              })
              .then((res) => {
                console.log("Response is ", res);
              })
              .catch((err) => {
                console.error(
                  "Error occurred while uploading course to json server due to ",
                  err
                );
              });
          }
        }
      } catch (err) {
        alert("Error occurred during file upload");
      }
      this.setState({
        fields: ''
      });
      this.setState({
        uploading: false,
        fields : '',
      });
     
    }
  }

  render() {
    return (
      <Form onSubmit={this.uploadFile}>
        <Form.Group controlId="Form.ControlInput1">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            onChange ={this.handleChange}
            // value = {this.state.fields["courseName"]}
            name="courseName"
            type="text"
            placeholder="Course"
          />

          <span style={{ color: "red" }}>
            {this.state.errors["courseName"]}
          </span>
        </Form.Group>
        <Form.Group controlId="Form.ControlInput2">
          <Form.Label>Course Title </Form.Label>
          <Form.Control
            onChange={this.handleChange}
            // value = {this.state.fields["courseTitle"]}
            name="courseTitle"
            type="text"
            placeholder="course title"
          />

          <span style={{ color: "red" }}>
            {this.state.errors["courseTitle"]}
          </span>
        </Form.Group>
        <Form.Group controlId="Form.ControlTextarea1">
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            // value = {this.state.fields["description"]}
            name="description"
            as="textarea"
            rows="3"
          />

          <span style={{ color: "red" }}>
            {this.state.errors["description"]}
          </span>
        </Form.Group>
        <Form.Group controlId="Form.ControlFile1">
          <Form.Label>Choose Video to Upload </Form.Label>

          <input
            className="pa2"
            type="file"
            name="videofile"
            // value = {this.state.fields["videofile"]}
            label="Choose Video to upload"
            id="videoFile"
            ref={(file) => (this.videoUpload = file)}
          />
          <span style={{ color: "red" }}>
            {this.state.errors["videofile"]}
          </span>
        </Form.Group>

        <Form.Group>
          <Form.Label>Choose Cover Image for Course content </Form.Label>
          <input
            className="pa2 custom-file"
            type="file"
            // value = {this.state.fields["imagefile"]}
            name="imagefile"
            label="Choose Image to upload"
            id="imageFile"
            ref={(file) => (this.imageUpload = file)}
          />
          <span style={{ color: "red" }}>
            {this.state.errors["imagefile"]}
          </span>
        </Form.Group>
        <Form.Group>
          <input
            type="submit"
            variant="primary"
            className=" pa2 btn btn-primary"
            value={
              !this.state.uploading
                ? "Update  Course Content "
                : "Upload in progress"
            }
            disabled={this.state.uploading}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default FileInput;
