import React, {Component} from 'react'
import {Layout,Tag,Spin} from 'antd'
import {connect} from 'react-redux'
import {getData} from './store/actions'
import List from './components/list/List'
import './index.css'

const { Header, Footer, Content } = Layout;

class App extends Component{

    componentDidMount() {
        this.props.getData();
    }

    render(){
        const {mylist,recommendations,loading} = this.props.lists
        return(
            <Layout>
                <Header><img style={{height:'100%'}} src="https://www.edisonresearch.com/wp-content/uploads/2019/04/Netflix.png" alt=""/></Header>
                <Content>
                    <div className='exa' style={{ background: 'black', padding: '30px', height:'680px'}}>
                        {
                            loading?<Spin className='loading-icon' size='large'/>: (

                                <React.Fragment>
                                    <List title='My List' data={mylist} type='delete'/>
                                    <List title='Recommendations' data={recommendations} type='add'/>
                                </React.Fragment>
                            )
                        }

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

export default connect(mapStateToProps,{getData})(App)
