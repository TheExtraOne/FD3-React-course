import React from 'react';
import PropTypes from 'prop-types';

import './mobile-company.css';
import MobileClient from './mobile-client';

import {clientEvents} from './clientEvets';

class MobileCompany extends React.PureComponent {
    static propTypes = {
        clients:PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                fam: PropTypes.string.isRequired,
                im: PropTypes.string.isRequired,
                otch: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
        categoryNames: PropTypes.arrayOf(
            PropTypes.shape({
                part: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
            })
        )
    };

    state = {
        clients: this.props.clients,
    };

    filterActive = () => {
        let newClients = this.state.clients.filter( client => client.balance >= 0 );
        this.setState( {clients:newClients} );
    };

    filterBlocked = () => {
        let newClients = this.props.clients.filter( client => client.balance < 0 );
        this.setState( {clients:newClients} );
    };

    filterAll = () => {
        this.setState( {clients:this.props.clients} );
    };

    render() {
        console.log("MobileCompany render");

        const tableCapture = this.props.categoryNames.map( item => <td key={item.code}>{item.part}</td> );
        const tableString = this.state.clients.map( client => {
            let clientInfo = {id:client.id, fam:client.fam, im:client.im, otch:client.otch, balance:client.balance};
            return <MobileClient 
                key={client.id} 
                clientInfo={clientInfo}  />;
        });

        return (
            <div className='company'>
                <button className='company__button' onClick={this.filterAll}>Все</button>
                <button className='company__button' onClick={this.filterActive}>Активные</button>
                <button className='company__button' onClick={this.filterBlocked}>Заблокированные</button>

                <table className='company__clients'>
                    <tbody>
                        <tr className='company__table-capture'>{tableCapture}</tr>
                        {tableString}
                    </tbody>
                </table>

                <button className='company__button'>Добавить клиента</button>
            </div>
        );
    }
}

export default MobileCompany;