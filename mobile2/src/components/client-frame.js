import React, { Fragment, useRef } from 'react';

import './client-frame.css';
import {clientEvents} from './clientEvets';

const defaultClientInfo = {
    id: null,
    fam: null,
    im: null,
    otch: null,
    balance: null,
}

const ClientFrame = ({ clientInfo = defaultClientInfo, mode}) => {
    const famRef = useRef(null);
    const nameRef = useRef(null);
    const otchRef = useRef(null);
    const balRef = useRef(null);

    const { id, fam, im, otch, balance } = clientInfo;

    const cancelClicked = () => {
        clientEvents.emit('ECanselClicked');
    };

    const saveClicked = () => {
        if (famRef.current && nameRef.current && otchRef.current && balRef.current) {
            clientEvents.emit('ESaveClicked',
            id, famRef.current.value,
            nameRef.current.value, otchRef.current.value,
            parseFloat(balRef.current.value));
        }
    }

    console.log("ClientFrame render");

    return (
        <div className='client-frame'>
            {(mode === 1) && 
                <Fragment>
                    <label className='client-frame__label'>Фамилия
                        <input type='text' defaultValue={fam} 
                        className='client-frame__info-string' ref={famRef}/>
                    </label>
                    <br/>
                    <label className='client-frame__label'>Имя
                        <input type='text' defaultValue={im}
                        className='client-frame__info-string' ref={nameRef}/>
                    </label>
                    <br/>
                    <label className='client-frame__label'>Отчество
                        <input type='text' defaultValue={otch}
                        className='client-frame__info-string' ref={otchRef}/>
                    </label>
                    <br/>
                    <label className='client-frame__label'>Баланс
                        <input type='naumber' defaultValue={balance}
                        className='client-frame__info-string' ref={balRef}/>
                    </label>
                    <br/>
                </Fragment>
            }
            {(mode === 2) && 
                <Fragment>
                    <label className='client-frame__label'>Фамилия
                        <input type='text' defaultValue={null} 
                        className='client-frame__info-string' ref={famRef}/>
                    </label>
                    <br/>
                    <label className='client-frame__label'>Имя
                        <input type='text' defaultValue={null}
                        className='client-frame__info-string' ref={nameRef}/>
                    </label>
                    <br/>
                    <label className='client-frame__label'>Отчество
                        <input type='text' defaultValue={null}
                        className='client-frame__info-string' ref={otchRef}/>
                    </label>
                    <br/>
                    <label className='client-frame__label'>Баланс
                        <input type='naumber' defaultValue={null}
                        className='client-frame__info-string' ref={balRef}/>
                    </label>
                    <br/>
                </Fragment>
            }
            <button className='client-frame__button' onClick={saveClicked}>Сохранить</button>
            <button className='client-frame__button' onClick={cancelClicked}>Отмена</button>
        </div>
    );
}

export default ClientFrame;