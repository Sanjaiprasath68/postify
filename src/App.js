import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import {format} from 'date-fns';
import Footer from './Footer';
import About from './About';
import Missing from './Missing';
import {Routes, Route} from 'react-router-dom'
import PostPage from './PostPage';

function App() {
  const [posts,setPosts] = useState([
    {
      id:1,
      title:"My First Post",
      datetime:"jan 01/01/2024",
      body:"Today i developed Todo list App "
    },
    {
      id:2,
      title:"My second Post",
      datetime:"Jan 08/01/2024",
      body:"Today i developed Meme Generator"
    },
    {
      id:3,
      title:"My third Post",
      datetime:"Feb 01/02/2024",
      body:"Now I Completed My Portfolio"
    },
  ])
  const [search,setSearch] = useState('')
  const [searchResults,setSearchResults] = useState ([])
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts,search]
  )

  const handleSubmit = (e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {id, title: postTitle, datetime, body: postBody};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
  }
  const handleDelete = (id)=>{
    const postList = posts.filter(post=>post.id !==id)
    setPosts(postList)
  }
  return (
    <div className="App">
      <Header title={"Postify"}/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
      <Route path="/" element={<Home posts = 
      {searchResults} />}/>
      <Route path="post">
        <Route index element={ <NewPost 
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
        />}/>
        <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path="about" element={<About />}/>
        <Route path="*" element={<Missing />}/>
      </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
