import React, {Component} from 'react'
import {Card,Button,Layout,Tag} from 'antd'
import {connect} from 'react-redux'
import './index.css'
import {clickList,clickRecom} from './store/actions'
const { Header, Footer, Content } = Layout;

class App extends Component{
    constructor(props){
        super(props)
    }
    handleHoverList = (index) =>{
        const {listWrapper} = this.refs
        let btns = listWrapper.querySelectorAll('.btn')
        for (let i=0;i<btns.length;i++){
            btns[i].style.display = 'none'
        }
        btns[index].style.display = 'block'
    }
    handleHoverRecom = (index) => {
        const {recomWrapper} = this.refs
        let btns = recomWrapper.querySelectorAll('.btn')
        for (let i=0;i<btns.length;i++){
            btns[i].style.display = 'none'
        }
        btns[index].style.display = 'block'
    }
    handleLeave = () =>{
        const {recomWrapper,listWrapper} = this.refs
        let listBtns = recomWrapper.querySelectorAll('.btn')
        let recomBtns = listWrapper.querySelectorAll('.btn')
        for (let i=0;i<listBtns.length;i++){
            listBtns[i].style.display = 'none'
        }
        for (let i=0;i<recomBtns.length;i++){
            recomBtns[i].style.display = 'none'
        }
    }

    handleClickList = (id) =>{
        const {mylist} = this.props.lists
        let theMovie = mylist.filter((movie)=>{
            return movie.id === id
        })
        let newData = mylist.filter((movie)=>{
                return movie.id !== id
            })
        this.props.clickList(newData,theMovie)
    }
    handleClickRecom = (id) =>{
        const {recommendations} = this.props.lists
        let theMovie = recommendations.filter((movie)=>{
            return movie.id === id
        })
        let newData = recommendations.filter((movie)=>{
            return movie.id !== id
        })
        this.props.clickRecom(newData,theMovie)

    }
    render(){
        const {mylist,recommendations} = this.props.lists
        return(
            <Layout>
                <Header><img style={{height:'100%'}} src="https://www.edisonresearch.com/wp-content/uploads/2019/04/Netflix.png" alt=""/></Header>
                <Content>
                    <div style={{ background: 'black', padding: '30px' }}>
                        <Card title="My List" bordered={false} style={{ width: '100%' ,marginBottom:10,minHeight:300,backgroundColor:'black'}}>
                            <div ref='listWrapper' className='wrapper'>
                                {
                                    mylist.map((item,index)=>(
                                        <span key={item.id} onMouseOver={()=>this.handleHoverList(index)} onMouseLeave={this.handleLeave}>
                                    <img src={item.img} title={item.title} alt=""/>
                                    <div className='btn' style={{display:'none'}}>
                                        <Button onClick={()=>this.handleClickList(item.id)} type='danger'>Delete</Button>
                                    </div>

                                </span>
                                    ))
                                }
                            </div>

                        </Card>
                        {/*<hr/>*/}
                        <Card title="Recommendations" bordered={false} style={{ width: '100%' ,minHeight:300,backgroundColor:'black'}}>
                            <div ref='recomWrapper' className='wrapper'>
                                {
                                    recommendations.map((item,index)=>(
                                        <span key={item.id} onMouseOver={()=>this.handleHoverRecom(index)} onMouseLeave={this.handleLeave}>
                                            <img src={item.img} title={item.title} alt=""/>
                                            <div className='btn' style={{display:'none'}}>
                                            <Button onClick={()=>this.handleClickRecom(item.id)} type='primary'>Add</Button>
                                            </div>

                                        </span>
                                    ))
                                }
                            </div>
                        </Card>
                    </div>
                </Content>
                <Footer style={{ background: 'gray'}}>
                    <h3>My list titles</h3>
                    {
                        mylist.map((item)=> (
                            <Tag color="magenta">{item.title}</Tag>
                        ))
                    }
                </Footer>

            </Layout>

        )
    }
}


const mapStateToProps = (state) => {
    return {lists:state}
}

export default connect(mapStateToProps,{clickList,clickRecom})(App)
