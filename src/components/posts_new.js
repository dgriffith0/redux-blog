import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

 class PostsNew extends Component {
    renderField(field) {
        const {meta: {touched, error} } = field;
        const className=`form-group ${touched && error ? 'has-danger' : ''}`
        return(
            <div className={className}>
            <label>{field.label}</label>
                <input           
                    type={field.type}       
                    {...field.input}
                    className="form-control"
                />
                <div className="text-help">{touched ? error : ''}</div>
            </div>
        )
    }

    onSubmit(values) {
        //programming navigation to /
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title for Post"
                    name="title"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    label="Categories"
                    type="text"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="Post Content"
                    type="text"
                    name="content"
                    component={this.renderField}
                />   
                <button type="submit" className="btn btn-primary">Submit</button>           
                <Link to="/" className="btn btn-danger">Cancel</Link>  
            </form>
        );
    }
 }

 function validate(values) {
    const errors = {};
    
    //validate values
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title';
    }
    if (!values.categories) {
        errors.categories = 'Enter some categories.'
    }
    if (!values.content) {
        errors.content = 'Enter some content please';
    }

    //if empty errors then pass
    return errors;
 }
 
 export default reduxForm({
     validate,
     form: 'PostsNewForm'
 })(
    withRouter(connect(null,{createPost})(PostsNew))
    );