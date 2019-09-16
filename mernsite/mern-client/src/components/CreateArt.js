import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateArt extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      url:'',
      material:'',
      size:'',
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      url: this.state.url,
      material: this.state.material,
      size: this.state.size,
    };

    axios
      .post('http://localhost:8082/api/art', data)
      .then(res => {
        this.setState({
          name: '',
          url:'',
          material:'',
          size:'',

        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateArt!");
      })
  };

  render() {
    return (
      <div className="CreateArt">
        <div className="container">
          <div className="row">

            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Art</h1>
              <p className="lead text-center">
                  Create new art
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='form-control'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='URL'
                    name='url'
                    className='form-control'
                    value={this.state.url}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Material'
                    name='material'
                    className='form-control'
                    value={this.state.material}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Size of Piece'
                    name='size'
                    className='form-control'
                    value={this.state.size}
                    onChange={this.onChange}
                  />
                </div>


                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArt;