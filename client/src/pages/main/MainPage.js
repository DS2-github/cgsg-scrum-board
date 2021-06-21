import React, { useContext } from 'react';
import Board from './board/Board.js';
import TopMenu from './menu/TopMenu.js';
import { SocketContext } from './../../index';

function Main() {
    const session = useContext(SocketContext);

    return (
        <div>
            <div>
                <TopMenu />
            </div>
            <div className="Brd">
                <Board />
            </div>
        </div>
    );
}

export default Main;