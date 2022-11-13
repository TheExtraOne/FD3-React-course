import React from 'react';
import PropTypes from 'prop-types';

import './mobile-company.css';
import MobileClient from './mobile-client';
import ClientFrame from './client-frame';

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
        notDeletedClients: this.props.clients,
        showClientFrame: false,
        clientFrameMode: 1, //1 -change, 2- add new client
        clientFrameInfo: null,
        whichFilter: 1, //1 -all, 2-active, 3-blocked
        nextID: this.props.clients.length + 1,
    };

    filterActive = () => {
        let newClients = this.state.notDeletedClients.filter( client => client.balance >= 0 );
        this.setState( {clients:newClients,
            whichFilter:2} );
    };

    filterBlocked = () => {
        let newClients = this.state.notDeletedClients.filter( client => client.balance < 0 );
        this.setState( {clients:newClients,
            whichFilter:3} );
    };

    filterAll = () => {
        this.setState( {clients:this.state.notDeletedClients,
            whichFilter:1} );
    };

    deleteUser = (id) => {
        let newClients;

        //Все if для того, чтобы сразу после удаления пользователя, список оставшихся
        //можно было отсортировать в зависимости от ранее выбранного фильтра
        if (this.state.whichFilter === 1) {
            newClients = this.state.notDeletedClients.filter(client => client.id !== id);
        }
        if (this.state.whichFilter === 2) {
            newClients = this.state.notDeletedClients.filter(client => client.id !== id && client.balance >= 0);
        }
        if (this.state.whichFilter === 3) {
            newClients = this.state.notDeletedClients.filter(client => client.id !== id && client.balance < 0);
        }
        
        this.setState({
            notDeletedClients: this.state.notDeletedClients.filter(client => client.id !== id),
            clients: newClients});
    };

    editUser = (clientInfo) => {
        this.setState({
            showClientFrame: true,
            clientFrameMode:1,
            clientFrameInfo: clientInfo})
    };

    createClient = () => {
        this.setState({
            showClientFrame: true,
            clientFrameMode:2})
    };

    canselFrame = () => {
        this.setState({
            showClientFrame:false,
            clientFrameInfo: null},
            this.updateClientsInfo)
    };

    updateClientsInfo = () => {
        let newClients;
        //Все if для того, чтобы сразу после изменения пользователя, список
        //можно было отсортировать в зависимости от ранее выбранного фильтра
        if (this.state.whichFilter === 1) {
            newClients = this.state.notDeletedClients;
        }
        if (this.state.whichFilter === 2) {
            newClients = this.state.notDeletedClients.filter(client => client.balance >= 0);
        }
        if (this.state.whichFilter === 3) {
            newClients = this.state.notDeletedClients.filter(client => client.balance < 0);
        }

        this.setState({clients: newClients})
    };

    updateClientInfo = (id, familia, name, otches, money) => {
        let newClientsNotDel = [...this.state.notDeletedClients];
        //изменение уже существующего
        if (this.state.clientFrameMode === 1) {
            let changed = false;

            newClientsNotDel.forEach( (client,i) => {
                if (client.id === id) {
                    let newClient = {...client}; // копия хэша изменившегося клиента

                    newClient.fam = familia;
                    newClient.im = name;
                    newClient.otch = otches;
                    newClient.balance = money;
                    
                    newClientsNotDel[i] = newClient;
                    changed = true;
                }
            });

            if (changed) {
                this.setState({notDeletedClients: newClientsNotDel},this.canselFrame);
            }
        //добавление нового
        } else {
            newClientsNotDel.push({id:this.state.nextID, fam:familia, im:name, otch:otches, balance:money});
            this.setState({notDeletedClients: newClientsNotDel,
                nextID: this.state.nextID+1}, //если написать nextID: this.state.nextID++, то ругается, что я изменяю напрямую
                this.canselFrame);
        }
    }

    componentDidMount = () => {
        clientEvents.addListener('EDeleteClicked', this.deleteUser);
        clientEvents.addListener('EEditClicked', this.editUser);
        clientEvents.addListener('ECanselClicked', this.canselFrame);
        clientEvents.addListener('ESaveClicked', this.updateClientInfo);
    };

    componentWillUnmount = () => {
        clientEvents.removeListener('EDeleteClicked', this.deleteUser);
        clientEvents.removeListener('EEditClicked', this.editUser);
        clientEvents.removeListener('ECanselClicked', this.canselFrame);
        clientEvents.removeListener('ESaveClicked', this.updateClientInfo);
    };

    render() {
        console.log("MobileCompany render");

        const tableCapture = this.props.categoryNames.map( item => <td key={item.code}>{item.part}</td> );
        const tableString = this.state.clients.map( client => {
            return <MobileClient 
                key={client.id} 
                clientInfo={client}  />;
        });

        return (
            <div className='company'>
                <button className={ (this.state.whichFilter === 1) ? 'company__button company__button_chosen' : 'company__button'}
                    onClick={this.filterAll}>
                        Все
                </button>
                <button className={ (this.state.whichFilter === 2) ? 'company__button company__button_chosen' : 'company__button'}
                    onClick={this.filterActive}>
                        Активные
                </button>
                <button className={ (this.state.whichFilter === 3) ? 'company__button company__button_chosen' : 'company__button'}
                    onClick={this.filterBlocked}>
                        Заблокированные
                </button>

                <table className='company__clients'>
                    <tbody>
                        <tr className='company__table-capture'>{tableCapture}</tr>
                        {tableString}
                    </tbody>
                </table>

                <button className='company__button' onClick={this.createClient}>Добавить клиента</button>

                {
                    (this.state.showClientFrame && this.state.clientFrameMode === 1) &&
                    <ClientFrame
                        clientInfo={this.state.clientFrameInfo}
                        mode={this.state.clientFrameMode}
                        key={this.state.clientFrameInfo.id}/>
                }

                {
                    (this.state.showClientFrame && this.state.clientFrameMode === 2) &&
                    <ClientFrame mode={this.state.clientFrameMode}/>
                }
            </div>
        );
    }
}

export default MobileCompany;