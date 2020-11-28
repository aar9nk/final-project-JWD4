Clean up the files and folders
isntall bootstrap and react-bootstrap
link the `import 'bootstrap/dist/css/bootstrap.min.css';` to index.js
import TaskManager from './taskManager'; and declare taskManager again just like you did in your old index.js
paste in your old form html inside the return function of app.js
replace all `class=` with `className=` and `for=` with `htmlFor=`;

create a `handleSubmit` function and for now it can be blank, just verify that it works. Go ahead and use the onSubmit event listener in the form
```
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('hi');
  }
```  
grab useState
lets declare our set state hooks
copy and paste your names from your old index.js file
Target the correct data we want to send to our state `onChange={(element) => setValidateName(element.target.value)}`
lets set the value of the input fo be the hook as well. `value={validateName}`
console.log the results in our handleSubmit function. 

change your class validations, I used another separate hook to make it easier to see what's happening. 
Only display the invalid case if the input is invalid! 

write a clearformfields function that sets our state back to the original

copy accross the code where you will add a task if the validation is complete.

Create a hook for the tasks, so we can set our task list in our state. That way if the state changes anything associated with the state will update. 

we no longer need the `createTaskHtml` and `render()` functions, instead react does it for us, so lets .map() our taskmanager.tasks straight into our `<ul> </ul>`

obviously we have to re-write a few things and change our syntax into JSX but the logic is the same! 

We no longer need event listeners, and react allows for a "key" for each of the tasks. So let's instead use them for our delete and done buttons! Don't forget to call the save method, and create a new method to update our state with the most current version of the task list. 
We dont ned to convert to number because we are just working in JS now


