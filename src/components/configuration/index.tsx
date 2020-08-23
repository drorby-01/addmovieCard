import React, { useState } from "react"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/esm/Button"
import InputGroup from "react-bootstrap/InputGroup"

interface IProp{
    starsColor:Function
    visible:string
}



export default function Configuration(prop:IProp){
    
    const [color,setColor] =useState("")
    const {starsColor,visible} = prop
    
    return <div style={{display:visible}}>
    <InputGroup className="mb-3 ">
    <FormControl
      placeholder="Enter Color"
      value={color}
      onChange={(e)=>setColor(e.target.value)}
    />
    <Button className="ml-1" onClick={()=>starsColor(color)}>change stars color</Button>
    </InputGroup>
    </div>

}