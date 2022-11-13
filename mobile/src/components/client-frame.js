import React from 'react';
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
        fam: this.props.clientInfo.fam,
        im: this.props.clientInfo.im,
        otch: this.props.clientInfo.otch,
        balance: this.props.clientInfo.balance,
    };

    setNewInfo = () => {
        if (this.famRef.current) {
            this.setState({fam: this.famRef.current.value})
        }
        if (this.nameRef.current) {
            this.setState({im: this.nameRef.current.value})
        }
        if (this.otchRef.current) {
            this.setState({otch: this.otchRef.current.value})
        }
        if (this.balRef.current) {
            this.setState({balance: this.balRef.current.value})
        }
    };

    cancelClicked = () => {
        clientEvents.emit('ECanselClicked');
    };

    saveClicked = () => {
        clientEvents.emit('ESaveClicked',
        this.props.clientInfo.id, this.state.fam, this.state.im, this.state.otch, parseFloat(this.state.balance));
    }
    render() {
        console.log("ClientFrame render");

        if (this.props.mode === 1) {
            return (
                <div className='client-frame' onChange={this.setNewInfo}>
                    <label className='client-frame__label'>Фамилия
                        <input type='text' defaultValue={this.state.fam} 
                        className='client-frame__info-string' ref={this.famRef}/>
                    </label>
                    <br/>
                    <label className='client-frame__label'>Имя
                        <input type='text' defaultValue={this.state.im}
                        className='client-frame__info-string' ref={this.nameRef}/>
                    </label>
                    <br/>
                    <label className='client-frame__label'>Отчество
                        <input type='text' defaultValue={this.state.otch}
                        className='client-frame__info-string' ref={this.otchRef}/>
                    </label>
                    <br/>
                    <label className='client-frame__label'>Баланс
                        <input type='naumber' defaultValue={this.state.balance}
                        className='client-frame__info-string' ref={this.balRef}/>
                    </label>
                    <br/>

                    <button className='client-frame__button' onClick={this.saveClicked}>Сохранить</button>
                    <button className='client-frame__button' onClick={this.cancelClicked}>Отмена</button>
                </div>
            );
        } else {

        }

    }
}

export default ClientFrame;