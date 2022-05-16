import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ActivityForm} from './components';

const App =()=> {
  const [activities, setActivities] = useState([]);
  const totalHours = 168;
  const [time, setTime] = useState("weekly")
  const [freeTime, setFreeTime] = useState(totalHours)
  const [showResult, setShowResult] = useState(false)

  function addActivity(data){
    setActivities([...activities, data])
  }

  function getFreeTime(){
    if (activities.length < 1){
      return
    }
    let _freeTime = totalHours;
    for (let act of activities){
      let cost = act.timeCost;
      if (act.time === "mins"){
        cost = cost / 60
      }
      setFreeTime(_freeTime - (act.freq * cost))
    }
    setShowResult(true);
  }

  function showAddForm(e){
    document.querySelector('.overlay').classList.add('show')
    document.querySelector('#activity-form').classList.remove('hide')
  }

  function parseTime(_time){
    if (time === "daily"){
      _time = _time / 7
    }

    let hours = Number(String(_time).split('.')[0])
    let _mins = ("0." + String(_time).split('.')[1])
    let mins = Number(_mins)
    mins = Math.round(mins * 60)    
    return {mins, hours}
  }

  function removeItem(item){
    let list = Array.from(activities), idx = list.indexOf(item);
    list.splice(idx, 1)
    setActivities(list)
  }

  return (
    <div className="">
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h4> Time Management Tool - Free time finder</h4>
      </header>

      <div className="p-2">
        <div className="flexbox" style={{borderBottom: '1px solid grey'}}>
          <h4 className="mt-0">  Total Hours </h4>
          <h4 className="mt-0"> {totalHours} hours </h4>
        </div>

        <div>
          <div className="flexbox">
            <h3 style={{textAlign: 'left', color: 'grey'}}> Activities </h3>
            <button onClick={showAddForm}> + Add </button>
          </div>

          <ul className="activities">
            {activities.map((item, idx) => 
              <div key={idx} className="flexbox activity">
                <li className="">
                    <h4 className="act"> {item.activity} </h4>
                    <p className="time">
                     {item.timeCost} {item.time} x {item.freq} day{item.freq > 1 && "s"}
                    </p>
                </li>

                <button onClick={e => removeItem(item)}>
                  &times;
                </button>
              </div>
            )}
          </ul>
         <ActivityForm onSubmit={addActivity}/> 
        </div>

        <button onClick={getFreeTime}> Calculate free time </button>

        {showResult && 
          <div className="result">
            <select defaultValue={time} onInput={e => setTime(e.target.value)}>
              <option> daily </option>
              <option> weekly </option>
            </select>
            <h4> You have {parseTime(freeTime).hours} hours {parseTime(freeTime).mins || 0} mins free time {time}</h4>
          </div>
        }
      </div>

      <footer>
        <p> Made with <span role="img"> 💜 </span> by <a className="app-link" href="https://jtogofe.netlify.app">Joel O. Tanko</a> </p>
      </footer>
    </div>


    <div className="overlay"></div>
    </div>
  );
}

export default App;
