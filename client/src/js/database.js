import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('Post to the database');

    // Create a connection to the database database and version we want to use
    const jateDb = await openDB('content', 1);

    // Create a new transaction and specify the database and data privileges
    const tx = jateDb.transaction('jate', 'readwrite');

    // Open up the desired object store
    const store = tx.objectStore('jate');

    // Use the .put() method on the store and pass in the content
    const request = store.put({ id: 1, value: content });

    // Get confirmation of the request
    const result = await request;

    console.log('Data saved to the database', result);
  } catch (error) {
    console.error('Error saving data to the database', error);
  };
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
