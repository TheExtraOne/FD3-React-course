import React from 'react';
import PropTypes from 'prop-types';

import './mobile-client.css';

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
                    <button className='client__button'>Редактировать</button>
                </td>
                <td>
                    <button className='client__button'>Удалить</button>
                </td>
            </tr>
        );
    }
}

export default MobileClient;