module.exports =  fakeDataGenerator = () => {
    let fakeBugs = [];
    const module = ["Backend", "Frontend", "Testing"];
    const technology = ["ReactJs", "Angular", "Oracle10g", "Spring", "NextJs", "VeuJs"];
    const platform = ["Windows", "Mac"];
    const severity = ["High", "Medium", "Low"];

    for(let i=1; i < 123; i++){
        let newBug = 
        {
            id: i,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit Repellat saepe",
            module:"",
            technology: "",
            platform: "",
            severity: ""
        };

        newBug.module = module.at(Math.random() * 3);  
        newBug.technology = technology.at(Math.random() * 6);  
        newBug.platform = platform.at(Math.random() * 2);  
        newBug.severity = severity.at(Math.random() * 3);  
        
        fakeBugs.push(newBug);
    }

    return fakeBugs;
}
