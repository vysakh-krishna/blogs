import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const outercontainer={
    width: 'auto',
    margin: '80px auto 10px',
    justifyContent: 'center',
    padding: '10px'
}
const innercontainer={
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    margin: 'auto',
    boxShadow: '0px 0px 7px 3px rgba(0,0,0,0.51)',
    WebkitBoxShadow: '0px 0px 7px 3px rgba(0,0,0,0.51)',
    MozBoxShadow: '0px 0px 7px 3px rgba(0,0,0,0.51)',
    borderRadius:10,
    padding:10
}
const backbtn={
  backgroundColor: '#c9f1ff',
  border:'none',
  borderRadius: '10px',
  width:80,

}
const dltbtn={
  backgroundColor: '#ff3348',
  border:'none',
  borderRadius: '10px',
  width:80,

}
const showcommentbox={
  margin:5,
  padding:10,
  borderRadius:10,
  height:'200px',
  overflowY: 'auto',
  border:'2px solid grey'
  
}
const hidecommentbox={
  display:'none'
}

function Post(props) {
  // State to store the details of a specific post  of a user, that are fetched using getpost ().
  const [post, setPost] = useState();
  // State to switch between show and hide comments.
  const [showcomments, setShowcomments] = useState(false);
  // State to enable or disable the loading state in comments box.
  const [loading, setLoading] = useState(false);
  // State to store the comments of a specific post, that are fetched using  getcomment().
  const [comments, setComments] = useState();
  
  // Getting props from the Main component and storing it.
    let postbody=props.postdetails;
    let setpostdetails=props.setpostdetails;
    let isloading=props.isloading;
    let setIsloading=props.setIsloading;

    // Function to fetch user post details. 
    const getpost= async (e)=>{
      setIsloading(true);
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${e}`
        ).then((response)=>response.json());
        let data=response;
        setPost(data);
        setIsloading(false);
    }
    useEffect(() => {
      getpost(postbody.id);
    } ,[]);
    
    // Functiont to fetch the comments from a specific post.
    const getcomment=async (e)=>{
      setShowcomments(!showcomments);
      setLoading(true);
      let key=e
      const response= await fetch(`https://jsonplaceholder.typicode.com/posts/${key}/comments`)
      .then((response) => response.json());
      let data=response;
      setComments(data);
      setLoading(false);
    }
    // Function to detele the current post and go back to the previous menu. The post won't be deleted from the database.
    const deletePost = async (e)=>{
      setIsloading(true);
      await fetch(`https://jsonplaceholder.typicode.com/posts/${e}`, {
          method: 'DELETE',
        }
      );
      // Setting the state to previous state by adding all the posts that are stored in postbody, and page to userposts.
      setpostdetails({...postbody,page:'userposts'})
      setIsloading(false);
    }
  return (
    <div style={outercontainer}>
      {/* Checking the loading state before rendering the component.*/}
        {isloading?<Loading/>:
          <>
          <div style={innercontainer}>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
              <button style={backbtn} onClick={(e)=>setpostdetails({...postbody,page:'userposts'})}>
                  <img style={{height:40,width:40}} src="./back.png" alt="Back" />
              </button>
              <button style={dltbtn} onClick={(e)=>deletePost(post.id)}>
                  <img style={{height:40,width:40}} src="./delete.png" alt="delete" />
              </button>
            </div>
            <div style={{display: 'flex', flexDirection:'column',marginTop:20,padding:10,borderRadius:10,border:'1px solid rgba(0,0,0,1)'}}>
              <div style={{display: 'flex',justifyContent: 'left',marginLeft:10}}>
                <div style={{fontSize:30,fontWeight:'bold',textAlign: 'left'}}>
                  {(post)&& post.title}
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'center',padding:20}}>
                <div style={{fontSize:'20px',fontWeight:500}}>
                  {(post)&& post.body}
                </div>
              </div>
            </div>
            <div style={{marginTop:2}}>
              <div style={{display: 'flex',justifyContent:'center',}}>
                <button style={{fontSize:'20px',fontWeight:500,maxWidth:200,flex:1,backgroundColor:'#57a2ff',border:'none',borderRadius:20}} onClick={()=>getcomment(post.id)}>Comments</button>
              </div>
              {/* Checking whether to show the comment box or not.*/}
              <div style={showcomments? showcommentbox:hidecommentbox}>
                {/* Checking the Loading state for comment box */}
                {loading ?
                
                <Loading/>
              :
              <>
              {
                comments && comments.map((comment)=>
                <div key={comment.id} style={{borderRadius:5,margin:10,border:'1px solid grey',padding:5}}>
                <div style={{display: 'flex',flexDirection:'column',}}>
                  <div style={{textAlign:'left',fontSize:'20px',fontWeight:'bold'}}>{comment.name}</div>
                  <div style={{marginLeft:5,color:'grey',textAlign: 'left'}}>{comment.email}</div>
                  <div style={{textAlign: 'left',marginLeft:10}}>{comment.body}</div>
                </div>
              </div>
                )
              }
              </>
                }
                
              </div>
            </div>

          </div>
          </>
        }
    </div>
  )
}

export default Post