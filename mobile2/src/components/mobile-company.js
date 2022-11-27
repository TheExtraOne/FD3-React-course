import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './mobile-company.css';
import MobileClient from './mobile-client';
import ClientFrame from './client-frame';
import { updateClients, addNewClient, deleteClient } from "../redux/clientsSlice.js";
import {clientEvents} from './clientEvets';

const MobileCompany = ({ categoryNames }) => {
    const clients = useSelector( state => state.clients.clientsArr);

    const dispatch = useDispatch();

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
    const [ showClientFrame, setShowClientFrame ] = useState(false);
    const [ clientFrameMode, setClientFrameMode ] = useState(1); //1 -change, 2- add new client
    const [ clientFrameInfo, setClientFrameInfo ] = useState(null);
    const [ whichFilter, setFilter] = useState(1); //1 -all, 2-active, 3-blocked
    const [ nextID, setNextID ] = useState(cbGetNextID);

    const filterActive = () => {
        let newClients = clients.filter( client => client.balance >= 0 );
        setClients(newClients);
        setFilter(2);
    };

    const filterBlocked = () => {
        let newClients = clients.filter( client => client.balance < 0 );
        setClients(newClients);
        setFilter(3);
    };

    const filterAll = () => {
        setClients(clients);
        setFilter(1);
    };

    const deleteUser = (id) => {
        dispatch(deleteClient(id));
    };

    const editUser = (clientInfo) => {
        setShowClientFrame(true);
        setClientFrameMode(1);
        setClientFrameInfo(clientInfo);
    };

    const createClient = () => {
        setShowClientFrame(true);
        setClientFrameMode(2);
    };

    const canselFrame = () => {
        setShowClientFrame(false);
        setClientFrameInfo(null);
    };

    const updateClientInfo = (id, familia, name, otches, money) => {
        let newClientsNotDel = [...clients];
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
                dispatch(updateClients(newClientsNotDel));
                canselFrame();
            }
        //добавление нового
        } else {
            newClientsNotDel.push({id:nextID, fam:familia, im:name, otch:otches, balance:money});
            dispatch(addNewClient({id:nextID, fam:familia, im:name, otch:otches, balance:money}));
            setNextID(nextID + 1);
            canselFrame();
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

    useEffect(() => {
        const filterAfterChange = (arr) => {
            if (whichFilter === 2) {
                return arr.filter( client => client.balance >= 0 );
            } else if (whichFilter === 3) {
                return arr.filter( client => client.balance < 0 );
            } else {
                return arr;
            }
        };
        setClients(filterAfterChange(clients));
    }, [ clients, whichFilter ]);

    //console.log("MobileCompany render");

    const tableCapture = categoryNames.map( item => <td key={item.code}>{item.part}</td> );
    const tableStringMemo = useMemo(
        () => visibleClients.map( client => <MobileClient key={client.id} clientInfo={client} /> ),
        [visibleClients]
    );

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
                    { tableStringMemo }
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