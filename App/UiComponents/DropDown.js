import React, {  useEffect } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { Text} from 'react-native';

const DropdownComp =(props) => { 
    const [status, setStatus] = React.useState("");
  useEffect(() => {
    setStatus("")   
  }, [props.cleareValues])

  const handleChange = (event) => {
      debugger;
    console.log("DropdownValue***----",event)
    setStatus(event);
  };  

    return (
      <Text>
          <Dropdown
          style={{width:80}}
            label={props.label}
            data={props.data}
            value={status}
			baseColor="black"
            useNativeDriver={true}
            onChangeText={(value,index,data)=>{
                props.changed(value);
                handleChange(value);
              }}
            // onChange={(e) => {
            //     props.changed(e);
            //     handleChange(e);
            //   }}
          />
      </Text>
    );
 
}

export default DropdownComp