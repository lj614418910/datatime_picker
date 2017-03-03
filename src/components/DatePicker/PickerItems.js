import React, { Component } from 'react';
import BScroll from 'better-scroll';




class PickerItems extends Component{
	constructor(props) {
		super(props);
		this.state = {
            "year" : this.props.value.getFullYear(),
			"month" : this.props.value.getMonth(),
			"date" : this.props.value.getDate()
        }

		this._getFullYears = () => {
			let Years = [];
			let minYear = this.props.min.getFullYear();
			let maxYear = this.props.max.getFullYear();
			for(let i = minYear; i<= maxYear ;i++){
				Years.push(i)
			}
			return Years;
		}
		this.isLeapYear = (year) => {
			// 计算闰年
	    	return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
	    }
	    this._getMonths = () => {
	    	// 获取月份
	    	return [1,2,3,4,5,6,7,8,9,10,11,12]
	    }
	    this.isShortMonth = (month) => {
	    	// 31天的月份计算
	    	return [4, 6, 9, 11].indexOf(month) > -1;
	    }
	    this.getMonthEndDate = (year, month) => {
	    	// 计算各月日期
	        if (this.isShortMonth(month)) {
	          return 30;
	        } else if (month === 2) {
	          return this.isLeapYear(year) ? 29 : 28;
	        } else {
	          return 31;
	        }
	    }
	    this._getDates = (year, month) => {
	    	// 获取各月日期
	    	let Dates = []; 
	    	for (let i = 1 ; i <= this.getMonthEndDate(year, month); i++) {
	    		Dates.push(i);
	    	}
	    	return Dates;
	    }
	}
	componentDidMount() {
	    this.YearScroll = new BScroll(this.refs.yearSlot,{
	    	// 给年份绑定滑动事件
			startX: 0,
			startY: 0,
			bounceTime:100,
			momentumLimitTime: 100,
			deceleration: 0.003
		});
		this.MonthScroll = new BScroll(this.refs.MonthSlot,{
			// 给月份绑定滑动事件
		  startX: 0,
		  startY: 0,
		  bounceTime:100,
		  momentumLimitTime: 100,
		  deceleration: 0.003
		});
		this.DateScroll = new BScroll(this.refs.DateSlot,{
			// 给日期绑定滑动事件
		  startX: 0,
		  startY: 0,
		  bounceTime:100,
		  momentumLimitTime: 100,
		  deceleration: 0.003
		});
		this.scrollEndFun = (type, arr, obj) => {
			// 滑动结束后执行
			let itemNum = arr.length + 4;
			let itemHeight = obj.scrollerHeight/itemNum;
			let index = itemNum - Math.round((obj.scrollerHeight + obj.y)/itemHeight)
			let stopPlace = - (index  * itemHeight);
			if(type === "year"){
				this.setState({year:arr[index]});
			}else if(type === "month"){
				this.setState({month:arr[index]-1});
			}else if(type === "date"){
				this.setState({date:arr[index]});
			}
			this.props.getTime(this.state.year,this.state.month,this.state.date);
			obj.refresh();
			obj.scrollTo(0, stopPlace,600);
		};
		this.scrollInit = (time, obj, arr) => {
			// 初始化时间显示
			let index = arr.indexOf(time);
			let itemNum = arr.length + 4;
			let itemHeight = obj.scrollerHeight/itemNum;
			let initStopPlace = -(itemHeight * index);
			obj.scrollTo(0, initStopPlace);
			obj.refresh();
		}
		this.init = () => {
			this.scrollInit(this.props.value.getFullYear(), this.YearScroll, this._getFullYears());
			this.scrollInit(this.props.value.getMonth() + 1, this.MonthScroll, this._getMonths());
			this.scrollInit(this.props.value.getDate(), this.DateScroll, this._getDates(this.state.year,this.state.month+1));
		} 
		this.init();
		this.YearScroll.on("scrollEnd", () => (this.scrollEndFun("year",this._getFullYears(),this.YearScroll)));
		this.MonthScroll.on("scrollEnd", () => (this.scrollEndFun("month",this._getMonths(),this.MonthScroll)));
		this.DateScroll.on("scrollEnd", () => (this.scrollEndFun("date",this._getDates(this.state.year,this.state.month+1), this.DateScroll)));
		
	}
	
	render() {
		return (
			<div className="picker-items">
				<div className="picker-slot" ref="yearSlot"> 
					<div className="picker-slot-wrapper" >
						<div className="picker-item"></div>
						<div className="picker-item"></div>
						{
							this._getFullYears().map((item,i) => {
								return 	(
									<div 
										key={10000 + i} 
										className="picker-item"
										>
										{`${item}`} 年
									</div>
								)						
							})
						}
						<div className="picker-item"></div>
						<div className="picker-item"></div>
					</div>
				</div>
				<div className="picker-slot" ref="MonthSlot">
					<div className="picker-slot-wrapper" >
						<div className="picker-item"></div>
						<div className="picker-item"></div>
						{
							this._getMonths().map((item, i) => {
								return 	(
									<div 
										key={1000 + i} 
										className="picker-item"
										>
										{`${item}`} 月
									</div>
								)						
							})
						}
						<div className="picker-item"></div>
						<div className="picker-item"></div>
					</div>
				</div>
				<div className="picker-slot" ref="DateSlot">
					<div className="picker-slot-wrapper" >
						<div className="picker-item"></div>
						<div className="picker-item"></div>
						{
							this._getDates(this.state.year,this.state.month+1).map((item,i) => {
								return 	(
									<div 
										key={100 + i} 
										className="picker-item"
										>
										{`${item}`} 日
									</div>
								)						
							})
						}
						<div className="picker-item"></div>
						<div className="picker-item"></div>
					</div>
				</div>
				<div className="picker-center-highlight"></div>
			</div>
		)
	}
}




export default PickerItems;