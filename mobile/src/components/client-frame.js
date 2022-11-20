import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './client-frame.css';
import {clientEvents} from './clientEvets';

class ClientFrame extends React.PureComponent {
    static propTypes = {
        clientInfo: PropTypes.shape({
                id: PropTypes.number,
                fam: PropTypes.string,
                im: PropTypes.string,
                otch: PropTypes.string,
                balance: PropTypes.number,
            }),
        mode: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.famRef = React.createRef();
        this.nameRef = React.createRef();
        this.otchRef = React.createRef();
        this.balRef = React.createRef();
    };

    state = {
        id: (this.props.mode === 1) ? this.props.clientInfo.id : null,
    };

    cancelClicked = () => {
        clientEvents.emit('ECanselClicked');
    };

    saveClicked = () => {
        if (this.famRef.current && this.nameRef.current && this.otchRef.current && this.balRef.current) {
            clientEvents.emit('ESaveClicked',
            this.state.id, this.famRef.current.value,
            this.nameRef.current.value, this.otchRef.current.value,
            parseFloat(this.balRef.current.value));
        }
    }

    render() {
        console.log("ClientFrame render");

        return (
            <div className='client-frame'>
                {(this.props.mode === 1) && 
                <Fragment>
                        <label className='client-frame__label'>Фамилия
                            <input type='text' defaultValue={this.props.clientInfo.fam} 
                            className='client-frame__info-string' ref={this.famRef}/>
                        </label>
                        <br/>
                        <label className='client-frame__label'>Имя
                            <input type='text' defaultValue={this.props.clientInfo.im}
                            className='client-frame__info-string' ref={this.nameRef}/>
                        </label>
                        <br/>
                        <label className='client-frame__label'>Отчество
                            <input type='text' defaultValue={this.props.clientInfo.otch}
                            className='client-frame__info-string' ref={this.otchRef}/>
                        </label>
                        <br/>
                        <label className='client-frame__label'>Баланс
                            <input type='naumber' defaultValue={this.props.clientInfo.balance}
                            className='client-frame__info-string' ref={this.balRef}/>
                        </label>
                        <br/>
                    </Fragment>
                }
                {(this.props.mode === 2) && 
                    <Fragment>
                        <label className='client-frame__label'>Фамилия
                            <input type='text' defaultValue={null} 
                            className='client-frame__info-string' ref={this.famRef}/>
                        </label>
                        <br/>
                        <label className='client-frame__label'>Имя
                            <input type='text' defaultValue={null}
                            className='client-frame__info-string' ref={this.nameRef}/>
                        </label>
                        <br/>
                        <label className='client-frame__label'>Отчество
                            <input type='text' defaultValue={null}
                            className='client-frame__info-string' ref={this.otchRef}/>
                        </label>
                        <br/>
                        <label className='client-frame__label'>Баланс
                            <input type='naumber' defaultValue={null}
                            className='client-frame__info-string' ref={this.balRef}/>
                        </label>
                        <br/>
                    </Fragment>
                }
                <button className='client-frame__button' onClick={this.saveClicked}>Сохранить</button>
                <button className='client-frame__button' onClick={this.cancelClicked}>Отмена</button>
            </div>
        );
    }
}

export default ClientFrame;