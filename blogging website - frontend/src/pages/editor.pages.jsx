import { useContext,useEffect,useState } from "react";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import React from "react";
import  {createContext } from "react";
import Loader from "../components/loader.component";
import axios from "axios";


const blogStructure ={
    title: '',
    banner: '',
    content:[],
    tag:[],
    des: '',
    author: { personal_info: { }}
}

export const EditorContext = createContext({});


const Editor =() => {

    let { blog_id }=useParams();


    const [ blog,setBlog ] = useState(blogStructure)
    const  [ editorState, setEditorState ] = useState("editor");
    const  [ textEditor, setTextEditor ] = useState( {isReady:false});
    const [ loading,setLoading ] = useState(true);

    let {userAuth : {access_token} } = useContext(UserContext)

    useEffect(()=>{
        if(!blog_id){
            return setLoading(false);
        }
        axios.post('http://localhost:3000/get-blog',{blog_id})
        .then(({data:{blog}})=>{
            setBlog(blog);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setBlog(null);
            setLoading(false);
        })

    },[blog_id])


    return(
        <EditorContext.Provider value={{blog,setBlog,editorState,setEditorState,textEditor, setTextEditor}} >
            {
                
                access_token === null ? <Navigate to="/signin" />
                : 
                loading ? <Loader />:
                editorState == "editor" ? <BlogEditor/> : <PublishForm/>
            }      
        </EditorContext.Provider>
    )
}
export default Editor; 