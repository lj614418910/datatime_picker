import React, { Component } from 'react';
import PickerItems from './PickerItems.js';

class Picker extends Component{
	constructor(props) {
		super(props);
		this._time = {
      "year" : this.props.value.getFullYear(),
			"month" : this.props.value.getMonth(),
			"date" : this.props.value.getDate()
    }
		this.getTime = (_year, _month, _date) => {
			this._time.year = _year;
			this._time.month = _month;
			this._time.date = _date;
			// 获取所选时间
		} 
	}
	render() {
		return (
			<div className="picker">
				<div className="picker-toolbar">
					<span 
						className="mint-datetime-action" 
						onClick={this.props.onCancel}>
						取消
					</span>
					<span className="mint-datetime-title">
						请选择日期
					</span>
					<span 
						className="mint-datetime-action"
						onClick={
							() => {
								console.log(this._time.year+","+this._time.month+","+this._time.date);
								this.props.onSelect(new Date(this._time.year,this._time.month,this._time.date))
							}
						}>
						确定
					</span>
				</div>
				<PickerItems {...this.props} getTime = {this.getTime}/>	
			</div>
		)
	}
}




export default Picker;