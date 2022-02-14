import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import Post from './Post';
import Userposts from './Userposts';

const container={
    height: 'auto',
    maxWidth: 800,
    margin: '80px auto 10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
}
const usercontainer={
    height:200,
    width: 200,
    margin:5,
    padding:5,
    backgroundColor: '#8ae0ff',
    border: 'none',
    display: 'flex',
    justifyContent:'space-around',
    alignItems: 'center',
    borderRadius: '15px',
    color: 'black',
    flexDirection: 'column',
}

function Main() {
  // State to save user data
    const [users, setUsers] = useState();
    // State to enable/disable loading...
    const [isloading, setIsloading] = useState(true);
    // State to store the post from the user
    const [postdetails, setpostdetails] = useState({
      // Stores the page that is to be displayed
        page:'home',
        id:undefined,
    })

    // Function to collect user data
    const getUserData = async () => {
      // Enable loading state
      setIsloading(true);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then((response) => response.json());
  
    // update the user data state
    setUsers(response);
    // Disable loading state
    setIsloading(false);
    };

    useEffect(() => {
      getUserData();
    } ,[]);

    // Function to collect user posts
    const getUserPosts = async (e) => {
      // Enable loading state
      setIsloading(true);
        let key=e
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${key}`
        ).then((response)=>response.json());
        let posts=response;
        // Update post state
        setpostdetails({
          posts,
          page:'userposts'
        });
        // Disable loading state
        setIsloading(false);
    }
    // Check if the users are available and if the page is set to home show the Home page
    if(users!==404 && postdetails.page==='home'){
        return (
            <div style={container}>
              {/* Checking the Loading state */}
                {isloading?<Loading/>:<>
                  {users &&
                  // Show the posts of the user by calling the getUserPosts() with the userId parameter
                users.map((user) => 
                  <button key={user.id} style={usercontainer} onClick={(e)=>{getUserPosts(user.id)}}>
                      <div style={{display: 'flex',flexDirection: 'column',width:80,height:80,backgroundColor:'white',borderRadius:40,color:'black',alignItems: 'center',justifyContent: 'center'}}>
                        <div style={{fontSize:'30px'}}>
                          {user.name.slice(0,1)}
                        </div>
                      </div>
                    <div>
                      <div style={{fontSize:'15px'}}>
                        Name : <span>{user.name}</span> 
                      </div>
                      <div style={{fontSize:'13px'}}> 
                        Company : <span> {user.company.name}</span>
                      </div>
                    </div>
                  </button>
                )}
                  </>}
            </div>
          )
    }
    // Check the page to be displayed and passing the state for storing post details
    else if(postdetails.page ==='userposts'){
      return(
        <div>
          <Userposts postdetails={postdetails} setpostdetails={setpostdetails}/>
        </div>
      )
    }
    // Check the page to be displayed and passing the state for storing post details and the loading state
    else if(postdetails.page ==='post'){
      return(
        <div>
          <Post postdetails={postdetails} setpostdetails={setpostdetails} isloading={isloading} setIsloading={setIsloading} />
        </div>
      )
    }
  
}

export default Main