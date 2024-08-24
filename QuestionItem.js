import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const QuestionItem = ({ data, selectedOption }) => {
  return (
    <View style={{ width: width, padding: 20 }}>
      <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        letterSpacing: 1,
      }}>
        {'Q: ' + data.question}
      </Text>
      <FlatList
        data={data.Options}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                backgroundColor: data.marked == index + 1 ? '#6A1B9A' : '#fff',
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 12,
                alignItems: 'center',
                paddingLeft: 15,
                flexDirection: 'row',
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                borderWidth: data.marked == index + 1 ? 2 : 0,
                borderColor: '#6A1B9A',
              }}
              onPress={() => selectedOption(index + 1)}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: data.marked == index + 1 ? '#fff' : '#80DEEA',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: data.marked == index + 1 ? '#6A1B9A' : '#80DEEA',
                }}
              >
                <Text style={{ fontWeight: 'bold', color: '#333' }}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  marginLeft: 20,
                  color: data.marked == index + 1 ? '#fff' : '#333',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </View>
  );
};

export default QuestionItem;