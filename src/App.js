import React, { useEffect } from 'react';
import './App.css';

function App() {
  
  
  useEffect(() => {
    const buttonsElement = document.querySelectorAll('button')
    humanCLickEvent(buttonsElement)
  })
  return (
    <div className="game_area">
      <div className="button_row">
        <button data-ref="11"></button>
        <button data-ref="12"></button>
        <button data-ref="13"></button>
      </div>
      <div className="button_row">
        <button data-ref="21"></button>
        <button data-ref="22"></button>
        <button data-ref="23"></button>
      </div>
      <div className="button_row">
        <button data-ref="31"></button>
        <button data-ref="33"></button>
        <button data-ref="33"></button>
      </div>
    </div>
    
  );
}

export default App;


const humanCLickEvent = (buttonsElement) => {
  buttonsElement.forEach((el) => {
    el.addEventListener('click',(e) => {
      if(el.textContent === "") {
        const spanElement = document.createElement('span')
        spanElement.classList.add('cross')
        spanElement.textContent = 'X'
        e.target.appendChild(spanElement)
      }
      if(!winCriteria(buttonsElement)) {
        AITurn(buttonsElement)
      } else {
        resetGame(buttonsElement)
      }
    })
  })
}

const winCriteria = (buttonsElement) => {
  for (let i = 0 ; i <= 8; i+=3) {
    if((buttonsElement[i].textContent !== '') 
    && (buttonsElement[i].textContent === buttonsElement[i+1].textContent) 
    && (buttonsElement[i+1].textContent === buttonsElement[i+2].textContent)) {
      alert(`The Winner Side is ${buttonsElement[i].textContent}`)
      return true
      // win first col
    }
  }
  for (let i = 0 ; i <= 2; i++) {
    if((buttonsElement[i].textContent !== '') 
    && (buttonsElement[i].textContent === buttonsElement[i+3].textContent) 
    && (buttonsElement[i+3].textContent === buttonsElement[i+6].textContent)) {
      alert(`The Winner Side is ${buttonsElement[i].textContent}`)
      return true
      // win first col
    }
  }
    // win diagonal t->b l->r
  if((buttonsElement[0].textContent !== '') 
  && (buttonsElement[0].textContent === buttonsElement[4].textContent) 
  && (buttonsElement[4].textContent === buttonsElement[8].textContent)) {
    alert(`The Winner Side is ${buttonsElement[0].textContent}`)
    return true
    // win diagonal b->t l->r
  } else if((buttonsElement[6].textContent !== '') 
  && (buttonsElement[6].textContent === buttonsElement[4].textContent) 
  && (buttonsElement[4].textContent === buttonsElement[2].textContent)) {
    alert(`The Winner Side is ${buttonsElement[6].textContent}`)
    return true
  }
  let emptySpaces = Array.from(buttonsElement).filter((el) => {
    return el.textContent === ''
  })
  if(emptySpaces.length === 0) {
    return true
  }
  return false
}



const AITurn = (buttonsElement) => {
  let meaningMovementDone = false
  if(!meaningMovementDone) {
    for(let i = 0; i <= 8; i+=3) {
      if(nextMeaningMove([buttonsElement[i].textContent, buttonsElement[i+1].textContent, buttonsElement[i+2].textContent], [i, i+1, i+2], buttonsElement, 'win')) {
        meaningMovementDone = true
        break
      }
    }
    for(let i = 0; i <= 8; i+=3) {
      if(nextMeaningMove([buttonsElement[i].textContent, buttonsElement[i+1].textContent, buttonsElement[i+2].textContent], [i, i+1, i+2], buttonsElement, 'prevent')) {
        meaningMovementDone = true
        break
      }
    }
  }
  if(!meaningMovementDone) {
    for(let i = 0; i <= 2; i++) {
      if(nextMeaningMove([buttonsElement[i].textContent, buttonsElement[i+3].textContent, buttonsElement[i+6].textContent], [i, i+3, i+6], buttonsElement, 'win')) {
        meaningMovementDone = true
        break
      }
    }
    for(let i = 0; i <= 2; i++) {
      if(nextMeaningMove([buttonsElement[i].textContent, buttonsElement[i+3].textContent, buttonsElement[i+6].textContent], [i, i+3, i+6], buttonsElement, 'prevent')) {
        meaningMovementDone = true
        break
      }
    }
  }
  if(!meaningMovementDone) {
      meaningMovementDone = nextMeaningMove([buttonsElement[0].textContent, buttonsElement[4].textContent, buttonsElement[8].textContent], [0, 4, 8], buttonsElement, 'win')
  }
  if(!meaningMovementDone) {
    meaningMovementDone = nextMeaningMove([buttonsElement[0].textContent, buttonsElement[4].textContent, buttonsElement[8].textContent], [0, 4, 8], buttonsElement, 'prevent')
  }
  if(!meaningMovementDone) {
    meaningMovementDone = nextMeaningMove([buttonsElement[6].textContent, buttonsElement[4].textContent, buttonsElement[2].textContent], [6, 4, 2], buttonsElement, 'win')
  }
  if(!meaningMovementDone) {
    meaningMovementDone = nextMeaningMove([buttonsElement[6].textContent, buttonsElement[4].textContent, buttonsElement[2].textContent], [6, 4, 2], buttonsElement, 'prevent')
  }
  if(!meaningMovementDone) {
    randomMovement(buttonsElement)
  }
  if(winCriteria(buttonsElement)) {
    resetGame(buttonsElement)
  }
}


const nextMeaningMove = (values, indexes, buttonsElement, movement) => {
  if((values[0] === '')
  || (values[1] === '')
  || (values[2] === '')) {
    let oArray = []
    let xArray = []
    let emptySpaces = 0
    values.forEach((el, index) => {
      if(el === 'O') {
        oArray.push(index)
      } else if (el === 'X') {
        xArray.push(index)
      } else {
        emptySpaces = index
      }
    })
    if(movement === 'win') {
      if(oArray.length === 2) {
        const spanElement = document.createElement('span')
        spanElement.classList.add('circle')
        spanElement.textContent = 'O'
        buttonsElement[indexes[emptySpaces]].appendChild(spanElement)
        return true
      } else {
        return false
      }
    } else if(movement === 'prevent'){
      if(xArray.length === 2) {
        const spanElement = document.createElement('span')
        spanElement.classList.add('circle')
        spanElement.textContent = 'O'
        buttonsElement[indexes[emptySpaces]].appendChild(spanElement)
        return true
      } else {
        return false
      }
    }
  }
}


const randomMovement = (buttonsElement) => {
  let emptySpaces = []
  buttonsElement.forEach((el, index) => {
    if(el.textContent === '') {
      emptySpaces.push(index)
    }
  })
  const spanElement = document.createElement('span')
  spanElement.classList.add('circle')
  spanElement.textContent = 'O'
  buttonsElement[emptySpaces[Math.floor(Math.random()*emptySpaces.length)]].appendChild(spanElement)
}

const resetGame = (buttonsElement) => {
  buttonsElement.forEach((el)=> {
    el.innerHTML = ''
  })
}