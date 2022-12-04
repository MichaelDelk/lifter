const http = require('http');

const requestListener = (req, res)=>{
console.log("Request is incoming...");
	
const responseData = {
	message:"Hello, GFG Learner",
	articleData:{
		articleName: "How to send JSON response from NodeJS",
		category:"NodeJS",
		status: "published"
	},
	endingMessage:"Visit Geeksforgeeks.org for more"
}

const jsonContent = JSON.stringify(responseData);
res.end(jsonContent);
};

const server = http.createServer(requestListener);

server.listen(3000,'localhost', function(error){
    if(!error) {
        console.info("Server is listening at port 3000.");
    } else {
        console.info("Error starting server: " + error);
    }
});
