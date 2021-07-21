import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

import List from './List';

const db = firebase.firestore();

const Lists = () => {
  const [docs, setDocs] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  >([]);

  useEffect(() => {
    const listRef = db.collection('lists');
    listRef.get().then(({ docs }) => setDocs(docs));
  }, []);

  return (
    <div>
      {docs.map(({ id }) => (
        <List key={id} id={id} />
      ))}
    </div>
  );
};

export default Lists;
