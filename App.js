import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedNoteId, setEditedNoteId] = useState(null);

  const handleLogin = () => {
    // Implement your authentication logic here
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setNotes([]);
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      if (editMode) {
        const updatedNotes = notes.map((note) =>
          note.id === editedNoteId ? { ...note, text: newNote, dateTime: new Date().toLocaleString() } : note
        );
        setNotes(updatedNotes);
        setEditMode(false);
        setEditedNoteId(null);
      } else {
        setNotes([...notes, { id: Date.now(), text: newNote, dateTime: new Date().toLocaleString() }]);
      }
      setNewNote('');
    } else {
      alert('Note cannot be empty.');
    }
  };

  const handleEditNote = (id, text) => {
    setEditMode(true);
    setEditedNoteId(id);
    setNewNote(text);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <View style={styles.loginContainer}>
          <Text style={styles.title}>KEEP NOTES</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Keep Notes</Text>
          <TextInput
            style={styles.input}
            placeholder="Add a new note"
            value={newNote}
            onChangeText={(text) => setNewNote(text)}
          />
          <Button title={editMode ? 'Update Note' : 'Add Note'} onPress={handleAddNote} />
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <View style={styles.noteItem}>
                <Text style={styles.noteText}>{item.text}</Text>
                <Text style={styles.dateTime}>{item.dateTime}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleEditNote(item.id, item.text)}>
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noteItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  noteText: {
    fontSize: 18,
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
});

export default App;