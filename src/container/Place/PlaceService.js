import { fireStore, fireStorage, fireAuth } from '../../connect/FirebaseConnect';
import Hash from 'jshashes';


export default class PlaceService {
			

	static getAll = (callback) => {

		const user = fireAuth.currentUser;
		let dataArray = [];

		if (user) {		
			fireStore.collection('places')
				.where('uid', '==', user.uid)
				.get()
				.then(query => {					
					query.forEach(doc => dataArray.push({
						key: doc.id,
						data: doc.data()
					}));
					callback(dataArray);
				})
				.catch(err => console.error(err));
		} else {
			throw new Error('401 Unauthorized Request 😸');			
		}
	}

	static getById = (id, callback) => {

		const user = fireAuth.currentUser;
		
		if (user) {
			fireStore.collection('places')
				.doc(id)
				.get()
				.then(doc => {
					callback({
						key: doc.id,
						data: doc.data()
					});
				})
				.catch(err => console.error(err));
			} else {
				throw new Error('401 Unauthorized Request 😸');			
			}
	}

	static create = (data, callback) => {

		const user = fireAuth.currentUser;

		if (user) {

			fireStore.collection('places')
				.add({
					...data,
					uid: user.uid
				})
				.then(doc => {
					//return doc id for url navigation
					callback(doc.id)
				})
				.catch(err => callback(err));
		} else {
			throw new Error('401 Unauthorized Request 😸');
		}
	}
    
	static delete = (id) => {

		const user = fireAuth.currentUser;

		if (user) {
			fireStore.collection('places')
				.doc(id)
				.delete();
		} else {
			throw new Error('401 Unauthorized Request 😸');
		}
	}

	static update = (id, data) => {

		const user = fireAuth.currentUser;

		if (user) {
			fireStore.collection('places')
				.doc(id)
				.set(data);
		} else {
			throw new Error('401 Unauthorized Request 😸');
		}
	}
 
	static upload = (folder, file, { progress, load, error } , callback) => {

		const { name, size, type } = file;

		// Hash file name
		const hashedFileName = new Hash.MD5().hex(name + (Math.random() * 1000 * size));
		
		// Ref()
		const storageRef = fireStorage.ref();
		const metadata = {
			contentType: type,
		}
		
		// Start Upload
		const uploadTask = storageRef.child(folder + hashedFileName).put(file, metadata);

		// On finished
		uploadTask.on('state_changed',
			(snapshot) => progress((snapshot.state === 'running'), snapshot.bytesTransferred, snapshot.totalBytes),
			(err) => console.log('On upload', err),
			() => {
				// Get File URL
				storageRef.child(folder + hashedFileName).getDownloadURL()
				.then((url) => {
					// Callback URL and Hashed FileName to instanciate a new Blueprint
					callback(url, hashedFileName);
					load();
				})
				.catch(err => console.log('On get URL',err));
			});
	}
}