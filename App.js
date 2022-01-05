import './App.css';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';


/* const INITIAL_LOCATIONS = [

{
  id:1,
  poster:"../img/China.webp",
  name:"China",
  summary:"Zhaoxing Village is flanked by mountains and touts five drum towers representing five good manners in Chinese tradition: benevolence, righteousness, courtesy, wisdom and trust.",
  cost:145000,
  Person:2,
},

{
  id:2,
  poster:"../img/Turkey.webp",
  name:"Turkey",
  summary:"Antalya's Old Town features Ottoman mosques, Roman towers and an ancient harbor lined with bustling modern-day cafes.",
  cost:115000,
  Person:1,
},

{
  id:3,
  poster:"../img/Malaysia.webp",
  name:"Malaysia",
  summary:" Malaysia is gaining in popularity thanks to its natural charms (rainforests, national parks and wildlife abound) and desirable tropical temps.",
  cost:75000,
  Person:2,
},

{
  id:4,
  poster:"../img/Thailand.webp",
  name:"Thailand",
  summary:"The Phi Phi Islands are so idyllic and popular that the Thai government closed them until 2021 to allow for recovery from over-tourism.",
  cost:145000,
  Person:2,
},

{
  id:5,
  poster:"../img/Tajmahal.jpg",
  name:"Tajmahal",
  summary:"The Taj Mahal, is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra.",
  cost:115000,
  Person:1,
},

{
  id:6,
  poster:"../img/Mexico.webp",
  name:"Mexico",
  summary:"Chichen Itza, the ancient Mayan settlement, is a UNESCO World Heritage site dating back to A.D. 750 to 1200.",
  cost:75000,
  Person:2,
},
];  */

function App() {
  
  const[locations, setLocations] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:9000/locations")
    .then((data) => data.json())
    .then((mvs) => setLocations(mvs));
  }, []);
  

  return (
    <div className="App">
    <AddLocation locations = {locations} setLocations={setLocations}/>
    <LocationList locations={locations}/>
    </div>
  );
}


  
function AddLocation ({locations, setLocations})
{  
const history=useHistory()
const [name, setName] = useState({});
const [poster, setPoster] = useState("");
const [cost, setCost] = useState("");
const [summary, setSummary] = useState("");
// const [files, setFiles] = useState("");
const [singleFile, setSingleFile] = useState("");



const SingleFileChange = (e) => {
  setSingleFile(e.target.files[0]);
}

const uploadSingleFile = async () => {
  const formData = new FormData();
  formData.append('file', singleFile);
  await SingleFileUpload(formData);
  console.log(singleFile);
}


const addlocations = () => {
  const newlocation = {
    name, poster, cost, summary,

  };

  // using fetch to post or upadte the  data//
  fetch("http://localhost:9000/locations" ,{
  method:"POST",
  body:JSON.stringify(newlocation),
  headers:{
    "Content-Type":"application/json"
  }
  }).then(()=>history.push("/locations"))
  
}; 





const apiUrl = "http://localhost:9000/locations";

const SingleFileUpload = async(data) => {
     try{
       await axios.post(apiUrl + 'singleFile', data);
     } catch (error) {
       throw error;
     }
}
/* 
  const onInputChange = (e) => {  
    setFiles(e.target.files)
   };
 
  const onSubmit = (e) => {
    e.preventDefault();

  const data = new FormData();

  for(let i = 0; i < files.length; i++) {
    data.append('file', files[i]);
}
  
 
  fetch("http://localhost:9000/locations/" ,{
  method:"POST",
  body:JSON.stringify(),
  headers:{
    "Content-Type":"application/json"
  }
  }).then(()=>history.push("/locations")) 
  

};  */
  



return(
     

    <div className="container">
    <div className="row justify-content-md-center">
    <div className="col-md-auto">


    <div className="add-location-form">
      
      
      <TextField 
      value={name}
      onChange={(event) => setName(event.target.value)} 
      label="name"
      variant="standard" />
      <br/>
 
     <input
      label="Select file"
      type="file"
      onChange={(e) => SingleFileChange(e)}/>
      <br/>
   
     <button
      type="button"
      label="Upload"
      onClick={() => uploadSingleFile()}> Upload
      </button>
      <br/>   

      <TextField 
      value={poster}
      onChange={(event) => setPoster(event.target.value)} 
      label="poster"
      variant="standard" />
      <br/>
      <TextField 
      value={cost}
      onChange={(event) => setCost(event.target.value)} 
      label="cost"
      variant="standard" />
      <br/>
      <TextField 
      value={summary}
      onChange={(event) => setSummary(event.target.value)} 
      label="summary"
      variant="standard" />
      <br/>
      <br/>
      <Button onClick={addlocations} variant="outlined">
       Add Location
      </Button>


    </div>
    </div>
    </div>


  </div>
);
}



function LocationList({locations}) {
  return (
    <div>
      <section className="location-list">
    {locations &&locations.map(({name, poster, summary, cost}, index) => (
    <Locationlist 
    name={name} 
    poster={poster} 
    cost={cost} 
    summary={summary}
    key={index} 
    />

    ))}
    </section>
    </div>
  )
}



function Locationlist({poster,name,summary,cost}) {

  console.log(poster,'test')
  if (typeof name == "string")  {
    return (
      <div className="location-container" >
        <div className="location-poster">
        <img src={poster}
        alt = {name}
        className="location-poster"/>
        </div>
       {/*  <div className="location-userimage">
        <img src={""}
        alt = {img}

        </div> */}
        <div className="location-top">
        <h3 className="location-name">{name}</h3>
        <h4 className="location-cost">₹{cost}/person</h4>
        </div>
        <p className="location-summary">{summary}</p>
      </div>
    );
  }else {
    return <span>fgdf</span>
  }
  
}


export default App;


