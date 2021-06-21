import React,{useState,useEffect} from 'react'
import { useParams,useHistory } from 'react-router'

const ProductDetail = () => {
    const[currentUser,setCurrentUser] = useState(null)
    const {id} = useParams()
    const history = useHistory()

    useEffect (() => {
            const ProductDetail = id.find(u => u.id === +id)

            if(ProductDetail){
                setCurrentUser(ProductDetail)
            }else {
                setCurrentUser(null)
                history.push("/not-found")
            }
    },[id,history])

    return <div>
     {currentUser && <div>{currentUser.name}'s Dashboard</div>}
    </div>
  }
  

export default ProductDetail