import { fireStore, fireStorage } from '../../connect/FirebaseConnect';
import Utils from '../../utils/Utils';
import Hash from 'jshashes';

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

	static update = (id, data) => {

		const border = (typeof(data.border[0]) === 'object') ? data.border.map(polygon => Utils.mapPolygonToString(polygon)) : data.border;

		fireStore.collection('places')
			.doc(id)
			.set({
					...data,
					border: border,
				});
	}
 

	static upload = (place, file, progress, load, error, complete) => {

		const hashFileName = new Hash.MD5().hex(file.name + (Math.random() * 1000 * file.size));

		const storageRef = fireStorage.ref();
		
		const metadata = {
			contentType: file.type,
		}

		const uploadTask = storageRef.child('blueprints/' + hashFileName).put(file, metadata);

		uploadTask.on('state_changed',
			(snapshot) => progress((snapshot.state === 'running'), snapshot.bytesTransferred, snapshot.totalBytes),
			(e) => error('Oh NO!!'),
			() => {
				
				const { id, blueprint } = place;

				this.update(id, {
					...place,
					blueprint: [
						...blueprint, 
						{
							image: hashFileName,
							border: []
						}
					]	
				});
				load();
				complete();
			});
				
		
		// Create a reference to 'mountains.jpg'
		// var mountainsRef = storageRef.child('mountains.jpg');

		// Create a reference to 'images/mountains.jpg'
		// var mountainImagesRef = storageRef.child('images/mountains.jpg');

	}
}