import React from 'react';

import './br2.css';

class Br2 extends React.Component {
    state = {
        text: this.props.text
                .split(/<\s*?br\s*?.*?>/)
                .reduce( (newArr, currentValue, index, arr) => {
                    newArr.push(currentValue);
                    if (index !== arr.length - 1) {
                        newArr.push(<br key={index}/>);
                    }
                    return newArr;
                }, [])
    };

    render() {
        // let resultArr = [];
        // this.state.text.forEach( (elem, i, arr) => {
        //     resultArr.push(elem);
        //     if (i !== arr.length -1) {
        //         resultArr.push(<br key={i}/>); //key- чтобы не ругался
        //     }
        // });

        // let resultArr =  this.state.text.map( (item,index, arr) => {
        //     if (index !== arr.length - 1) {
        //         return(<> {item} <br/></>)
        //     } else {
        //         return item
        //     }
        // })

        //console.log(resultArr);
        return (
            <div className='central-block'>
                {this.state.text}
            </div>
        )
    }
}

export default Br2;