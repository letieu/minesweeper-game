import React from 'react';

class Square extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if (!this.props.cell.reveal){
            return (

                <div className='square open' onClick={this.props.onClick}>+</div>
            )
        }
        return (

        <div className={`square x${this.props.cell.num}`} >{this.props.cell.num}</div>
        )
    }
}

export default Square;