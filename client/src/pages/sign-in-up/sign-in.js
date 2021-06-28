import React, { useContext } from 'react';
import styled from 'styled-components';
import { Form, Divider, Label, Button, Header, Grid } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

const bcrypt = require('bcryptjs');

const Container = styled.div`
  margin-top:30vh;
`

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: "",
      EntrPswrd: "",

      ButtonClicked: false,
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePswrd = this.handleChangePswrd.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    this.state.ButtonClicked = true;

    bcrypt.hash(this.state.EntrPswrd, 0).then((hash) => {
      alert(hash);
    });

    /*
     * TODO: database ... 
     */
  }

  handleChangeUsername(event) {
    this.setState({ Username: event.target.value });
  }

  handleChangePswrd(event) {
    this.setState({ EntrPswrd: event.target.value });
  }

  errorDiv = <div></div>;

  render() {
    return (
      <Form>
        <Header as='h3' dividing>
          Sign in
        </Header>
        <Form.Field>
          <input type='text' placeholder='Username' style={{ width: '300px' }} onChange={this.handleChangeUsername} />
        </Form.Field>
        <Divider />
        <Form.Field>
          <input type='password' placeholder='Password' style={{ width: '300px' }} onChange={this.handleChangePswrd} />
        </Form.Field>
        <Button onClick={this.signIn}>
          Sign in
        </Button>
        {this.errorDiv}
        {this.state.ButtonClicked ? <Redirect to='/board' /> : <div />}
      </Form>
    );
  }
}

function SignIn(props) {
  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <SignInForm />
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default SignIn;