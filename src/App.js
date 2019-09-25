import React, {Component} from 'react'
import {Card,Button,Layout} from 'antd'
import './index.css'

const { Header, Footer, Content } = Layout;

const data = {
    'mylist' : [

        {

            'title': 'Futurama',

            'id': 1,

            'img': 'http://cdn1.nflximg.net/webp/7621/3787621.webp'

        },

        {

            'title': 'The Interview',

            'id': 2,

            'img': 'http://cdn1.nflximg.net/webp/1381/11971381.webp'

        },

        {

            'title': 'Gilmore Girls',

            'id': 3,

            'img': 'http://cdn1.nflximg.net/webp/7451/11317451.webp'

        }

    ],
    'recommendations' : [

        {

            'title': 'Family Guy',

            'id': 4,

            'img': 'http://cdn5.nflximg.net/webp/5815/2515815.webp'

        },

        {

            'title': 'The Croods',

            'id': 5,

            'img': 'http://cdn3.nflximg.net/webp/2353/3862353.webp'

        },

        {

            'title': 'Friends',

            'id': 6,

            'img': 'http://cdn0.nflximg.net/webp/3200/9163200.webp'

        }

    ]
};
const {mylist,recommendations} = data

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            mylist,
            recommendations
        }

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
        const {mylist,recommendations} = this.state
        let theMovie = mylist.filter((movie)=>{
            return movie.id === id
        })
        let newData = mylist.filter((movie)=>{
                return movie.id !== id
            })
        this.setState({
            mylist: newData,
            recommendations:[...recommendations,...theMovie]
        })
    }
    handleClickRecom = (id) =>{
        const {mylist,recommendations} = this.state
        let theMovie = recommendations.filter((movie)=>{
            return movie.id === id
        })
        let newData = recommendations.filter((movie)=>{
            return movie.id !== id
        })
        this.setState({
            mylist: [...mylist,...theMovie],
            recommendations:newData
        })
    }
    render(){

        const {mylist,recommendations} = this.state
        return(
            <Layout>
                <Header><img style={{height:'100%'}} src="https://www.edisonresearch.com/wp-content/uploads/2019/04/Netflix.png" alt=""/></Header>
                <Content>
                    <div style={{ background: '#ECECEC', padding: '30px' }}>
                        <Card title="My List" bordered={false} style={{ width: '100%' }}>
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
                        <hr/>
                        <Card title="Recommendations" bordered={false} style={{ width: '100%' }}>
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

            </Layout>

        )
    }
}
