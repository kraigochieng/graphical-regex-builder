import { useState } from 'react'
import './App.css'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import Regex from './components/Regex'
import RegexType from './types/RegexType'
import { v4 as uuidv4 }from 'uuid'

function App() {
  const [regexes, setRegexes] = useState<RegexType[]>([])
  const [fullRegex, setFullRegex] = useState<string>('')
 
  // Drag functionality
  function handleOnDragEnd(result: DropResult) {
    if(!result.destination) return;
    const updatesRegexes = [...regexes]
    const [reorderedRegex] = updatesRegexes.splice(result.source.index, 1)
    updatesRegexes.splice(result.destination!.index, 0 , reorderedRegex)
    setRegexes(updatesRegexes)
  }

  // Adding blank regexes
  function addRegex() {
    const newRegex: RegexType = {
      type: null,
      repetition: null,
      isCaseSensistive: null,
      value: null,
      id: uuidv4() // this called here to prevent it from being created many times
    }

    setRegexes(prevValues => [...prevValues, newRegex])
  }

  // Getting final result
  function generateFullRegex() {
    console.log(regexes)
    let tempRegex = ''
    regexes.map(regex => {
      console.log(regex.value)
      tempRegex+= regex.value
    })
    setFullRegex(tempRegex)
  }


  // Handle CHange is handled here for the whole regex array, then it shall be passed as props
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, currentIndex: number) {
    const { name, value } = event.target

    if(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
      setRegexes((prevRegexes) => {
        // loop through all the regexes
        return prevRegexes.map((prevRegex, index) => {
          // if the index matches, change that particular regex, else return the normal regex
          return currentIndex == index ? {...prevRegex, [name]: value} : prevRegex 
        })
      })
    }
}
  return (
    <>
      <form>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <ul className="fields" {...provided.droppableProps} ref={provided.innerRef}>
              {
                regexes.map((regex, index) => {
                  return (
                    <Draggable key={regex.id} draggableId={regex.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Regex
                            regex={regex}
                            index={index}
                            handleChange={(event) => handleChange(event, index)}
                          />
                        </li>
                      )}
                    </Draggable>

                  )
                })
              }
              {provided.placeholder}
              </ul>
            )}

          </Droppable>
        </DragDropContext>
        {
          regexes.length === 0 ? 
          <p>Please add a field</p> :
          null
        }    
        <button onClick={addRegex} type="button">Add Field</button>
        <button onClick={generateFullRegex} type="button">Generate Regex</button>
      </form>
      <p>{fullRegex}</p>
    </>
  )
}

export default App
