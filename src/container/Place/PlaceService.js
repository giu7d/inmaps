import { fireStore } from '../../connect/FirebaseConnect';

export default class PlaceService {
    
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
    
    static delete = (id) => {

        fireStore.collection('places')
            .doc(id)
            .delete();
    }

    static update = (id, data, callback) => {

        fireStore.collection('places')
            .doc(id)
            .set(data)
            .then(doc => callback({key: doc.id, data: doc.data()}))
            .catch(err => callback(err));
    }
}