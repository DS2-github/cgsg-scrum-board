import React, { useContext } from 'react';
import styled from 'styled-components';
import { Form, Divider, Label, Button, Header, Grid } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { Context } from '../../index';

const bcrypt = require('bcryptjs');

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
      ButtonClicked: false,
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
      bcrypt.hash(this.state.EntrPswrd, 0).then((hash) => {
        alert(hash);
      });


      /*
       * TODO: database ... 
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
    if (event.target.value == this.state.EntrPswrd)
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
        </Button><br />
        Already have an account? <Link to='./signIn'>Sign in</Link>
        {this.errorDiv}
        {this.ButtonClicked ? <Redirect to='/' /> : <Redirect to='/SignUp' />}
      </Form>
    );
  }
}

function SignUp(props) {

  //const session = useContext(Context);


  //const [state, dispatch] = useReducer(boardReducer, initialState);

  // const getCard = useCallback(({colId, content}) => {
  //   session.socket.emit("getData");
  // });

  // let useEffect = ((data) => {
  //   data = user;
  //   session.socket.on("addUser", data => {
  //     console.log(data);
  //   })
  // })
  // useEffect();



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