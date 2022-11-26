import React, { useState, useCallback, useEffect } from 'react';

import './mobile-company.css';
import MobileClient from './mobile-client';
import ClientFrame from './client-frame';

import {clientEvents} from './clientEvets';

const MobileCompany = ({ clients, categoryNames}) => {

    const cbGetNextID = useCallback(() => getNextID(clients), [ clients ]);
    
    const getNextID = (arr) => {
        let maxValue = 0;
        for (let client of arr) {
            if (client.id > maxValue) {
                maxValue = client.id;
            }
        }
        return maxValue + 1;
    }

    const [ visibleClients, setClients ] = useState(clients);
    const [ allClients, setAllClients ] = useState(clients);
    const [ showClientFrame, setShowClientFrame ] = useState(false);
    const [ clientFrameMode, setClientFrameMode ] = useState(1); //1 -change, 2- add new client
    const [ clientFrameInfo, setClientFrameInfo ] = useState(null);
    const [ whichFilter, setFilter] = useState(1); //1 -all, 2-active, 3-blocked
    const [ nextID, setNextID ] = useState(cbGetNextID);

    const filterActive = () => {
        let newClients = allClients.filter( client => client.balance >= 0 );
        setClients(newClients);
        setFilter(2);
        // this.setState( {clients:newClients,
        //     whichFilter:2} );
    };

    const filterBlocked = () => {
        let newClients = allClients.filter( client => client.balance < 0 );
        setClients(newClients);
        setFilter(3);
        // this.setState( {clients:newClients,
        //     whichFilter:3} );
    };

    const filterAll = () => {
        setClients(allClients);
        setFilter(1);
        // this.setState( {clients:this.state.notDeletedClients,
        //     whichFilter:1} );
    };

    const filterAfterChange = (arr) => {
        if (whichFilter === 2) {
            return arr.filter( client => client.balance >= 0 );
        } else if (whichFilter === 3) {
            return arr.filter( client => client.balance < 0 );
        } else {
            return arr;
        }
    };

    const deleteUser = (id) => {
        let newClients = allClients.filter(client => client.id !== id);
        setAllClients(newClients);
        setClients(filterAfterChange(newClients))
        // this.setState({
        //     notDeletedClients: newClients,
        //     clients: this.filterAfterChange(newClients)});
    };

    const editUser = (clientInfo) => {
        setShowClientFrame(true);
        setClientFrameMode(1);
        setClientFrameInfo(clientInfo);
        // this.setState({
        //     showClientFrame: true,
        //     clientFrameMode:1,
        //     clientFrameInfo: clientInfo})
    };

    const createClient = () => {
        setShowClientFrame(true);
        setClientFrameMode(2);
        // this.setState({
        //     showClientFrame: true,
        //     clientFrameMode:2})
    };

    const updateClientsInfo = () => {
        //console.log(allClients);
        setClients(filterAfterChange(allClients))
        //this.setState({clients: this.filterAfterChange(this.state.notDeletedClients)})
    };

    const canselFrame = () => {
        setShowClientFrame(false);
        setClientFrameInfo(null);
        updateClientsInfo();
        // this.setState({
        //     showClientFrame:false,
        //     clientFrameInfo: null},
        //     this.updateClientsInfo)
    };

    const updateClientInfo = (id, familia, name, otches, money) => {
        let newClientsNotDel = [...allClients];
        //изменение уже существующего
        if (clientFrameMode === 1) {
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
                setAllClients(newClientsNotDel);
                canselFrame();
                //this.setState({notDeletedClients: newClientsNotDel},this.canselFrame);
            }
        //добавление нового
        } else {
            newClientsNotDel.push({id:this.state.nextID, fam:familia, im:name, otch:otches, balance:money});
            setAllClients(newClientsNotDel);
            setNextID(nextID + 1);
            canselFrame();
            // this.setState({notDeletedClients: newClientsNotDel,
            //     nextID: this.state.nextID+1}, //если написать nextID: this.state.nextID++, то ругается, что я изменяю напрямую
            //     this.canselFrame);
        }
    }

    useEffect (() => {
        clientEvents.addListener('EDeleteClicked', deleteUser);
        clientEvents.addListener('EEditClicked', editUser);
        clientEvents.addListener('ECanselClicked', canselFrame);
        clientEvents.addListener('ESaveClicked', updateClientInfo);

        return () => {
            clientEvents.removeListener('EDeleteClicked', deleteUser);
            clientEvents.removeListener('EEditClicked', editUser);
            clientEvents.removeListener('ECanselClicked', canselFrame);
            clientEvents.removeListener('ESaveClicked', updateClientInfo);
        }
    })

    //console.log("MobileCompany render");

    const tableCapture = categoryNames.map( item => <td key={item.code}>{item.part}</td> );
    const tableString = visibleClients.map( client => {
        return <MobileClient 
            key={client.id} 
            clientInfo={client}  />;
    });

    return (
        <div className='company'>
            <button className={ (whichFilter === 1) ? 'company__button company__button_chosen' : 'company__button'}
                onClick={filterAll}>
                    Все
            </button>
            <button className={ (whichFilter === 2) ? 'company__button company__button_chosen' : 'company__button'}
                onClick={filterActive}>
                    Активные
            </button>
            <button className={ (whichFilter === 3) ? 'company__button company__button_chosen' : 'company__button'}
                onClick={filterBlocked}>
                    Заблокированные
            </button>

            <table className='company__clients'>
                <tbody>
                    <tr className='company__table-capture'>{tableCapture}</tr>
                    {tableString}
                </tbody>
            </table>

            <button className='company__button' onClick={createClient}>Добавить клиента</button>

            {
                (showClientFrame && clientFrameMode === 1) &&
                <ClientFrame
                    clientInfo={clientFrameInfo}
                    mode={clientFrameMode}
                    key={clientFrameInfo.id}/>
            }

            {
                (showClientFrame && clientFrameMode === 2) &&
                <ClientFrame mode={clientFrameMode}/>
            }
        </div>
    );
}

export default MobileCompany;