# Setting Up Firestore in a JavaScript Project

### General Objectives

* Create a database in Firebase to use in the project.
* Replace the local storage option

### Details

**This is an optional step!** 
To get started with Firestore, we'll head to the Firebase console. You can visit that by going to https://console.firebase.google.com/. You'll need to have a Google account to sign in.

Once we're signed in, we'll create a new project and give it a name.

<img src='firebase1.JPG' height='500' />

Follow the on-screen instructions, I chose not to add in google analytics.
 
<img src='firebase2.JPG' height='500' />

Once our project is created select the code button.
This will give us the code we need to integrate Firestore with our JavaScript project.


Usually if you're setting this up in any sort of JavaScript application, you'll want to put this in a dedicated file called firebase.js.

> Use `type="module"` in your script tags to allow us to use the new features! 
```js
import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDpLmM79mUqbMDBexFtOQOkSl0glxCW_ds",
  authDomain: "lfasdfkjkjlkjl.firebaseapp.com",
  databaseURL: "https://lfasdlkjkjlkjl.firebaseio.com",
  projectId: "lfasdlkjkjlkjl",
  storageBucket: "lfasdlkjkjlkjl.appspot.com",
  messagingSenderId: "616270824980",
  appId: "1:616270824990:web:40c8b177c6b9729cb5110f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

You can also include specific Firebase products by adding the following scripts to the bottom of your <body> tag, but before any Firebase services:

```html
  <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-firestore.js"></script>
</body>
```

### Firestore Collections and Documents

There are two key terms that are essential to understanding how to work with Firestore: documents and collections.

Documents are individual pieces of data in our database. You can think of documents to be much like simple JavaScript objects. They consist of key-value pairs, which we refer to as fields. The values of these fields can be strings, numbers, Booleans, objects, arrays, and even binary data.
document: `{ key: value }`
Sets of these documents of these documents are known as collections. Collections are very much like arrays of objects. Within a collection, each document is linked to a given identifier (id).
collection: `[{ id: doc }, { id: doc }]`

### Managing our database with the Firestore Console

Before we can actually start working with our database we need to create it.
Within our Firebase console, go to the `Cloud Firestore` tab and create your Firestore database.

<img src='firebase3.JPG' height='500' />

Once you've done that, we will start in test mode and enable all reads and writes to our database. In other words, we will have open access to get and change data in our database. If we were to add Firebase authentication, we could restrict access only to authenticated users. I chose Australia as the server! 

<img src='firebase4.JPG' height='500' />

After that, we'll be taken to our database itself, where we can start creating collections and documents. The root of our database will be a series of collections.

We can select `Start collection` and give it a `Collection ID` Every collection is going to have an id or a name.

<img src='firebase5.JPG' height='500' />

Next, we'll add our first document with our newly-created `tasks` collection.
Each document is going to have an id as well, linking it to the collection.

<img src='firebase6.JPG' height='500' />

In most cases we're going to use an  option to give it an automatically generated ID. So we can hit the button `auto id` we need to provide the fields, types, and values.

### Getting data from a collection with .get()

To get access Firestore use all of the methods it provides, we use `firebase.firestore()` This method need to be executed every time we want to interact with our Firestore database.
I would recommend creating a dedicated variable to store a single reference to Firestore. Doing so helps to cut down on the amount of code you write across your app.

> `const db = firebase.firestore();`

In this cheatsheet, however, I'm going to stick to using the firestore method each time to be as clear as possible.
To reference a collection, we use the `.collection()` method and provide a collection's id as an argument. To get a reference to the tasks collection we created, just pass in the string 'tasks'.
```js
const tasksRef = firebase.firestore().collection('tasks');
```

Use the `.get()` to get all of the document data from a collection.

`.get()` returns a promise, which means we can resolve it either using a .then() callback or we can use the async-await syntax!

Once our promises is resolved, we get back what's known as a snapshot.
For a collection query, that snapshot is going to consist of a number of individual documents. We can access these by using `snapshot.docs`

From each document, we can get the id as a separate property, and the rest of the data using the `.data()` method.
Here's what our entire query looks like:
```js
const tasksRef = firebase
  .firestore()
  .collection("tasks");
