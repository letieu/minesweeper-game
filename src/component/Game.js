
import React from 'react';
import Square from './Square';
class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board :createBoard(),
            lose:false
        }
        this.test = this.test.bind(this)
    }
    test(item){
        if (item.num == 0){
            this.revealNear(item)
        }
        item.reveal = true;
        if (item.num == -1){
            console.log('thua roi')
            this.setState({lose:true})
        }
        
        this.setState(state=>({
            board : [...state.board]
        }))
        if (this.checkWin()){
            alert('You win')
        }

    }
    checkWin(){
        for (let i=0;i < this.state.board.length;i++){
            for (let j=0;j<this.state.board.length;j++){
                if (this.state.board[i][j].reveal === false && this.state.board[i][j].num != -1 ){
                    return false
                }
            }
        }
        return true;
    }
    revealNear(item){
        if (item.num != 0){
            item.reveal = true;
            return
        }
        if (item.reveal){
            return
        }
        item.reveal = true;
        console.log(item)
        let near = [-1,0,1]
        for (let x of near){
            for (let y of near){
                let nx = item.x + x;
                let ny = item.y + y;
                if ( nx <0 || nx>9){
                    continue;
                }
                if (ny <0 || ny>9){
                    continue;
                }
                if (ny === y && nx === x){
                    continue;
                }
                this.revealNear(this.state.board[nx][ny])
            }
           
        }
    }
    render(){
        if (this.state.lose){
            for (let row of this.state.board){
                for (let item of row){
                    item.reveal = true
                }
            }

        }
        return (
            <div className='game'>
                {this.state.board.map(row=>row.map(
                    item=>(
                        <Square cell={item} onClick={()=>this.test(item)} key={ item.x.toString() + item.y.toString()}/>
                    )
                ))}

            </div>
        )
    }
}


function createBoard(){
    let board=[];
    for (let i=0;i<10;i++){
        let row = [];
        for (let j=0;j<10;j++){
            row.push({
                reveal:false,
                num:0,
                x:i,
                y:j
            })
        }
        board.push(row)

    }

    setMine(board);

    setNum(board);
    return board;
}

function setMine(board){
    for (let row of board){
        for (let cell of row){
            if (Math.floor(Math.random()*6)=== 0){
                cell.num = -1 
                // -1 is a  mine
            }
        }
    }
}
function setNum(board){
    for (let i=0;i<10 ;i++){
        for (let j=0;j<10;j++){
            if (board[i][j].num !== -1 ){
                board[i][j].num = getNum(board,i,j)
            }
        }
    }
    console.log(board)

}
function getNum(board,x,y){
    let num = 0;
    let near = [-1,0,1];
    for( let i of near){
        for (let j of near){
            let nx = x+i;
            let ny = y+j;
            if ( nx <0 || nx>9){
                continue;
            }
            if (ny <0 || ny>9){
                continue;
            }
            if (ny === y && nx === x){
                continue;
            }
            if (board[nx][ny].num == -1){
                num ++;
            }
        }
    }
    return num;
}
export default Game;