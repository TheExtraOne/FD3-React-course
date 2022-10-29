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

    checkValue = (EO) => {
        if (EO.target.className !== 'reduct-frame__input') {
            return;
        }
        console.log('ok');
    };

    render() {
        if (this.props.mode === 1) {
            return (
                <div className='reduct-frame' onChange={this.checkValue}>
                    <h2 className='reduct-frame__name'>Edit existing product</h2>
                    <p>ID: {this.props.productInfo[0].code}</p>
                    <label className='reduct-frame__label'>Название книги
                        <input type='text' value={this.props.productInfo[0].bookName} className='reduct-frame__input'/>
                    </label>
                    <br/>
                    <label className='reduct-frame__label'>Автор
                        <input type='text' value={this.props.productInfo[0].bookAuthor} className='reduct-frame__input'/>
                    </label>
                    <br/>
                    <label className='reduct-frame__label'>Цена
                        <input type='text' value={this.props.productInfo[0].bookPrice} className='reduct-frame__input'/>
                    </label>
                    <br/>
                    <label className='reduct-frame__label'>URL
                        <input type='text' value={this.props.productInfo[0].bookURL} className='reduct-frame__input'/>
                    </label>
                    <br/>
                    <label className='reduct-frame__label'>Осталось на складе
                        <input type='text' value={this.props.productInfo[0].howMuchLeft} className='reduct-frame__input'/>
                    </label>
                    <br/>
                    <input type='button' value='Save' className='reduct-frame__button' disabled={false}/>
                    <input type='button' value='Cancel' className='reduct-frame__button'/>
                </div>
            );
        }
    }
}

export default ReductFrame;