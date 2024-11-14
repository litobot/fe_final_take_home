import { useState } from 'react';
import './Form.css';

function Form({ setPotato }){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submitIdeas(event) {
    event.preventDefault()
    const newIdea = {
        id: Date.now(),
        title,
        description
    }
    // "Action goes up"
    // addIdea creates the newIdea object here with user input via the Form component
    // 
    setPotato(newIdea)
    clearInput()
}
function clearInput(){
    setTitle("")
    setDescription("")
}

return (
    <form>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={event => setDescription(event.target.value)}
      />

      <button onClick = { event => submitIdeas(event)}>SUBMIT</button>
    </form>
  )
}

export default Form;