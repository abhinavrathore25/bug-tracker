import React, { useEffect, useState } from 'react';

const Form = ({lastItemId, addBug}) => {

    const [formData, setFormData] = useState({
        id: 0,
        description: "Please give a description..!",
        module: "Frontend",
        technology: "ReactJs",
        platform: "Windows",
        severity: "Medium"
    });

    const [nextItemId, setNextItemId] = useState(lastItemId + 1);
    
    useEffect(() => {
        setFormData(prev => {
            return {
                ...prev,
                id: nextItemId
            }
        })

        setNextItemId(nextItemId + 1);

    }, []);

    const { description, module, technology, platform, severity } = formData;

    const handleSubmit = (event) => {
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
        event.preventDefault();
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
                // id: lastItemId + 1
            }
        });
    }

    return (
        <>
            <form>
                
                {console.log(formData.id)}
                <div className="grid-container">

                    <div className="item">
                        <label htmlFor="description">Description</label>
                    </div>

                    <div className="item">
                        <textarea name="description" id="description" cols="30" rows="5" value={description}
                            onChange={(event) => {
                                onChangeHandler(event);
                            }} ></textarea>
                    </div>


                    <div className="item">
                        <label htmlFor="module">Module</label>
                    </div>

                    <div className="item">
                        <select name="module" id="module" value={module}
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
                        <select size="3" name="technology" id="technology" value={technology}
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
                            <input type="radio" value="Windows" name="platform" checked={platform === "Windows"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="windows">Windows</label>
                        </div>

                        <div className="div-label">
                            <input type="radio" value="Mac" name="platform" checked={platform === "Mac"}
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
                            <input name="severity" type="checkbox" value="High" checked={severity === "High"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="high">High</label>
                        </div>
                        <div className="div-label">
                            <input name="severity" type="checkbox" value="Medium" checked={severity === "Medium"}
                                onChange={(event) => {
                                    onChangeHandler(event);
                                }} />
                            <label htmlFor="medium">Medium</label>
                        </div>
                        <div className="div-label">
                            <input name="severity" type="checkbox" value="Low" checked={severity === "Low"}
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