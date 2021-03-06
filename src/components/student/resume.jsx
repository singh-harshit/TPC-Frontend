import React from "react";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export class StudentResume extends React.Component
{

  constructor(props){
    super(props);
  this.state = {
    refreshToken:localStorage.getItem('refreshToken'),
    authToken:localStorage.getItem('authToken'),
    _id:localStorage.getItem('_id'),
    resumeLink:'',
    resumeFile:null
  };
}

  handleFile = (event) =>
  {
    this.setState({
      resumeFile: event.target.files[0]
    });
  }
  handleLink = (event) =>
  {
    this.setState({
      resumeLink: event.target.value
    });
  }
  handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        const formData = new FormData();
        formData.append('resumeFile',this.state.resumeFile);
        formData.append('resumeLink',this.state.resumeLink);
        console.log(formData);
        axios.post('/backend/student/resume/'+this.state._id,formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
    				'x-auth-token': this.state.authToken,
    				'x-refresh-token': this.state.refreshToken,
          }
        })
        .then(() =>{
          console.log('data has been sent to server');
          this.setState({
            redirect:"/student"
          })
        })
        .catch((error)=>{
          console.log('data error',error);
          alert("Could not upload resume")
        });
    };

  render()
  {
    
    if (this.state.redirect)
    {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <div className="base-container border rounded border-success admin m-3 p-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="resumeFile">Resume File</label>
            <input type="file" className="form-control-file border" id='resumeFile' required onChange={this.handleFile}/>
            <label for="resumeLink">Resume Link</label>
            <input type="text" className="form-control-file border" id='resumeLink' onChange={this.handleLink}/>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
  );
  }
}
