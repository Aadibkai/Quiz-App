import { View, Text, FlatList, TouchableOpacity, Dimensions, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useState } from 'react';
import QuestionItem from './QuestionItem';
import { englishData } from './src/EnglishQuestions';

const { height, width } = Dimensions.get('window');

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState(englishData);
  const listRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const OnSelectOption = (index, x) => {
    const tempData = questions.map((item, ind) => {
      if (index === ind) {
        return { ...item, marked: item.marked === x ? -1 : x };
      }
      return item;
    });
    setQuestions(tempData);
  };

  const getTextScore = () => {
    return questions.reduce((total, item) => {
      return total + (item.marked !== -1 ? 5 : 0);
    }, 0);
  };

  const reset = () => {
    const tempData = questions.map(item => ({ ...item, marked: -1 }));
    setQuestions(tempData);
    listRef.current.scrollToIndex({ animated: true, index: 0 });
    setCurrentIndex(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          English Questions: {currentIndex}/{englishData.length}
        </Text>
        <TouchableOpacity onPress={reset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentIndex(Math.ceil(x));
          }}
          data={questions}
          renderItem={({ item, index }) => (
            <QuestionItem
              data={item}
              selectedOption={x => OnSelectOption(index, x)}
            />
          )}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, 
            {
              backgroundColor: hoveredButton === 'prev' ? '#5A4D8C' : (currentIndex > 1 ? '#6A5ACD' : '#A9A9A9')
            }]}
          onPressIn={() => setHoveredButton('prev')}
          onPressOut={() => setHoveredButton(null)}
          onPress={() => {
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: currentIndex - 2,
              });
            }
          }}>
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        {currentIndex === englishData.length ? (
          <TouchableOpacity
            style={[styles.navButton, 
              {
                backgroundColor: hoveredButton === 'submit' ? '#28A745' : '#32CD32'
              }]}
            onPressIn={() => setHoveredButton('submit')}
            onPressOut={() => setHoveredButton(null)}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.navButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, 
              {
                backgroundColor: hoveredButton === 'next' ? '#5A4D8C' : (questions[currentIndex - 1].marked !== -1 ? '#6A5ACD' : '#A9A9A9')
              }]}
            onPressIn={() => setHoveredButton('next')}
            onPressOut={() => setHoveredButton(null)}
            onPress={() => {
              if (questions[currentIndex - 1].marked !== -1) {
                listRef.current.scrollToIndex({
                  animated: true,
                  index: currentIndex,
                });
              }
            }}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Your Score</Text>
            <Text style={styles.modalScore}>{getTextScore()}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                reset();
              }}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  resetText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  listContainer: {
    marginTop: 20,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 20,
  },
  navButton: {
    height: 50,
    width: 130,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginVertical: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  modalScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#32CD32',
  },
  modalCloseButton: {
    backgroundColor: '#FF6347',
    height: 50,
    width: 150,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;
