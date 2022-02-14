import React from 'react'


const blog={
    fontSize:40,
    top:0,
    width:'100%',
    position: 'fixed',
    boxShadow: '0px 7px 5px 0px rgba(0,0,0,0.5)',
    WebkitBoxShadow: '0px 7px 5px 0px rgba(0,0,0,0.5)',
    MozBoxShadow: '0px 7px 5px 0px rgba(0,0,0,0.5)',
    paddingBottom: 10,
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius:'0px 0px 10px 10px'
}
function Navbar() {
  return (
    <div>
        <div style={blog}>
            <span style={{color: 'red'}}>B</span>logs
        </div>
    </div>
  )
}

export default Navbar