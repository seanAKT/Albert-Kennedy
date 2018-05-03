import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetError } from "../../actions/auth";
import styled from "styled-components";
import { resetPassword } from "../../actions/auth";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  padding: 0 5vw 0 5vw;
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  background-color: #dfdbe5;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(180deg, #7c53a2 0%, rgba(124, 83, 162, 0) 100%);
`;

const Input = styled.input`
  height: 5vh;
  width: 70vw;
  margin: 1vh auto;
  box-shadow: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 0.05em solid rgba(0, 0, 0, 0.9);
  background: none;
  font-size: 1rem;
  ::placeholder {
    color: black;
    font-size: 1rem;
  }
  &:focus {
    -webkit-appearance: none;
    outline: none;
  }
`;

const Error = styled.p`
  margin: 0;
  width: 90vw;
  color: white;
  height: 5vh;
  font-size: 0.75em;
  text-align: left;
  padding-left: 10vw;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background: #f47a20;
  border: 2px solid #f47a20;
  border-radius: 5px;
  box-sizing: border-box;
  width: 90vw;
  height: 60px;
  font-size: 16px;
  position: absolute;
  bottom: 15vh;
`;

const Register = styled.p`
  width: 100vw;
  text-align: center;
  position: absolute;
  font-size: 1rem;
  bottom: 3vh;
`;

const Header = styled.h1`
  margin-top: 5vh;
  margin-bottom: 10vh;
`;



class ResetPasswordForm extends Component {
    render() {
      const { handleSubmit } = this.props;
      return (
        <Container>
          <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Header>inter-AKT</Header>
            <Field
              name="newPassword"
              type="password"
              label="New password:"
              placeholder="Enter a new password"
              component={this.renderField}
            />

            <Field
              name="confirmPassword"
              type="password"
              label="Confirm your password:"
              placeholder="Confirm your password"
              component={this.renderField}
            />
            <p>{this.renderAlert()}</p>
  
            <Button type="submit">Reset</Button>
  
            <Register>
              New to inter-AKT? <Link to="/">Start here</Link>
            </Register>
          </Form>
        </Container>
      );
    }
  
    renderField(field) {
      const { meta: { touched, error } } = field;
      return (
        <div>
          <Input
            {...field.input}
            type={field.type}
            placeholder={field.placeholder}
          />
          <Error>{touched ? error : ""}</Error>
        </div>
      );
    }
  
    renderAlert() {
      if (this.props.error) {
        return <span>{this.props.error}</span>;
      }
    }
  
    handleFormSubmit(values) {
      this.props.resetPassword(values);
    }
  
    componentDidMount() {
      this.props.resetError();
    }
  }

  const checkPassword = string => {
    let regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$");
    return regex.test(string);
  };
  
  const validate = values => {
    const errors = {};
    if (!values.newPassword) errors.newPassword = "Enter your password";
    if (!checkPassword(values.newPassword)) {
      errors.newPassword =
        "Include one uppercase letter, one number and a minimum of 6 characters.";
    }
    if (values.newPassword !== values.confirmPassword)
      errors.confirmPassword = "Oops! These passwords don't match.";
    if (!values.confirmPassword)
      errors.confirmPassword = "Enter your password again";
    return errors;
  };

  const mapStateToProps = state => ({
    error: state.error
  });
  

  export default reduxForm({
    validate,
    form: "ResetPasswordForm"
  })(connect(mapStateToProps, { resetPassword, resetError })(ResetPasswordForm));
  

