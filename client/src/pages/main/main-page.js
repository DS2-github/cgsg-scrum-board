import React, { useContext } from 'react';
import Board from './board/board';
import TopMenu from './menu/top-menu';
import styled from 'styled-components';
import { Context } from '../../index';

const Container = styled.div`
  display: inline-block;
  margin-top: 40px;
  overflow: auto;
`
function Main(props) {
  const session = useContext(Context);
  return (
    <div>
      <TopMenu />
      <Container>
        <Board />
      </Container>
    </div>
  );
}

export default Main;