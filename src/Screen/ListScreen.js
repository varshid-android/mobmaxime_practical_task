import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import GlobleStyle from '../Constants/GlobleStyle';
import {connect} from 'react-redux';

const ListScreen = props => {
  const [Search, setSearch] = useState('');
  const [SearchArray, setSearchArray] = useState([]);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = props.items.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemDataFirstname = item.firstname
          ? item.firstname.toUpperCase()
          : ''.toUpperCase();
        const itemDataLastname = item.lastname
          ? item.lastname.toUpperCase()
          : ''.toUpperCase();
        const itemDataDesignation = item.designation
          ? item.designation.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return (
          itemDataFirstname.indexOf(textData) > -1 ||
          itemDataLastname.indexOf(textData) > -1 ||
          itemDataDesignation.indexOf(textData) > -1
        );
      });
      setSearchArray(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setSearchArray([]);
      setSearch(text);
    }
  };

  const renderItem = ({item}) => (
    <View style={GlobleStyle.FlatListParentView}>
      <View style={GlobleStyle.FlatlistInnerView}>
        <Text style={GlobleStyle.FlatlistTxt}>id: {item.id}</Text>
        <Text style={GlobleStyle.FlatlistTxt}>Firstname: {item.firstname}</Text>
        <Text style={GlobleStyle.FlatlistTxt}>Lastname: {item.lastname}</Text>
        <Text style={GlobleStyle.FlatlistTxt}>
          DOB: {new Date(item.dob).toLocaleDateString()}
        </Text>
        <Text style={GlobleStyle.FlatlistTxt}>
          Designation: {item.designation}
        </Text>
        <Text style={GlobleStyle.FlatlistTxt}>
          Employment: {item.employment}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={GlobleStyle.DashboardParantView}>
      <View style={GlobleStyle.DB_Header}>
        <Text style={GlobleStyle.DB_HeaderText}>Listing Screen</Text>
      </View>

      {props.items.length > 1 ? (
        <View style={GlobleStyle.SearchParantView}>
          <Image
            style={GlobleStyle.Search_img}
            source={require('../assets/search.png')}
          />
          <TextInput
            placeholder="Search..."
            style={GlobleStyle.Search_txt}
            value={Search}
            placeholderTextColor={'gray'}
            onChangeText={txt => {
              searchFilterFunction(txt);
            }}></TextInput>
        </View>
      ) : (
        <Text style={GlobleStyle.errMsgStyle}>
          Please add more then one items for search functionality
        </Text>
      )}

      {props.items.length == 0 ? (
        <Text style={GlobleStyle.errMsgStyle}>
          You have no any item, Please add itms first
        </Text>
      ) : (
        <FlatList
          data={Search.length == 0 ? props.items : SearchArray}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};
const mapStateToProps = state => ({
  items: state.dateDetails.items,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
