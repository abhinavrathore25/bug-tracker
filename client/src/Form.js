import React, { useEffect, useState } from 'react';

const Form = ({ lastItemId, addBug }) => {

    // State to Manage Controlled Data of Form
    const [formData, setFormData] = useState({
        id: 0,
        description: "Please give a description..!",
        module: "Frontend",
        technology: "ReactJs",
        platform: "Windows",
        severity: "Medium"
    });

    // Setting id of each bug to unique value
    const [nextItemId, setNextItemId] = useState(lastItemId + 1);

    useEffect(() => {
        setFormData(prev => {
            return {
                ...prev,
                id: nextItemId
            }
        })

        setNextItemId(nextItemId + 1);

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { description, module, technology, platform, severity } = formData;

    // Adding new bug when submit is clicked!
    const handleSubmit = (event) => {

        // Input validation through regex
        if(!handleNullDescription()){
            event.preventDefault(); 
            return;
        }

        addBug(formData);
        setFormData({
            id: nextItemId,
            description: "Please give a description..!",
            module: "Frontend",
            technology: "ReactJs",
            platform: "Windows",
            severity: "Medium"
        });

        setNextItemId(nextItemId + 1);
        event.preventDefault(); // Prevents page from reloading when Submit Button is Clicked
    }

    const handleNullDescription = () => {
        const desc = description;
        const element = document.getElementById("description");

        // eslint-disable-next-line
        let re = /^([\w])([\w\s\.!]+)$/; 

        if(re.test(desc)){
            element.style.border = "#4AF626 solid 1px";
            return true;
        }
        else{
            element.style.border = "red solid 2px";
        }

        return false;
    }

    // Handling all fields of form
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    return (
        <>
            <form>

                <div className="grid-container"> 

                    <div className="item">
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className="item">
                        <textarea
                            name="description"
                            id="description"
                            cols="30"
                            rows="5"
                            value={description}
                            onChange={(event) => {
                                onChangeHandler(event);
                            }} ></textarea>
                    </div>


                    <div className="item">
                        <label htmlFor="module">Module</label>
                    </div>

                    <div className="item">
                        <select
                            name="module"
                            id="module"
                            value={module}
                            onChange={(event) => {
                                onChangeHandler(event);
                            }} >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Testing">Testing</option>
                            <option value="Database">Database</option>
                        </select>
                    </div>

                    <div className="item">
                        <label htmlFor="technology">Technology</label>
                    </div>

                    <div className="item">
                        <select
                            size="3"
                            name="technology"
                            id="technology"
                            value={technology}
                            onChange={(event) => {
                                onChangeHandler(event);
                            }} >
                            <option value="ReactJs">ReactJs</option>
                            <option value="Angular">Angular</option>
                            <option value="Oracle10g">Oracle10g</option>
                            <option value="Spring">Spring</option>
                            <option value="NextJs">NextJs</option>
                            <option value="VeuJs">VeuJs</option>
                        </select>
                    </div>

                    <div className="item">
                        <label htmlFor="platform">Platform</label>
                    </div>

                    <div className="item">
                        <div className="div-label">
                            <input
                                type="radio"
                                value="Windows"
                                name="platform"
                                checked={platform === "Windows"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="windows">Windows</label>
                        </div>

                        <div className="div-label">
                            <input
                                type="radio"
                                value="Mac"
                                name="platform"
                                checked={platform === "Mac"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="mac">Mac</label>
                        </div>
                    </div>

                    <div className="item">
                        <label htmlFor="severity" value="Severity">Sevirity</label>
                    </div>

                    <div className="item">
                        <div className="div-label">
                            <input
                                name="severity"
                                type="checkbox"
                                value="High"
                                checked={severity === "High"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="high">High</label>
                        </div>
                        <div className="div-label">
                            <input
                                name="severity"
                                type="checkbox"
                                value="Medium"
                                checked={severity === "Medium"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="medium">Medium</label>
                        </div>
                        <div className="div-label">
                            <input
                                name="severity"
                                type="checkbox"
                                value="Low"
                                checked={severity === "Low"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="low">Low</label>
                        </div>
                    </div>

                    <div className="item item-button">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
            </form>
        </>
    )
}

export default Form;