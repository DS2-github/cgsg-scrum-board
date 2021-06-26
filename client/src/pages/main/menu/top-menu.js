import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components';


const Top = styled.div`
    width: 99vw;
    position:fixed;
`

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: [true, false, false, false],
        };
        this.toggleChange = this.toggleChange.bind(this);
    }
    toggleChange = (ind) => {
        const Active = Array(3).fill(false);
        Active[ind] = true;
        this.setState({
            active: Active,
        });
    }
    render() {
        return (
            <Top>
                <div class="ui secondary pointing menu">

                    <button class={`${this.state.active[0] ? "active " : " "}item blue`} onClick={() => this.toggleChange(0)}>
                        Home
                    </button>
                    <button class={`${this.state.active[1] ? "active " : " "}item blue`} onClick={() => this.toggleChange(1)}>
                        Messages
                    </button>
                    <button class={`${this.state.active[2] ? "active " : " "}item blue`} onClick={() => this.toggleChange(2)}>
                        Friends
                    </button>
                    <div class="right menu">
                        <button class={`ui ${this.state.active[3] ? "active " : " "}item blue`} onClick={() => this.toggleChange(3)}>
                            Logout
                        </button>
                    </div>
                </div>
            </Top>
        );
    }
}