"use client";
import React, {useState} from "react";

interface SubmissionData {
    title: string;
    description: string;
    url: string;
}

const SubmissionForm = () => {
    const [data, setData] = useState<SubmissionData>({title: "", description: "", url: ""});
    const [submitted, setSubmitted] = useState(false)
    const [open, setOpen] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch("/api/add-submission", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data}),
        });

        if (response.ok) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
            }, 3000);

            setData({title: "", description: "", url: ""});
        } else {
            alert("Failed to add title");
        }
    };
    return (
        <>
            {!open ? <button onClick={() => setOpen(true)}>Add Radio</button> :
                (<>
                        <button onClick={() => setOpen(false)}>Close</button>
                        {submitted ? <div>Thanks for your Submission</div> : <p>Neues Radio hinzufügen:</p>}
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData({...data, title: e.target.value})}
                                />
                            </label>
                            <br/>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData({...data, description: e.target.value})}
                                />
                            </label>
                            <br/>
                            <label>
                                URL:
                                <input
                                    type="text"
                                    name="url"
                                    value={data.url}
                                    onChange={(e) => setData({...data, url: e.target.value})}
                                />
                            </label>
                            <br/>
                            <input type="submit" value="Submit"/>
                        </form>
                    </>
                )}
        </>
    )
};

export default SubmissionForm;