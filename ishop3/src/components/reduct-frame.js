import React from 'react';
import PropTypes from 'prop-types';

import './reduct-frame.css';

class ReductFrame extends React.Component {
    static propTypes = {
        productInfo: PropTypes.arrayOf(
            PropTypes.shape({
                bookName: PropTypes.string.isRequired,
                bookAuthor: PropTypes.string.isRequired,
                bookPrice: PropTypes.number.isRequired,
                bookURL: PropTypes.string.isRequired,
                howMuchLeft: PropTypes.number.isRequired,
                code: PropTypes.number.isRequired,
            })
        ),
        mode: PropTypes.number.isRequired
    };

    state = {
        name: this.props.productInfo[0].bookName,
        author: this.props.productInfo[0].bookAuthor,
        price: this.props.productInfo[0].bookPrice,
        url: this.props.productInfo[0].bookURL,
        howMuchLeft: this.props.productInfo[0].howMuchLeft,
        nameErrorTextValue: '',
        authorErrorTextValue: '',
        priceErrorTextValue: '',
        urlErrorTextValue: '',
        howMuchLeftErrorTextValue: '',
    };

    checkValidity = (EO) => {
        if (EO.target.name === 'name') {
            this.setState({name: EO.target.value});
            if (EO.target.validity.valid) {
                this.setState({nameErrorTextValue: ''});
            } else {
                if(EO.target.validity.valueMissing) {
                    // Если поле пустое,
                    // отображаем следующее сообщение об ошибке
                    this.setState({nameErrorTextValue: 'Please, fill the field'});
                } else if (EO.target.validity.typeMismatch) {
                    // Если поле содержит не подходящие по типу символы,
                    // отображаем следующее сообщение об ошибке
                    this.setState({nameErrorTextValue: 'Value must be a string'});
                } else if (EO.target.validity.tooShort) {
                    // Если содержимое слишком короткое,
                    // отображаем следующее сообщение об ошибке
                    this.setState({nameErrorTextValue: 'Value is too short, the min length should be 2'});
                }
            }
        }
        if (EO.target.name === 'author') {
            this.setState({author: EO.target.value});
            if (EO.target.validity.valid) {
                this.setState({authorErrorTextValue: ''});
            } else {
                if(EO.target.validity.valueMissing) {
                    this.setState({authorErrorTextValue: 'Please, fill the field'});
                } else if (EO.target.validity.typeMismatch) {
                    this.setState({authorErrorTextValue: 'Value must be a string'});
                } else if (EO.target.validity.tooShort) {
                    this.setState({authorErrorTextValue: 'Value is too short, the min length should be 3'});
                }
            }
        }
        if (EO.target.name === 'price') {
            this.setState({price: EO.target.value});
            if (EO.target.validity.valid) {
                this.setState({priceErrorTextValue: ''});
            } else {
                if(EO.target.validity.valueMissing) {
                    this.setState({priceErrorTextValue: 'Please, fill the field'});
                } else if (EO.target.validity.typeMismatch) {
                    this.setState({priceErrorTextValue: 'Value must be a number'});
                } else if (EO.target.validity.rangeUnderflow) {
                    this.setState({priceErrorTextValue: 'Value is too small, price should be atleast 5 BYN'});
                }
            }
        }
        if (EO.target.name === 'url') {
            this.setState({url: EO.target.value});
            if (EO.target.validity.valid) {
                this.setState({urlErrorTextValue: ''});
            } else {
                if(EO.target.validity.valueMissing) {
                    this.setState({urlErrorTextValue: 'Please, fill the field'});
                } else if (EO.target.validity.typeMismatch) {
                    this.setState({urlErrorTextValue: 'Value must be a string'});
                } else if (EO.target.validity.tooShort) {
                    this.setState({urlErrorTextValue: 'Value is too short, the min length should be 5'});
                }
            }
        }
        if (EO.target.name === 'howMuchLeft') {
            this.setState({howMuchLeft: EO.target.value});
            if (EO.target.validity.valid) {
                this.setState({howMuchLeftErrorTextValue: ''});
            } else {
                if(EO.target.validity.valueMissing) {
                    this.setState({howMuchLeftErrorTextValue: 'Please, fill the field'});
                } else if (EO.target.validity.typeMismatch) {
                    this.setState({howMuchLeftErrorTextValue: 'Value must be a string'});
                } else if (EO.target.validity.rangeUnderflow) {
                    this.setState({howMuchLeftErrorTextValue: 'Value couldn\'t be smaller 0'});
                }
            }
        }
    }

    render() {
        if (this.props.mode === 1) {
            return (
                <div className='reduct-frame'>
                    <h2 className='reduct-frame__name'>Edit existing product</h2>
                    <p>ID: {this.props.productInfo[0].code}</p>
                    <label className='reduct-frame__label'>Название книги
                        <input type='text' name='name' value={this.state.name} className='reduct-frame__input' minLength='2' required onChange={this.checkValidity}/>
                    </label>
                    <span className="reduct-frame__error">{this.state.nameErrorTextValue}</span>
                    <br/>
                    <label className='reduct-frame__label'>Автор
                        <input type='text' name='author' value={this.state.author} className='reduct-frame__input' minLength='3' required onChange={this.checkValidity}/>
                    </label>
                    <span className="reduct-frame__error">{this.state.authorErrorTextValue}</span>
                    <br/>
                    <label className='reduct-frame__label'>Цена
                        <input type='number' name='price' value={this.state.price} className='reduct-frame__input' required min='5' onChange={this.checkValidity}/>
                    </label>
                    <span className="reduct-frame__error">{this.state.priceErrorTextValue}</span>
                    <br/>
                    <label className='reduct-frame__label'>URL
                        <input type='text' name='url' value={this.state.url} className='reduct-frame__input' required minLength='5' onChange={this.checkValidity}/>
                    </label>
                    <span className="reduct-frame__error">{this.state.urlErrorTextValue}</span>
                    <br/>
                    <label className='reduct-frame__label'>Осталось на складе
                        <input type='number' name='howMuchLeft' value={this.state.howMuchLeft} className='reduct-frame__input' required min='0' onChange={this.checkValidity}/>
                    </label>
                    <span className="reduct-frame__error">{this.state.howMuchLeftErrorTextValue}</span>
                    <br/>
                    <input type='button' value='Save' className='reduct-frame__button' disabled={false}/>
                    <input type='button' value='Cancel' className='reduct-frame__button'/>
                </div>
            );
        }
    }
}

export default ReductFrame;