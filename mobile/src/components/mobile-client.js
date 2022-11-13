import React from 'react';
import PropTypes from 'prop-types';

import './mobile-client.css';
import {clientEvents} from './clientEvets';

class MobileClient extends React.PureComponent {
    static propTypes = {
        clientInfo: PropTypes.shape({
                id: PropTypes.number.isRequired,
                fam: PropTypes.string.isRequired,
                im: PropTypes.string.isRequired,
                otch: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
    };

    state = {
        fam: this.props.clientInfo.fam,
        im: this.props.clientInfo.im,
        otch: this.props.clientInfo.otch,
        balance: this.props.clientInfo.balance,
        isActive: (this.props.clientInfo.balance >= 0)
    };

    deleteClicked = () => {
        clientEvents.emit('EDeleteClicked', this.props.clientInfo.id);
    };

    editClicked = () => {
        clientEvents.emit('EEditClicked', this.props.clientInfo);
    }

    componentDidUpdate = (oldProps, oldState) => {
        if ( this.props.clientInfo.im !== this.state.im ) {
            this.setState({im:this.props.clientInfo.im});
        }
        if ( this.props.clientInfo.fam !== this.state.fam ) {
            this.setState({fam:this.props.clientInfo.fam});
        }
        if ( this.props.clientInfo.otch !== this.state.otch ) {
            this.setState({otch:this.props.clientInfo.otch});
        }
        if ( this.props.clientInfo.balance !== this.state.balance ) {
            this.setState({balance:this.props.clientInfo.balance,
                isActive: (this.props.clientInfo.balance >= 0)});
        }
    };

    render() {
        console.log(`MobileClient ${this.state.fam} render`);

        return (
            <tr key={this.props.clientInfo.id}>
                <td>{this.state.fam}</td>
                <td>{this.state.im}</td>
                <td>{this.state.otch}</td>
                <td>{this.state.balance}</td>
                <td className={ (this.state.isActive) ? 'client__active' : 'client__blocked'}>
                    {(this.state.isActive) ? 'Active' : 'Blocked'}
                </td>
                <td>
                    <button className='client__button' onClick={this.editClicked}>Редактировать</button>
                </td>
                <td>
                    <button className='client__button' onClick={this.deleteClicked}>Удалить</button>
                </td>
            </tr>
        );
    }
}

export default MobileClient;