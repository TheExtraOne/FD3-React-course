import React from 'react';

import './mobile-client.css';
import {clientEvents} from './clientEvets';

const MobileClient = ({ clientInfo }) => {

    const { id, fam, im, otch, balance } = clientInfo;

    const deleteClicked = () => {
        clientEvents.emit('EDeleteClicked', id);
    };

    const editClicked = () => {
        clientEvents.emit('EEditClicked', clientInfo);
    };

    console.log(`MobileClient ${fam} render`);

    return (
        <tr key={id}>
            <td>{fam}</td>
            <td>{im}</td>
            <td>{otch}</td>
            <td>{balance}</td>
            <td className={ (balance >= 0) ? 'client__active' : 'client__blocked'}>
                {(balance >= 0) ? 'Active' : 'Blocked'}
            </td>
            <td>
                <button className='client__button' onClick={editClicked}>Редактировать</button>
            </td>
            <td>
                <button className='client__button' onClick={deleteClicked}>Удалить</button>
            </td>
        </tr>
    );
}

export default React.memo(MobileClient);