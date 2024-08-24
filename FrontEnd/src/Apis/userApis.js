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


export const sendEmail = async({email, subject, message}) => {
    try {
        const response = await fetch(`./sendEmail`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                subject: subject,
                message: message
            })
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("sendEmail: ", error);
        return {success: false};
    }
}
