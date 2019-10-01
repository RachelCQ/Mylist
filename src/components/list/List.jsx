import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clickList,clickRecom} from '../../store/actions'
import {Button, Card} from "antd";

class List extends Component {
    handleHover = (index) =>{
        const {listWrapper} = this.refs
        let btns = listWrapper.querySelectorAll('.btn')
        for (let i=0;i<btns.length;i++){
            btns[i].style.display = 'none'
        }
        btns[index].style.display = 'block'
    };

    handleLeave = () =>{
        const {listWrapper} = this.refs
        let listBtns = listWrapper.querySelectorAll('.btn')
        for (let i=0;i<listBtns.length;i++){
            listBtns[i].style.display = 'none'
        }
    };

    handleClickList = (id) =>{
        const {mylist} = this.props.lists
        let theMovie = mylist.filter((movie)=>{
            return movie.id === id
        })
        let newData = mylist.filter((movie)=>{
            return movie.id !== id
        })
        this.props.clickList(newData,theMovie)
    };

    handleClickRecom = (id) =>{
        const {recommendations} = this.props.lists
        let theMovie = recommendations.filter((movie)=>{
            return movie.id === id
        })
        let newData = recommendations.filter((movie)=>{
            return movie.id !== id
        })
        this.props.clickRecom(newData,theMovie)
    };

    render() {
        const {title,data,type} = this.props
        return (
            <Card title={title} bordered={false} style={{ width: '100%' ,marginBottom:10,minHeight:300,backgroundColor:'black'}}>
                <div ref='listWrapper' className='wrapper'>
                    {
                        data.map((item,index)=>(
                            <span key={item.id} onMouseOver={()=>this.handleHover(index)} onMouseLeave={this.handleLeave}>
                                    <img src={item.img} title={item.title} alt=""/>
                                    <div className='btn' style={{display:'none'}}>
                                        {type==='delete'?<Button onClick={()=>this.handleClickList(item.id)} type='danger'>Delete</Button>:
                                            <Button onClick={()=>this.handleClickRecom(item.id)} type='primary'>Add</Button>}
                                    </div>
                                </span>
                        ))
                    }
                </div>

            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {lists:state}
}
export default connect(mapStateToProps,{clickList,clickRecom})(List)
