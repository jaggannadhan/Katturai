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
                "buy_me_something": [
                    "Protein",
                    "https://drive.google.com/file/d/1seKRvVE7be5WAl6vcZBjZI8jvonFnmPB/view?usp=sharing"
                ],
                "description": "From algorithms to user interfaces, I engineer robust software ecosystems that elevate user experiences and exceed expectations.",
                "greetings": "Ola, It's Me",
                "last_updated": "Sun, 11 Aug 2024 00:28:56 GMT",
                "picture": "https://storage.googleapis.com/jegsirox/profilePic/myProfileYlw.png",
                "recent_work": [
                    {
                        "desc": "A simple portfolio website",
                        "images": [
                            "https://static-cse.canva.com/blob/1100617/create_portfolio_lead.fdac0721.jpg"
                        ],
                        "link": "",
                        "title": "Raconteur"
                    },
                    {
                        "desc": "Real estate invetments on the go!",
                        "images": [
                            "https://raw.githubusercontent.com/jaggannadhan/FletchHomes/main/images/banner1.jpeg"
                        ],
                        "link": "https://hopeful-flame-420906.uc.r.appspot.com/",
                        "title": "Fletch Homes"
                    },
                    {
                        "desc": "Developer friendly & secure documentations",
                        "images": [
                            "https://na.rdcpix.com/f6aab73cb67fe985808b67b0456a7ee5w-c4139114723rd-w832_h468_r4_q80.webp"
                        ],
                        "link": "https://hopeful-flame-420906.uc.r.appspot.com/",
                        "title": "Dev Docs"
                    },
                    {
                        "desc": "A fact extraction API using GPT-4",
                        "images": [
                            "https://a.storyblok.com/f/139616/1200x800/9fb0f91e0e/information-extraction-demystified.webp"
                        ],
                        "link": "https://hopeful-flame-420906.uc.r.appspot.com/",
                        "title": "Extract"
                    }
                ],
                "resume": "https://drive.google.com/file/d/1unqkbr1GhRruoo3sk78Y8ackuQzleUXD/view?usp=sharing",
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
                            },
                            {
                                "name": "Google Cloud Platform",
                                "subSkills": [
                                    "AppEngine",
                                    "ComputeEngine"
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Testing",
                        "skills": [
                            {
                                "name": "Jest",
                                "subSkills": []
                            },
                            {
                                "name": "React Testing Library",
                                "subSkills": []
                            },
                            {
                                "name": "PyTest",
                                "subSkills": []
                            },
                            {
                                "name": "UnitTest",
                                "subSkills": []
                            }
                        ]
                    },
                    {
                        "name": "AI / ML",
                        "skills": [
                            {
                                "name": "CNN's",
                                "subSkills": []
                            },
                            {
                                "name": "Conversational AI",
                                "subSkills": [
                                    "OpenAI"
                                ]
                            },
                            {
                                "name": "Frameworks",
                                "subSkills": [
                                    "TensorFlow",
                                    "PyTorch"
                                ]
                            }
                        ]
                    }
                ],
                "titles": [
                    "Software Engineer",
                    " Blogger",
                    " Martial Artist"
                ],
                "theme": "Tiled",
                "form_submit": ["jegsirox@gmail.com", "33967117b07ae3646ed5b48f962710bf"]
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
                "address": "Boston",
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

export const uploadMultipleFiles = async(formData) => {
    try {
        const response = await fetch("./uploadMultipleFiles", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("uploadMultipleFiles: ", error);
        return {}
    }
}

export const getAPIKEYFormSubmit = async(email) => {
    try {
        const response = await fetch(`https://formsubmit.co/api/get-apikey/${email}`, {
            method: "GET"
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("uploadMultipleFiles: ", error);
        return null;
    }
}

export const sendEmailFormSubmit = async(email, formData) => {
    try {
        const response = await fetch(`https://formsubmit.co/${email}`, {
            method: "POST",
            body: formData
        });

        const data = await response.text();
        return data;
    } catch(error) {
        console.error("uploadMultipleFiles: ", error);
        return null;
    }
}
