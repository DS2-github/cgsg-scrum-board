import React, { useContext } from 'react';
import Board from './board/board';
import TopMenu from './menu/top-menu';
import styled from 'styled-components';
import { SocketContext } from '../../index';

const Container = styled.div`
  display: inline-block;
  max-width: 1300px;
  
  height: 95vh;
  overflow: auto;
`

const SideMenu = styled.div`
  vertical-align: top;
  display: inline-block;
  width: 250px;
  height: 95vh;
`

function Main(props) {
    const session = useContext(SocketContext);
    return (
        <div>
            <TopMenu />
            <Container>
                <SideMenu>
                </SideMenu>
                <Board />
            </Container>
        </div>
    );
}

export default Main;