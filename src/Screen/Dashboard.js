import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import GlobleStyle from '../Constants/GlobleStyle';
import DateTimePicker from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import {connect} from 'react-redux';
import {addItems} from '../Reducer/DateReducer/date_actions';

const Dashboard = props => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dob, setDob] = useState(new Date());
  const [designation, setDesignation] = useState('');
  const [employment, setEmployment] = useState('');
  const [isopen, setisopen] = useState(false);

  const refFirstName = useRef();
  const refLastName = useRef();
  const refDesignation = useRef();
  const refEmployment = useRef();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDob(currentDate);
    setisopen(false);
  };

  useEffect(() => {
    console.log('props.items => ', props.items);
  }, [props.items]);

  const addItem = () => {
    let myObj = {
      id: uuid.v4(),
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      designation: designation,
      employment: employment,
    };

    if (firstname.length == 0) {
      ToastAndroid.show("First name can't be blank", ToastAndroid.LONG);
    } else if (lastname.length == 0) {
      ToastAndroid.show("Last name can't be blank", ToastAndroid.LONG);
    } else if (designation.length == 0) {
      ToastAndroid.show("Designation can't be blank", ToastAndroid.LONG);
    } else if (employment.length == 0) {
      ToastAndroid.show("Employment can't be blank", ToastAndroid.LONG);
    } else {
      props.addItems(myObj);
      ToastAndroid.show('Your Item Add Successfully.....', ToastAndroid.LONG);
      setFirstname('');
      setLastname('');
      setDob(new Date());
      setDesignation('');
      setEmployment('');
    }
  };

  return (
    <SafeAreaView style={GlobleStyle.DashboardParantView}>
      <ScrollView>
        <View style={GlobleStyle.DB_Header}>
          <Text style={GlobleStyle.DB_HeaderText}>Dashboard</Text>
        </View>
        <View style={GlobleStyle.DBtextField}>
          <TextInput
            style={GlobleStyle.DB_inputField}
            placeholder="First name"
            value={firstname}
            ref={refFirstName}
            placeholderTextColor={'gray'}
            returnKeyType="next"
            onSubmitEditing={() => {
              refLastName.current.focus();
            }}
            onChangeText={txt => {
              setFirstname(txt);
            }}
          />
        </View>

        <View style={GlobleStyle.DBtextField}>
          <TextInput
            style={GlobleStyle.DB_inputField}
            placeholder="Last name"
            value={lastname}
            placeholderTextColor={'gray'}
            ref={refLastName}
            returnKeyType="next"
            onSubmitEditing={() => {
              refDesignation.current.focus();
            }}
            onChangeText={txt => {
              setLastname(txt);
            }}
          />
        </View>

        <Text
          style={[GlobleStyle.DB_DOB]}
          onPress={() => {
            setisopen(true);
          }}>
          Select Dob:
          {dob.toLocaleDateString()}
        </Text>
        {isopen && (
          <DateTimePicker
            value={dob}
            testID="dateTimePicker"
            mode="date"
            dateFormat="day month year"
            onTouchCancel={() => {
              setisopen(false);
            }}
            onChange={onChangeDate}
            is24Hour={false}></DateTimePicker>
        )}

        <View style={GlobleStyle.DBtextField}>
          <TextInput
            style={GlobleStyle.DB_inputField}
            placeholder="Designation"
            value={designation}
            ref={refDesignation}
            placeholderTextColor={'gray'}
            returnKeyType="next"
            onSubmitEditing={() => {
              refEmployment.current.focus();
            }}
            onChangeText={txt => {
              setDesignation(txt);
            }}
          />
        </View>

        <View style={GlobleStyle.DBtextField}>
          <TextInput
            style={GlobleStyle.DB_inputField}
            placeholder="Employment"
            value={employment}
            placeholderTextColor={'gray'}
            ref={refEmployment}
            returnKeyType="done"
            onChangeText={txt => {
              setEmployment(txt);
            }}
          />
        </View>

        <View style={GlobleStyle.DB_btn_parent}>
          <TouchableOpacity
            style={GlobleStyle.DB_add_item}
            onPress={() => {
              addItem();
            }}>
            <Text style={GlobleStyle.DB_btn_txt_style}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={GlobleStyle.DB_go_list}
            onPress={() => {
              props.navigation.navigate('ListScreen');
            }}>
            <Text style={GlobleStyle.DB_btn_txt_style}>Go List Screen</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => ({
  items: state.dateDetails.items,
});

const mapDispatchToProps = {
  addItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
