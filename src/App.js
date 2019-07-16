import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CreateUser from './CreateUser.js'
//const axios = require('axios')

class App extends Component {
  componentWillMount() {
    this.loadWalletData()
  }
  
  async loadWalletData() {
    const localWalletData = await localStorage.getItem('localdata')
    console.log(localWalletData)
    if (localWalletData !== null ) {
      console.log(localWalletData)
      const decorateJson = await JSON.parse(localWalletData)
      this.setState({ 
        userAddress: decorateJson.address,
        mnemonic: decorateJson.mnemonic,
      })
      const walletBalance = await axios.post(`http://localhost:3005/getBalance`, { address: this.state.userAddress }) 
      this.setState({ balance: walletBalance.data.balance })
    } else {
      //this.createWallet()
    }
  }

  constructor(props) {
    super(props);
      this.state = {
        amount: '',
        toAddress: '',
        balance: '',
        userAddress: '',
        mnemonic: ''
      };
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeToAddress = this.handleChangeToAddress.bind(this);
    this.createWallet = this.createWallet.bind(this);
    this.transfer = this.transfer.bind(this);
    this.resetLocalData = this.resetLocalData.bind(this)
  }
  
  handleChangeToAddress(e) {
    this.setState({toAddress: e.target.value});
  }

  handleChangeAmount(e) {
    this.setState({amount: e.target.value});
  }
  
  createWallet = async() => {
    //await this.resetLocalData()
    console.log("creating wallet...")
    const createWallet = await axios.post(`http://localhost:3005/createWallet`)
    console.log(createWallet)
    const setJson = await JSON.stringify(createWallet.data)
    await localStorage.setItem('localdata', setJson)
    this.setState({ 
      userAddress: createWallet.data.address,
      balance: createWallet.data.balance,
      mnemonic: createWallet.data.mnemonic,
    })
    console.log(setJson)
  }

  resetLocalData = async() => {
    await localStorage.clear()
  }

  transfer = async(e) => {
    await axios.post(`http://localhost:3005/transfer`, { 
      fromAddress: this.state.userAddress,
      mnemonic: this.state.mnemonic,
      toAddress: this.state.toAddress,
      amount: this.state.amount 
    })
    await this.loadWalletData()
    // const method = "POST";
    // fetch(`http://localhost:3005/transfer`, {
    //   mode: 'no-cors',
    //   method,
    //   fromAddress: this.state.userAddress,
    //   mnemonic: this.state.mnemonic,
    //   toAddress: this.state.toAddress,
    //   amount: this.state.amount
    // })
    // .then((response) => {
    //   //return response.json();
    // })
    // .then((myJson) => {
    //   const transferJson = JSON.stringify(myJson) //JSON.prase()
    //   console.log(transferJson)
    // });
    // e.preventDefault();
  }

  render() {
    return (
      <>
        <Tab.Container defaultActiveKey="second">
          <Row className="body-container">
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Guidline</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">新規作成</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">ーー</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="forth">ーー</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth">ーー</Nav.Link>
                </Nav.Item> 
                { this.state.account === this.state.admin ?
                  <Nav.Item>
                    <Nav.Link eventKey="sixth">管理者用</Nav.Link>
                  </Nav.Item> 
                  : 
                  <></> 
                }
              </Nav>
            </Col>             
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <form onSubmit={this.createWallet}>
                      <p className="App-intro">
                        <input type="submit" value="作成"/>
                      </p>
                    </form>
                    <p>Address: {this.state.userAddress}</p>
                    <p>Balance: {this.state.balance}</p> 
                    <form onSubmit={this.transfer}>
                      <p className="App-intro">
                        <input type="text" onChange={this.handleChangeToAddress}/>
                        <input type="number" onChange={this.handleChangeAmount}/>
                        <input type="submit" value="送信"/>
                      </p>
                    </form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <CreateUser 
                      createWallet = {this.createWallet} 
                      mnemonic = {this.state.mnemonic}
                      userAddress = {this.state.userAddress}
                      resetLocalData = {this.resetLocalData} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">    
                    <Row>
                      <Col className="guide" sm={12}>
                      </Col>
                    </Row>   
                    <Row>
                      <Col sm={12}>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth"> 
                    <Row>
                      <Col className="guide" sm={12}>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fifth">
                    <Row>
                      <Col className="guide" sm={12}>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fifth">
                  </Tab.Pane>
                </Tab.Content>
              </Col>
          </Row>
        </Tab.Container>
      </>
    );
  }
}

export default App;
