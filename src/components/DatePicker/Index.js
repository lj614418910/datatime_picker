import React, { PropTypes, Component } from 'react';
import Picker from './Picker.js';
import './style/index.scss';


let ModalDatePicker = (props) => {
    if (props.isPopup) {
        // 判断是否需要涂层
        return  (
            <div 
                style={{ overflow:'hidden', width:props.isOpen ? '100%' : '0' }}
                className="picker-wrapper">
                <div className="modal"></div>
                <Picker {...props}/>
            </div>)
    }
    return (
       <div 
            style={{ overflow:'hidden', width:props.isOpen ? '100%' : '0'}} 
            className="picker-wrapper-no-modal">
            <Picker {...props}/>
       </div>
    )
    
}


ModalDatePicker.propTypes = {
    // 定义变量的属性
    isPopup: PropTypes.bool,
    isOpen: PropTypes.bool,
    value: PropTypes.object,
    min: PropTypes.object,
    max: PropTypes.object,
    dateFormat: PropTypes.array,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
};


ModalDatePicker.defaultProps = {
    // 定义默认变量
    isPopup: true,
    isOpen: false,
    value: new Date(),
    min: new Date(1970, 0, 1),
    max: new Date(2050, 0, 1),
    dateFormat: ['YYYY', 'M', 'D'],
    onSelect: () => {},
    onCancel: () => {},
};



export default ModalDatePicker;
