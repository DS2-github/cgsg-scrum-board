import React, { useContext } from 'react';
import Board from './board/board';
import TopMenu from './menu/top-menu';
import { SocketContext } from '../../index';


function Main(props) {
    const session = useContext(SocketContext);
    return (
        <div>
            <TopMenu />
            <Board />
        </div>
    );
}

export default Main;