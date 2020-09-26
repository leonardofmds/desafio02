const express = require("express");
//const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid'); 

const app = express();

app.use(express.json());
//app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const {title, url, techs} = request.body;

    const repository = 
    {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
    }

    repositories.push(repository);

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const {id} = request.params;
    const {title, url, techs} = request.body;

    const repoIndex = repositories.findIndex(repository => repository.id == id);

    if(repoIndex<0){
      return response.status(400).json({error: "Repository ID not found"});
    }      

    const repository = repositories[repoIndex];

    repository.title = title;
    repository.url = url;
    repository.techs = techs;    

    return response.status(200).json(repository);

});

app.delete("/repositories/:id", (request, response) => {
    const {id} = request.params;

    const repoIndex = repositories.findIndex(repository => repository.id == id);

    if(repoIndex<0){
      return response.status(400).json({error: "Repository ID not found"});
    }   

    repositories.splice(repoIndex,1);
    
    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const {id} = request.params;

    const repoIndex = repositories.findIndex(repository => repository.id == id)

    if(repoIndex<0){
      return response.status(400).json({error: "Repository ID not found"});
    } 

    repositories[repoIndex].likes +=1;

    return response.status(200).json(repositories[repoIndex]);
});

module.exports = app;