tasksRef
	.get()
	.then((snapshot) => {
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	console.log("All data in 'tasks' collection", data); 
	// [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
	});
  ```
### Subscribing to a collection with `.onSnapshot()`
The `.get()` method simply returns all the data within our collection.
To leverage some of Firestore's realtime capabilities we can subscribe to a collection, which gives us the current value of the documents in that collection, whenever they are updated.
Instead of using the `.get()` method, which is for querying a single time, we use the .`onSnapshot()` method.
```js
firebase
	.firestore()
	.collection("tasks")
	.onSnapshot((snapshot) => {
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	console.log("All data in 'tasks' collection", data);
	});
 ```

In the code above, we're using what's known as method chaining instead of creating a separate variable to reference the collection.

Within the `.onSnapshot()` callback, we get direct access to the snapshot of our collection, both now and whenever it's updated in the future. Try manually updating our one document and you'll see that `.onSnapshot()` is listening for any changes in this collection.

### Unsubscribing from a collection with `.unsubscribe()`
Note additionally that `.onSnapshot()` returns a function which we can use to unsubscribe and stop listening in on a given collection.
This is important in cases where the user goes away from a given page where we're displaying a collection's data. Here's an example, using the library React were we are calling unsubscribe within the `useEffect` hook.

When we do so this is going to make sure that when our component is unmounted (no longer displayed within the context of our app) that we're no longer listening in on the collection data that we're using in this component.
```js
function App() {
	const [tasks, setTasks] = useState([]);
useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection("tasks")
			.onSnapshot((snapshot) => {
				const data = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
				}));
				setTasks(data);
			});
		}, []);

		return tasks.map(task => <TaskList key={task.id} task={task} />)
}
```
### Getting Individual Documents with `.doc()`
When it comes to getting a document within a collection, the process is just the same as getting an entire collection: we need to first create a reference to that document, and then use the `.get()` method to grab it.
After that, however, we use the `.doc()` method chained on to the `.collection()` method. In order to create a reference, we need to grab this id from the database if it was auto generated. After that, we can chain on `.get()` and resolve the promise.
```js
const taskRef = firebase
	.firestore()
	.collection("tasks")
	.doc("glMeZvPpTN1Ah31sKcnj");
taskRef.get().then((doc) => {
	if (!doc.exists) return;
	console.log("Document data:", doc.data());
	// Document data: { task: 'Take out the dishes' }
});
```

Once we get the document back, it's essential to check to see whether it exists.
If we don't, there'll be an error in getting our document data. The way to check and see if our document exists is by saying, `if doc.exists` which returns a `true` or `false` value.
If this expression returns `false`, we want to `return` from the function or maybe `throw` an error. If `doc.exists` is `true`, we can get the data from `doc.data`
Adding document to a collection with `.add()`

Next, let's move on to changing data. All you need to do is select a collection reference (with `.collection()`) and chain on `.add()`
Going back to our definition of documents as being like JavaScript objects, we need to pass an object to the `.add()` method and specify all the fields we want to be on the document.
```js
firebase
	.firestore()
	.collection("tasks")
	.add({
		task: "Mow the lawn",
	})
	.then((ref) => {
		console.log("Added doc with ID: ", ref.id);
		// Added doc with ID:  ZzhIgLqELaoE3eSsOazu
	});
```

The `.add()` method returns a promise and from this resolved promise, we get back a reference to the created document, which gives us information such as the created id.
The `.add()` method auto generates an id for us. Note that we can't use this ref directly to get data. We can however pass the `ref` to the doc method to create another query.

### Adding a document to a collection with `.set()`
Where `.set()` differs from `.add()` lies in the need to specify our own id upon adding the data.
This requires chaining on the `.doc()` method with the id that you want to use. Also, note how when the promise is resolved from `.set()`, we don't get a reference to the created document:
```js
firebase
	.firestore()
	.collection("tasks")
	.doc("another task")
	.set({
		task: "Feed the cat",
	})
	.then(() => {
		console.log("Document created");
	});
  ```

Additionally, when we use `.set()` with an existing document, it will, overwrite that document.
If we want to merge, an old document with a new document instead of overwriting it, we need to pass an additional argument to `.set()` and provide the property merge set to `true`

Use `.set()` to merge data with existing document, not overwrite
```js
const taskRef = firebase
	.firestore()
	.collection("tasks")
	.doc("another task");
taskRef
	.set({
		assignedTo: "Albert"
	}, { merge: true })
	.then(() => {
		console.log("Document merged");
		taskRef
			.get()
			.then(doc => {
				console.log("Merged document: ", doc.data());
				// Merged document:  { task: 'Feed the cat', assignedTo: 'Albert' }
			});
	});
```

### Updating existing data with `.update()`
What's helpful about using `.update()` is that, unlike `.set()`, it won't overwrite the entire document. Also like `.set()`, we need to reference an individual document.
When you use `.update()`, it's important to use some error handling, such as the `.catch() `callback in the event that the document doesn't exist.
```js
const taskRef = firebase.firestore().collection("tasks").doc("another task");
taskRef
	.update({
		status: "Done",
	})
	.then(() => {
		console.log("Document updated"); // Document updated
	})
	.catch((error) => {
		console.error("Error updating doc", error);
	});	
  ```
  
### Deleting data with `.delete()`
We can delete a given document collection by referencing it by it's id and executing the `.delete()` method.
```js
firebase
	.firestore()
	.collection("tasks")
	.doc("another task")
	.delete()
	.then(() => console.log("Document deleted")) // Document deleted
	.catch((error) => console.error("Error deleting document", error));
  ```
Note that the official Firestore documentation does not recommend to delete entire collections, only individual documents.

### Example
Check out the [example](./example) folder. 
 
https://www.freecodecamp.org/news/the-firestore-tutorial-for-2020-learn-by-example/
https://firebase.google.com/docs/firestore/quickstart
 
 
 
 
 
 
 
 
 


