import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validate } from './validation';
import { Form, Field } from 'react-final-form'

const Login = (props) => {

    useEffect(() => {
        // Update the document title using the browser API
        console.log("render");
    });

	const renderInput = ({input, meta, type, placeholder}) =>
		<div className="position-relative form-group">
			<input placeholder={placeholder} className={`form-control ${meta.touched && meta.invalid ? 'border-danger' : ''}`} type={type} {...input}/>
			{ meta.dirty && meta.invalid && <div className="invalid-feedback d-block text-left">{meta.error}</div>}
			{ !meta.dirty && meta.touched && <div className="invalid-feedback d-block text-left">Cannot be empty</div>}
		</div>

	const onSubmit = (values) => {
		console.log(values);
	}

	return (
		<div className="login">
			<Form onSubmit={onSubmit} validate={validate}>
				{({handleSubmit, submitting}) => <form onSubmit={handleSubmit}>
					<Field name="identifier" placeholder="username or email" type="text" component={renderInput}/>
					<Field name="password" placeholder="password" type="password" component={renderInput}/>
					<div className="position-relative form-group text-center mt-5">
						<button type="submit" disabled={submitting} className="login-btn btn btn-lg w-50">Login</button>
					</div>
					<div className="position-relative form-group mt-5 text-center">
						<label>New to chatty? <Link to="/signup">Register here</Link></label>
					</div>
				</form>}
			</Form>
		</div>
	);
}

export default Login;