import React, { Component } from "react";
import Header from "../Header";
import { PlaceholderDiv } from "../styling/components";
import { Link } from "react-router-dom";
import {
  fetchAppointments,
  cancelAppointment,
  onUnload
} from "../../actions/appointment";
import { connect } from "react-redux";
import LinkButton from "../LinkButton";
import styled from "styled-components";

const Card = styled.div`
  width: 90vw;
  height: 25vh;
  border-radius: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  margin: 10px;
  border-left: solid 8px #f47a20;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (min-width: 600px) {
    width: 50vw;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Img = styled.img`
  max-height: 25vh;
  max-width: 20vw;
`;

const Button = styled.button`
  height: 4vh;
  width: 90%;
  margin-bottom: 0.5rem;
  border: solid 0.1em #f47a20;
  background-color: white;
  border-radius: 0.3rem;

  &:active {
    background-color: #f47a20;
  }
`;

const FlexWrap = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
`;

const TextWrap = styled.div`
  width: 65%;

  > p {
    margin: 0.5em;
  }
`;

const NewAppButton = styled(LinkButton)`
  background: #f47a20;
  border: 2px solid #f47a20;
  border-radius: 5px;
  box-sizing: border-box;
  width: 50%;
  height: 60px;
  font-size: 16px;
  margin-top: 1rem;
  @media (min-width: 768px) {
    width: 50%;
    margin: 2rem;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  min-width: 20vw;
`;
class Profile extends Component {
  render() {
    if (!this.props.apts) {
      return (
        <div>
          <Header heading="My Appointments" text="crisis" logout />
          <PlaceholderDiv> Loading...</PlaceholderDiv>
        </div>
      );
    } else {
      return (
        <div>
          <Header heading="My Appointments" text="crisis" logout />
          <FlexWrap>
            {this.props.apts.map(appt => {
              console.log("appt", appt.img_url);
              const dates = this.convertDates(appt.date_and_time);
              return (
                <Card key={appt.chat_string}>
                  <ImgDiv>
                    <Img src={appt.mentor_img_url} />
                  </ImgDiv>
                  <TextWrap>
                    <p>{appt.mentor_name}</p>
                    <p>{dates[0]}</p>
                    <p>{dates[1]}</p>
                    <a href={"https://tlk.io/" + appt.chat_string}>
                      <Button>join chat</Button>
                    </a>
                    <Button onClick={() => this.handleClick(appt)}>
                      cancel appointment
                    </Button>
                  </TextWrap>
                </Card>
              );
            })}
            <NewAppButton text="new appointment" url="/topics" primary />
          </FlexWrap>
        </div>
      );
    }
  }

  componentDidMount() {
    this.props.fetchAppointments();
  }

  componentWillUnmount() {
    this.props.onUnload("clear_profile_state");
  }

  handleClick = appt => {
    this.props.cancelAppointment(appt);
  };

  convertDates = date => {
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleString("en-gb", dateOptions);
    const timeStr = dateObj.toLocaleString("en-gb", timeOptions);
    return [dateStr, timeStr];
  };
}

const mapStateToProps = state => {
  return {
    apts: state.userApts.apts
  };
};

export default connect(mapStateToProps, {
  fetchAppointments,
  cancelAppointment,
  onUnload
})(Profile);
