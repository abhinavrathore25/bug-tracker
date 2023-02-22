import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Form = ({ addBug }) => {
    
    // State to Manage Controlled Data of Form
    const [formData, setFormData] = useState({
        id: 0,
        description: "",
        module: "Frontend",
        technology: "ReactJs",
        platform: "Windows",
        severity: "Medium"
    });

    const { description, module, technology, platform, severity } = formData;
    const {theme} = useSelector(state => state);

    // Adding new bug when submit is clicked!
    const handleSubmit = (event) => {

        // Input validation through regex
        if(!handleNullDescription()){
            event.preventDefault(); 
            return;
        }

        addBug(formData);
        setFormData({
            // id: nextItemId,
            description: "",
            module: "Frontend",
            technology: "ReactJs",
            platform: "Windows",
            severity: "Medium"
        });

        // setNextItemId(nextItemId + 1);
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

        if(name === "description")
            handleNullDescription();

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    return (
        <>
            <form className={`form-${theme}`}>
                <div className="grid-container"> 

                    <div className="item">
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className="item">
                        <textarea
                            name="description"
                            id="description"
                            className="form-control"
                            cols="30"
                            rows="5"
                            value={description}
                            placeholder="Please give a description..!"
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
                            className="form-select"
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
                            className="form-select"
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
                        <div className="div-label form-check">
                            <input
                                type="radio"
                                value="Windows"
                                name="platform"
                                className="form-check-input"
                                checked={platform === "Windows"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="windows">Windows</label>
                        </div>

                        <div className="div-label form-check">
                            <input
                                type="radio"
                                value="Mac"
                                name="platform"
                                className="form-check-input"
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
                        <div className="div-label form-check">
                            <input
                                name="severity"
                                type="checkbox"
                                value="High"
                                className="form-check-input"
                                checked={severity === "High"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="high">High</label>
                        </div>
                        <div className="div-label form-check">
                            <input
                                name="severity"
                                type="checkbox"
                                value="Medium"
                                className="form-check-input"
                                checked={severity === "Medium"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="medium">Medium</label>
                        </div>
                        <div className="div-label form-check">
                            <input
                                name="severity"
                                type="checkbox"
                                value="Low"
                                className="form-check-input"
                                checked={severity === "Low"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="low">Low</label>
                        </div>
                    </div>

                    <div className="form-button">
                        <button onClick={handleSubmit} className="btn btn-secondary">SUBMIT</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Form;