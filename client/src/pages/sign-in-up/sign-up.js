import React, { useContext } from 'react';
import styled from 'styled-components';
import { Form, Divider, Label, Button, Header, Grid } from 'semantic-ui-react'
//import bcrypt from 'bcrypt'

//const bcrypt = require('bcrypt');
//const saltRounds = 10;

const Container = styled.div`
  margin-top:30vh;
`

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: "",
      EntrPswrd: "",
      CnfrmPswrd: "",

      SamePswrd: false,
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePswrd = this.handleChangePswrd.bind(this);
    this.handleChangeCnfrm = this.handleChangeCnfrm.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  errorDivHandle() {
    if (this.state.Username === "") {
      this.errorDiv = <div>Please enter username</div>;
      return false;
    }
    if (this.state.EntrPswrd === "") {
      this.errorDiv = <div>Please enter password</div>;
      return false;
    }
    if (this.state.CnfrmPswrd === "") {
      this.errorDiv = <div>Please confirm password</div>;
      return false;
    }
    if (!this.state.SamePswrd) {
      this.errorDiv = <div>Passwords must be the same</div>;
      return false;
    }
    this.errorDiv = '';
    this.forceUpdate();
    return true;
  }

  signUp() {
    if (this.errorDivHandle()) {
      /*bcrypt.genSalt(saltRounds)
        .then(salt => {
          console.log(salt);
        });
      /*
       * TODO: passwords hashing, database ... 
       */
    }
    else
      this.forceUpdate();
  }

  handleChangeUsername(event) {
    this.setState({ Username: event.target.value });
  }

  handleChangePswrd(event) {
    this.setState({ EntrPswrd: event.target.value });
  }

  handleChangeCnfrm(event) {
    this.setState({ CnfrmPswrd: event.target.value });
    if (event.target.value === this.state.EntrPswrd)
      this.setState({ SamePswrd: true });
    else
      this.setState({ SamePswrd: false });
  }

  errorDiv = <div></div>;

  render() {
    return (
      <Form>
        <Header as='h3' dividing>
          Sign up
        </Header>
        <Form.Field>
          <input type='text' placeholder='Username' style={{ width: '300px' }} onChange={this.handleChangeUsername} />
        </Form.Field>
        <Divider />
        <Form.Field>
          <input type='password' placeholder='Password' style={{ width: '300px' }} onChange={this.handleChangePswrd} />
        </Form.Field>
        <Form.Field>
          <input type='password' placeholder='Confirm password' style={{ width: '300px' }} onChange={this.handleChangeCnfrm} />
        </Form.Field>
        <Button onClick={this.signUp}>
          Sign up
        </Button>
        {this.errorDiv}
      </Form>
    );
  }
}

function SignUp(props) {
  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <SignUpForm />
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default SignUp;