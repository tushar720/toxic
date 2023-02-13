import {useState} from 'react'
import { useRouter } from 'next/router'
const {google} = require('googleapis')
const youtube = google.youtube('v3');
const Perspective = require('perspective-api-client')


const perspective = new Perspective({apiKey: 'AIzaSyDccrw78ligfTPFik6U5XLkB4lHhKIeuwQ'});

export default function Home({comments}) {
const router = useRouter();
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');   
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  
  
 
  async function getToxicity(comment) {
    for(let i =0 ; i<comment.length;i++){
      try {
        const result = await perspective.analyze(comment[i]);  
        setData((arr)=>[...arr,{'Comment':comment[i],'Toxicity':JSON.stringify(result.attributeScores.TOXICITY.summaryScore.value, null, 2)}])     
      } catch (error) {
        
      }     
    
                }
              }
const clickHandler=()=>{
  router.push(`/${inputValue.split('').reverse().join('').substring(0,11).split('').reverse().join('')}`);
  console.log("calling")
    console.log(comments);
  getToxicity(comments);
  setTimeout(()=>setCommentsLoaded(true),5000)
  
  setTimeout(()=>setCommentsLoaded(false),9000)
}

  return (
   <div className="container">
    <div className="input-wrapper">
    <input type="text" className='input' placeholder='Paste youtube video link' onChange={(e)=>setInputValue(e.target.value)} />
    <button onClick={clickHandler}>Fetch</button>
    </div>

    <div className="main-container">
    <div className='comments-loaded'>{commentsLoaded?"Comments are Loaded ! Please Click Again to Fetch Toxicity":''}</div>
 {data.map((value,idx)=>{
  return(
   <div key={idx}>
   Comment:  {value['Comment']}
     <br/>
   Toxicity: {value['Toxicity']}
     <br/>
     <br/>
   </div>
  )
  })}

    </div>


  
   </div>
  )
}

export async function getServerSideProps(context) {
  let comments=[]; 
  
  
    await youtube.commentThreads.list({
        key:'AIzaSyC8w8dYdymoOCwkpDPOmo7IWjRKRDqpdEQ',
    "part": [
    "snippet"
    ],
    "maxResults": 100,
    "videoId":context.query.id})
          .then(
          (response)=> {
            const {data} = response;
            
    for(let i=0;i<data.items.length;i++)
    {  
    comments.push(data.items[i].snippet.topLevelComment.snippet['textOriginal'])
    }
    
    
                },
                function(err) {
                   console.error("Execute error", err); 
                  });

              return {
                props: {comments, 
                  } // will be passed to the page component as props
                  
              }               
}