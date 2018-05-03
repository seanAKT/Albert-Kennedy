import React, { Component } from "react";
import styled from "styled-components";

import { Container } from "../styling/components";

export default class LGBTRedirect extends Component {
  render() {
    return (
      <Container>
        <p>
          If you do not identify as LGBT+ we recommend contacting these
          organisations instead:
        </p>
        <p>
          Shelter provides practical assistance, advice, information and
          advocacy to people experiencing homelessness:
          <a href="http://www.shelter.org.uk">www.shelter.org.uk</a>
          <a href="tel:0808 800 4444">0808 800 4444</a>
        </p>
        <p>
          Childine offer help and advice to anyone under 19 in the UK with any
          issue they’re going through:
          <a href="https://www.childline.org.uk">www.childline.org.uk</a>
          <a href="tel:0800 1111">0800 1111</a>
        </p>
        <p>
          The Mix is an online service that provides information and support on
          a range of issues for under 25s in the UK:
          <a href="http://www.themix.org.uk">www.themix.org.uk</a>
          <a href="tel:0808 808 4994">0808 808 4994</a>
        </p>
        <p>
          If you are being abused: call ChildLine on{" "}
          <a href="tel:0800 1111">0800 1111</a>
        </p>
        <p>
          If you’re looking for general support: call The Mix on{" "}
          <a href="tel:0808 808 4994">0808 808 4994</a>
        </p>
      </Container>
    );
  }
}
