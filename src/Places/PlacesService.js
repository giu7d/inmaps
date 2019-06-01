import { fireStore } from '../Firebase/FirebaseConnect';

export default class PlacesService {
    
    static getAll = (callback) => {
      
        let dataArray = [];

        fireStore.collection('places')
            .get()
            .then(query => {
                query.forEach(doc => {
                    dataArray.push({
                        key: doc.id,
                        data: doc.data()
                    });
                });

                callback(dataArray);
            })
            .catch(err => callback(err))
    }

    static getById = (id, callback) => {

        fireStore.collection('places')
            .doc(id)
            .get()
            .then(doc => callback({
                key: doc.id,
                data: doc.data()
            }))
            .catch(err => callback(err));
    }

    static create = (data, callback) => {

        fireStore.collection('places')
            .add(data)
            .then(doc => callback(doc.id))
            .catch(err => callback(err));
    }
    
    static delete = (id, callback) => {

        fireStore.collection('places')
            .doc(id)
            .delete()
            .then(() => callback('success'))
            .catch(err => callback(err));
    }

    static update = (id, data, callback) => {

        fireStore.collection('places')
            .doc(id)
            .set(data)
            .then(doc => callback({key: doc.id, data: doc.data()}))
            .catch(err => callback(err));
    }
}