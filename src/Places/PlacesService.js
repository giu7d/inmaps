import { fireStore } from '../Firebase/FirebaseConnect';

export default class PlacesService {
    
    static getAll = (callback) => {
      
        let data = [];

        fireStore.collection('places')
                  .get()
                  .then((query) => {
                    query.forEach(doc => {
                        data.push({key: doc.id, data: doc.data()});
                    });
                    callback(data);
                  });
    }

    // static post = (collection, data, callback) => {
    //     firebaseDB.collection(collection)
    //                 .add(data)
    //                 .then(doc => callback(doc.id))
    //                 .catch(error => callback(error));
    // }
}