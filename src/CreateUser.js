import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import libraFreeMarketIcon from './images/Libra-Freemarket-icon.png'

class CreateUser extends Component {
  
  constructor(props) {
    super(props);
      this.state = {
        loading: false,
        userAddress: ''
      };
    this.handleCreateWallet = this.handleCreateWallet.bind(this);
  }
  
  handleCreateWallet = async() => {
    this.setState({ loading: true })
    await this.props.createWallet()
    this.setState({ loading: false })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="icon-header">
              <img className="libraFreeMarketIcon" src={libraFreeMarketIcon} alt="libraFreeMarketIcon" />
            </div>
            <div className="create-user">
              { this.state.show ? 
                <p>loading ....</p> 
                : 
                <>
                  <h2 className="title-text">新規作成</h2>
                  <br/>
                  <p>Linraアカウントを発行する</p>
                  <form onSubmit={this.handleCreateWallet}>
                    <input className="btn btn-outline-primary" type="submit" value="作成する"/>
                  </form>
                </>    
              }
              { this.props.mnemonic !== ''  ? 
                <>
                  <br/>
                  <div className="localData">
                    <h2>作成したWallet</h2>
                    <p>MnemonicはLoginする際に必要になります。大切に保管しておいてください。<br/>
                      現在、Mnemonicはブラウザーに保存されているため、メモを撮り終えたらブラウザーから削除しましょう。
                    </p>
                    <p>Address</p> 
                    <p>{this.props.userAddress}</p>
                    <p>Mnemonic</p> 
                    <p className="mnemonic">{this.props.mnemonic}</p> 
                    <form onSubmit={this.props.resetLocalData}>
                      <input className="btn btn-outline-primary" type="submit" value="削除する"/>
                    </form>
                  </div>
                </> : <></> }
            </div>    
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
