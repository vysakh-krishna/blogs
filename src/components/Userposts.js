import React from 'react'

const outercontainer={
    height: 'auto',
    width: 'auto',
    margin: '80px auto 10px',
    justifyContent: 'center',
    padding: '10px'
}

const btn={
    backgroundColor: '#c9f1ff',
    border:'none',
    borderRadius: '10px',
    width:80,

}

const postcontainer={
    display: 'flex',
    justifyContent: 'center',
    flexWrap:'wrap',
    flexDirection: 'column',
    maxWidth: 500,
    margin: 'auto',
    boxShadow: '0px 0px 7px 3px rgba(0,0,0,0.51)',
    WebkitBoxShadow: '0px 0px 7px 3px rgba(0,0,0,0.51)',
    MozBoxShadow: '0px 0px 7px 3px rgba(0,0,0,0.51)',
    borderRadius:10,
    padding: '10px'
}

const postcard={
    height:200,
    margin:5,
    flex: 1,
    padding: '10px',
    backgroundColor: '#e0ffee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    borderRadius: '15px',
    flexDirection:'column'
}
function Userposts(props) {
    // Getting props from the Main component and storing it.
    let userposts = props.postdetails;
    let setpostdetails =props.setpostdetails;

    // Function that keep the details of the posts that are previously stored and add the post id to specifically identify the post and set page to post to render the post component.
    const showdetails=(id)=>{
        setpostdetails({...userposts,id:id,page:"post"});
    }
  return (
    <div style={outercontainer}>
        <div style={postcontainer}>
        <div style={{textAlign: 'left',}}>
            {/* Function to go back to the previous menu by changing the postdetails state to home  */}
            <button style={btn} onClick={() =>setpostdetails({...userposts,page:'home'})}>
                <img style={{height:40,width:40}} src="./back.png" alt="Back" />
            </button>
        </div>
            {
                // To show all the posts that are stored in the state.
                userposts.posts.map((post)=>(
                    <div key={post.id} style={postcard}>
                        <div style={{fontSize: '20px',fontWeight:600}}>{post.title}</div>
                        <div style={{backgroundColor:'#57a2ff',color:'white',borderRadius:5,padding:2,alignItems:'center'}} onClick={(e)=>showdetails(post.id)}>
                            Read more
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Userposts