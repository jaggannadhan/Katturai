import React, { useState, useEffect } from "react";

const HomeSettings = (props) => {


    useEffect(() => {

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
                <form onSubmit={handleSubmit}>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Who are you?"
                                className="formbold-form-input"
                            />

                            <label htmlFor="title" className="formbold-form-label">
                                Title
                            </label>
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <input
                                type="text"
                                name="tagline"
                                id="tagline"
                                placeholder="Let's do it"
                                className="formbold-form-input"
                            />
                            <label htmlFor="tagline" className="formbold-form-label"> Tagline </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="subtext"
                                id="subtext"
                                placeholder="always and forever"
                                className="formbold-form-input"
                            />
                            <label htmlFor="subtext" className="formbold-form-label"> Subtext </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="gitlink"
                                id="gitlink"
                                placeholder="Enter your GitHub link"
                                className="formbold-form-input"
                            />

                            <label htmlFor="gitlink" className="formbold-form-label">
                                GitHub
                            </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="youtubelink"
                                id="youtubelink"
                                placeholder="Add your YouTube Channel"
                                className="formbold-form-input"
                            />

                            <label htmlFor="youtubelink" className="formbold-form-label">
                                YouTube
                            </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="linkedinlink"
                                id="linkedinlink"
                                placeholder="Enter your LinkedIn URL"
                                className="formbold-form-input"
                            />

                            <label htmlFor="linkedinlink" className="formbold-form-label">
                                LinkedIn
                            </label>
                        </div>
                    </div>

                    <div className="formbold-mb-3">
                        <div>
                            <input
                                type="text"
                                name="iglink"
                                id="iglink"
                                placeholder="Add your Instagram handle"
                                className="formbold-form-input"
                            />

                            <label htmlFor="iglink" className="formbold-form-label">
                                Instagram
                            </label>
                        </div>
                    </div>

                    <div className="formbold-textarea">
                        <textarea
                            rows="6"
                            name="epigraph"
                            id="epigraph"
                            placeholder="An Epigraph, An Adage or just Something Funny"
                            className="formbold-form-input"
                        ></textarea>
                        <label htmlFor="epigraph" className="formbold-form-label"> Share Your Thoughts </label>
                    </div>

                    <button className="formbold-btn">
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    )
}

export default HomeSettings;