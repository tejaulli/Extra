import React from 'react'
import NumericInput from 'react-native-numeric-input';
import { View} from 'native-base';
export default function InputFiled() {
    return (
        <View>
            <NumericInput 
            // value={this.state.value} 
            onChange={value => console.log(value)} 
            type="plus-minus"
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            totalWidth={65} 
            totalHeight={25} 
            iconSize={25}
            step={1}
            valueType='real'
            rounded 
            textColor='black' 
            iconStyle={{ color: 'black' }} 
            rightButtonBackgroundColor='#f1f1f1' 
            leftButtonBackgroundColor='#f2f2f2'
           
           /> 
        </View>
    )
}
