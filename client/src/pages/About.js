import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import {AiOutlineUserAdd,AiOutlineMail,AiOutlineAntDesign} from 'react-icons/ai'
import {FaMobileAlt} from 'react-icons/fa'
import {BsGenderAmbiguous} from 'react-icons/bs'
import axios from 'axios'
import {toast} from 'react-toastify'

const About = () => {

    const navigate = useNavigate()

    const [aboutData, setAboutData] = useState({       
        username : '',
        email : '',
        mobile : '',
        profession : '',
        gender : '',
        image : ''
    })

    const setData=(e)=>{
        const name = e.target.name;
        let value = null;

        if(e.target.type === "file"){
            value = e.target.files[0]
        }else{
            value = e.target.value
        }

        setAboutData({
            ...aboutData,
            [name] : value
        })
    }

     const updateData= async(e)=>{
        e.preventDefault()

        const myForm = new FormData()
        myForm.append('username',aboutData.username)
        myForm.append('email',aboutData.email)
        myForm.append('mobile',aboutData.mobile)       
        myForm.append('gender',aboutData.gender)       
        myForm.append('profession',aboutData.profession)
        myForm.append('image',aboutData.image)

         const token = Cookies.get("jwtToken")

         try{
            const response = await axios.put("http://localhost:5000/api/user/edit-user",myForm,{
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            })
            const resObj = await response.data
            console.log(resObj)

            if(resObj.sucess == true){
                toast.success(resObj.msg, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
    
            }
    
         }catch(err){
            //const resObj = err.message
            const resObj = err.response.data
            if(resObj.sucess == false){
               // console.log("err-",resObj.msg)
                toast.error(resObj.msg, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined, 
                    theme: "light",
                    });
            }
            
         }


     }
    const callAboutPage = async () => {

        //Note - in server httpOnly must be false while setting cookie
        const token = Cookies.get('jwtToken')
        //console.log(token);

        try {
            const res = await fetch("http://localhost:5000/api/about/", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                credentials: "include"
            })

            const data = await res.json()

            if (data.sucess == false) {
                //console.log(data)
                navigate("/login")
            } else {
                //console.log(data.data)
                const {username,email,mobile,gender,profession,image} = data.data
                setAboutData({
                    username,
                    email,
                    mobile,
                    gender,
                    profession,
                    image
                })
            }

        } catch (err) {
            console.log(err);
            navigate("/login")
        }

    }

    useEffect(() => {
        callAboutPage()
    }, [])
      

    return (<>
        <div className="container border border-1 mt-2 p-3">

            <div className="row mt-3">
                <div className="col-4"></div>
                <div className="col-4">
                <form method="put" onSubmit={updateData}>                
                {
                    aboutData ?

                        <div>                    
                            <div className="text-center">
                            <img className="rounded-5" src={`http://localhost:5000/userImages/${aboutData.image}`} alt="user image" /><br />
                            <input className="form-control mt-2 mb-2" type="file" name="image" onChange={setData}/>
                            </div>
                            
                            <div className="mb-2">
                                <h2><AiOutlineUserAdd/></h2>
                                <input className="form-control" type="text" name="username" onChange={setData} value={aboutData.username}/>
                            </div>

                            <div>
                            <h2><AiOutlineMail/></h2>
                                <input className="form-control" type="text" name="email" onChange={setData} value={aboutData.email}/>
                            </div>
                            
                            <div className="mt-2">
                                <h4><FaMobileAlt/></h4>
                                <input className="form-control" type="text" name="mobile" onChange={setData} value={aboutData.mobile}/>
                            </div>

                            <div className="mt-2">    
                                <h5><BsGenderAmbiguous/></h5>
                                {/* <input className="form-control" type="text" name="gender" onChange={setData} value={aboutData.gender}/> */}
                                Male : <input type="radio" name="gender" onChange={setData} value="male" checked={aboutData.gender === "male"}/>
                                {"   "}
                                Female : <input type="radio" name="gender" onChange={setData} value="female" checked={aboutData.gender === "female"}/>
                            </div>
                            
                            <div className="mt-2">
                                <h5><AiOutlineAntDesign /></h5>
                                <select className="form-control" name="profession" onChange={setData} value={aboutData.profession}>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="other">Other Something</option>
                                </select>
                                {/* <input className="form-control" type="text" name="profession" onChange={setData} value={aboutData.profession}/> */}
                            </div>

                            <div className="mt-2 gap-2 mt-3">
                                <button className="btn btn-secondary me-2" type="submit">Update Me</button>
                                
                            </div>

                        </div> : 'No Data Found'
                }

            </form>
                </div>
                <div className="col-4"></div>
            </div>

        </div>
    </>)
}

export default About;