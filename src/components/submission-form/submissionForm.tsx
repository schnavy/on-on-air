"use client";
import React, {useEffect, useState} from "react";

interface SubmissionData {
    title: string;
    description: string;
    url: string;
}

const SubmissionForm = () => {
    const [data, setData] = useState<SubmissionData>({title: "", description: "", url: ""});

    useEffect(() => {
        console.log("Form Data:", data);
    }, [data]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log("Submitting form data:", JSON.stringify(data));

        const response = await fetch("/api/add-submission", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data}),
        });

        console.log("Response:", response);
        if (response.ok) {
            alert("Title added successfully!");
            setData({title: "", description: "", url: ""});
        } else {
            alert("Failed to add title");
        }
    };
    return (
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
    );
};

export default SubmissionForm;