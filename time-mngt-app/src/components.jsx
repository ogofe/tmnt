import React, {useState, useRef} from 'react';


export const ComboBox=({ onTextInput, addMissing, data, error, onSubmit, label, ...props })=>{
  const [matches, setMatches] = useState(data);
  const [selected, setSelection] = useState(null);
  
  const filter = useRef()
  window.filter = filter;

  function filterList(query){
    // if(query === "") {
    //   setMatches(data);
    //   return
    // }
    let list = data.filter(item => {
      item = item.toLowerCase()
      return item.includes(query.toLowerCase())
    })

    if (!list.includes(query)){
     list.push(query)
    }
    setMatches(list);
  }

  return(
    <div className={"combo-box" + (props?.className ? props.className : "")} {...props?.style}>
      <p className="combo-label"> {label} </p>
      <input ref={filter} onInput={e => filterList(e.target.value)} />
      <ul className="combo-list">
        {matches.map((item, idx) => 
          <li key={idx} className={"combo-item " + (selected === idx ? "active" : "" )} onClick={e => {
            filter.current.value = item
            onTextInput(item)
            setSelection(idx)
          }}> {item} </li>
        )}
      </ul>
    </div>
  )
}

export const ActivityForm = ({ onSubmit, hideForm }) =>{
  const [activity, setActivity] = useState(null);
  const [timeCost, setTimeCost] = useState(null);
  const [time, setTime] = useState("hours");
  const [freq, setFreq] = useState(1);
  const [error, setError] = useState(false);
  const sampleActvities = [
    "Chores", "Commute / Transportation", "Cooking",
    "Eating", "Gaming", "Hangout with friends", 
    "Reading","School", "Sleep", "Social media",
    "Watching Television", "Work", "Workout"
    ]

  function addActivity(e){
    e.preventDefault();
    if (!activity){
      setError(true);
      window.alert("Please select an activity")
      return
    }
    onSubmit({
      activity,
      timeCost,
      freq,
      time
    })

    hideAddForm();
  }

  function hideAddForm(e){
    document.querySelector('.overlay').classList.remove('show');
    hideForm()
  }

  return(
    <div id="activity-form">
      <form id="form" onSubmit={addActivity}>
        <ComboBox error={error} data={sampleActvities} addMissing={true} label="Activity" onTextInput={act => setActivity(act)} />
        
        <div className="flexbox p-1 pt-0 pb-0" style={{margin: '10px auto'}}>
          <div className="div">
            <span className="label">Daily occurence </span>
            <input type="number" step="1" min="1" defaultValue="1" max="7" onInput={e => setFreq(e.target.value)}/>
          </div>

          <div className="div">
            <span className="label">Time cost </span>
            
            <div className="flexbox">
              <input required type="number" max="60" min="1" defaultValue="1" onInput={e => setTimeCost(e.target.value)} />
            
              <select defaultValue={time} className="time-unit" onInput={e => setTime(e.target.value)}>
                <option> hours </option>
                <option> mins </option>
              </select>
            </div>
          </div>
        </div>

        <div className="flexbox p-2 pt-0 pb-0">
          <button> add </button>
          <button type="button" onClick={hideAddForm}> Cancel </button>
        </div>
      </form>
    </div>
  )
}

export default {ComboBox, ActivityForm}