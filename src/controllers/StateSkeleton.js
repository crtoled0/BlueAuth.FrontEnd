class StateSkeleton {
   
}

StateSkeleton.skel = () => {
    return {
           user: {  userid: "",
                    password:"",
                    email:"",
                    firstName:"",
                    lastName:""} 
        };
};

export default StateSkeleton.skel();