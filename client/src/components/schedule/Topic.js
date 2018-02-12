import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { updateTopics } from "../../actions/appointment";
import Header from "../Header";
import SubmitButton from "../SubmitButton";

class TopicForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Header heading="Let’s talk" text="Choose as many as apply" />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="housing"
            label="Housing and homelessness"
            component={this.renderField}
          />
          <Field
            name="wellbeing"
            label="Wellbeing"
            component={this.renderField}
          />
          <Field
            name="comingout"
            label="Coming out to family and friends"
            component={this.renderField}
          />
          <Field
            name="bullying"
            label="Bullying and abuse"
            component={this.renderField}
          />
          <Field name="skills" label="Skills" component={this.renderField} />
          <Field
            name="other"
            label="Anything else!"
            component={this.renderField}
          />
          <SubmitButton text="next" />
        </form>
      </div>
    );
  }
  renderField(field) {
    return (
      <div>
        <label htmlFor={field.name}>{field.label}</label>
        <input type="checkbox" {...field.input} />
      </div>
    );
  }
  onSubmit = values => {
    this.props.updateTopics(values);
  };
}

export default reduxForm({
  form: "TopicForm"
})(connect(null, { updateTopics })(TopicForm));
