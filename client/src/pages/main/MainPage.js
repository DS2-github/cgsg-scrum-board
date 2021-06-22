import React from 'react';
import Board from './board/board';
import TopMenu from './menu/TopMenu';

function Main(props) {
    return (
        <div>
            <TopMenu />
            <Board />
        </div>
    );
}

export default Main;