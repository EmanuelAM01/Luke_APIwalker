import './App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import {useState} from 'react';
import People from './components/People/People';



function App() {

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [response, setResponse] = useState({})
  const [error, setError] = useState('')

  const opciones = {
    people: ["name","height","mass","homeworld"],
    planets: ["name", "gravity", "climate", "terrain"],
    starships: ["name", "model", "crew", "passengers"],
    vehicles: ["name", "model", "manufacturer", "passengers"],
    species: ["name", "classification", "designation", "language"],
    films: ["title", "producer", "director", "release_date"]
  }
    console.log(opciones["people"])

  const onSubmit = e =>{
    e.preventDefault();
    console.log("https://swapi.dev/api/"+selectedCategory+'/'+selectedId);
    axios.get("https://swapi.dev/api/"+selectedCategory+'/'+selectedId)
        .then(result=>result.data)
        .then(result=>{
          console.log(result)
          if(selectedCategory === "people"){
            axios.get(result.homeworld)
              .then(res=>res.data)
              .then(res=>{
                result.homeworld = res.name;
                console.log(result);
                setResponse(result)
                setError('')})
          }else{
          console.log(result)
          setResponse(result)
          setError('')}
        })
        .catch(err =>{
          setError("Estos no son los droides que está buscando")
        })
  }


  return (
    <div className="App">
      <form onSubmit={(e) => onSubmit(e)}>
        <select value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}>
          <option value="">Please select a Category</option>
          <option value="people">People</option>
          <option value="films">Films</option>
          <option value="starships">Starships</option>
          <option value="vehicles">Vehicles</option>
          <option value="species">Species</option>
          <option value="planets">Planets</option>
        </select>
        <label>Id:</label>
        <input type="number" onChange={e=>setSelectedId(e.target.value)}/>
        <input type="submit" value='Submit'/>
      </form>
      <div>
        {
          selectedCategory !== ""?
          opciones[selectedCategory].map((opcion)=>
            <h5>{opcion} : {response[opcion]}</h5>)//accedimos a un diccionario con corchetes ya que era una variable 
          :null
        }
      </div>
      {
        error !== ''?
        <div style={{display: "block",
        alignItems: "center"}}>
        <div  style={{ 
          backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwn1EBUTdEWf7H0-Um7efjztUXZN71wRYqKLupMrPAew&s")`,
          height: "130px",
          width: "230px",
          marginLeft:"600px", 
          display: "block",
          alignItems: "center"
        }}></div>
        <h1>{error}</h1>
        </div>
        :null
      }
      <BrowserRouter>
      <div className='container'>
        <Switch>
          <Route path="/:id" render={(routeProps) => <People setResponse={setResponse} setErorr={setError} setSelectedCategory={setSelectedCategory} {...routeProps}/>} />
        </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
