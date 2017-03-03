import React,{Component} from 'react';
import DatePicker from './components/DatePicker/Index.js';

class App extends Component{
	constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            isOpen: false,
        }
        this.handleClick = () => {
            // 点击打开
            this.setState({ isOpen: true });
        }
     
        this.handleCancel = () => {
            // 取消
            this.setState({ isOpen: false });
        }
     
        this.handleSelect = (time) => {
            // 确定
            this.setState({time, isOpen: false });
        }
    }
    render (){
        return (
            <div className="App">
                <a
                    className="select-btn"
                    onClick={this.handleClick}>
                    {`${this.state.time.getFullYear()}-${this.state.time.getMonth()+1}-${this.state.time.getDate()}`}
                </a>
                <DatePicker 
                	isPopup={true}
                	value={this.state.time}
                    isOpen={this.state.isOpen}
                    min={new Date(2007,0,1)}
                    max={new Date(2017,12,31)}
                    onSelect={this.handleSelect}
                    onCancel={this.handleCancel}
                />
            </div>
        );  

    }
}





export default App;
