import React from 'react';
import './TopMenu.css';

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: [true, false, false],
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
            <div className="option_group">
                <div className="img"><img src={require('./logo.png').default} /></div>
                <div>

                    <button className={`option_item ${this.state.active[0] ? "active" : "passive"}`}
                        onClick={() => this.toggleChange(0)}>
                        Tasks
                </button>
                    <button className={`option_item ${this.state.active[1] ? "active" : "passive"}`}
                        onClick={() => this.toggleChange(1)}>
                        Projects
                </button>
                    <button className={`option_item ${this.state.active[2] ? "active" : "passive"}`}
                        onClick={() => this.toggleChange(2)}>
                        Team
                </button>
                </div>
            </div>
        );
    }
}