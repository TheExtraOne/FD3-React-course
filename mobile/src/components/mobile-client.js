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

    deleteClicked = () => {
        clientEvents.emit('EDeleteClicked', this.props.clientInfo.id);
    };

    editClicked = () => {
        clientEvents.emit('EEditClicked', this.props.clientInfo);
    }

    render() {
        console.log(`MobileClient ${this.props.clientInfo.fam} render`);

        return (
            <tr key={this.props.clientInfo.id}>
                <td>{this.props.clientInfo.fam}</td>
                <td>{this.props.clientInfo.im}</td>
                <td>{this.props.clientInfo.otch}</td>
                <td>{this.props.clientInfo.balance}</td>
                <td className={ (this.props.clientInfo.balance >= 0) ? 'client__active' : 'client__blocked'}>
                    {(this.props.clientInfo.balance >= 0) ? 'Active' : 'Blocked'}
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