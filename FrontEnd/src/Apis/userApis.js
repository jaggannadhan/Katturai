export const getCurrentUser = async () => {
    try {
        const response = await fetch("./getCurrentUser", {
            method: "GET"
        });

        const data = await response.json();
        if(data.success)
            return data.current_user;
    
        return null;
    } catch(error) {
        console.error("getCurrentUser: ", error);
        return {
            user_info: {
                'last_login': "21-July-2024", 
                'email': 'jegsirox@gmail.com', 
                'name': 'Jegsi Rox', 'first_name': 'Jegsi', 'last_name': 'Rox', 
                'phone_number': '', 'address': '', 
                'user_uid': 'jaggannadhan', 
                'picture': 'https://lh3.googleusercontent.com/a/ACg8ocLCqPHO3udwhxqXQAIsA_UhmR3VRJ_p7JdR8gFWNhjaFrhIJG2E=s96-c'
            },
            profile_info: {

            },
            portfolio_info: {

            }
        }
    }
}

export const postUserDetails = async(params) => {
    try {
        const response = await fetch("./userDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("postUserDetails: ", error);
        return {}
    }
}