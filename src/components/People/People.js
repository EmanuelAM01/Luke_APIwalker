import {  useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const People = (props) =>{
    const {setError, setResponse, setSelectedCategory} = props;

    const {id} = useParams();
    
    useEffect(()=>{
        axios.get("https://swapi.dev/api/people"+'/'+id)
        .then(result=>result.data)
        .then(result=>{
            setSelectedCategory("people")
            console.log(result)
            axios.get(result.homeworld)
                .then(res=>res.data)
                .then(res=>{
                result.homeworld = res.name;
                console.log(result);
                setResponse(result)
                setError('')})
        })
        .catch(err =>{
            setError("Estos no son los droides que está buscando")
        })}, [])
    
}
export default People;
