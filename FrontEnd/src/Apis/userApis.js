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
            "is_logged_in": true,
            "portfolio_info": {
                "description": "From algorithms to user interfaces, I engineer robust software ecosystems that elevate user experiences and exceed expectations.",
                "greetings": "Ola, It's Me",
                "last_updated": "Sat, 27 Jul 2024 23:19:58 GMT",
                "resume": "https://google.com",
                "titles": [
                    "Software Engineer",
                    " Blogger",
                    " Martial Artist"
                ],
                "skills": [
                    {
                        "name": "Frontend",
                        "skills": [
                            {
                                "name": "JavaScript",
                                "subSkills": [
                                    "React.js-Redux",
                                    "TypeScript"
                                ]
                            },
                            {
                                "name": "HTML",
                                "subSkills": []
                            },
                            {
                                "name": "CSS",
                                "subSkills": [
                                    "scss"
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Backend",
                        "skills": [
                            {
                                "name": "Python",
                                "subSkills": [
                                    "Flask",
                                    "Django"
                                ]
                            },
                            {
                                "name": "SQL",
                                "subSkills": [
                                    "MySQL"
                                ]
                            },
                            {
                                "name": "NoSQL",
                                "subSkills": [
                                    "MongoDB"
                                ]
                            }
                        ]
                    }
                ]
            },
            "profile_info": {
                "epigraph": "Happiness can be a state of mind when you realize there is no better time or way to live. \nOnly a strong body and a healthy mind can sustain the epiphany.  \nLive Fluid, Train Hard!",
                "github": "https://github.com/jaggannadhan/",
                "instagram": "https://www.instagram.com/jagg4n/",
                "last_updated": "Sat, 27 Jul 2024 19:13:51 GMT",
                "linkedin": "https://www.linkedin.com/in/jvenu94/",
                "subtext": "Tatakai",
                "tagline": "戦い",
                "title": "Software Engineer, MS Computer Science",
                "youtube": "https://www.youtube.com/@jegsirox3674"
            },
            "user_info": {
                "address": "1 South Point Drive",
                "email": "jegsirox@gmail.com",
                "first_name": "Jaggannadhan",
                "last_login": "Sat, 27 Jul 2024 18:26:09 GMT",
                "last_name": "Venugopal",
                "name": "Jaggannadhan Venugopal",
                "phone_number": "8622262405",
                "picture": "https://storage.googleapis.com/jegsirox/profilePic/myProfile.png",
                "user_uid": "jegsirox"
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

export const postProfileDetails = async(params) => {
    try {
        const response = await fetch("./profileDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("postProfileDetails: ", error);
        return {}
    }
}

export const postPortfolioDetails = async(params) => {
    try {
        const response = await fetch("./portfolioDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("postPortfolioDetails: ", error);
        return {}
    }
}

export const uploadProfilePic = async(formData) => {
    try {
        const response = await fetch("./uploadProfilePic", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("uploadProfilePic: ", error);
        return {}
    }
}