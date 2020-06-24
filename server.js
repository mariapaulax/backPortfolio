const express = require ('express')
const nunjucks = require('nunjucks')


const server = express ()

const  videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true   
})

server.get("/", function(req, res){

        const about = {

            avatar_url: "https://avatars0.githubusercontent.com/u/54690354?s=460&u=df536fe56ac305f5005aa0b948b372b80a988748&v=4",
            name: "Maria Paula ",
            role: "Cursando Técnico em Informática na Rede Ulbra e colaboradora da Rede São Francisco",
            description: 'Atua na área da informática e futuramente possível designer/publicitária. Contribuinte na plataforma criadora de'+ 
            'conteúdo <a href="https://youtube.com.br" target="_blank">Youtube</a>',
            links: [

                {name:"Github", url:"https://github.com/mariapaulax"},
                {name:"Twitter", url:"https://www.twitter.com/maria_paulaxz"},
                {name:"Instagram", url:"https://www.instagram.com/mariapaulaxz"}
            ]


        }


    return res.render("about", {about})
})


server.get("/experiencias", function(req, res){


    return res.render("experiencias", {items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){

        return video.id == id
    
    })

    if(!video){
        return res.send("Video not found!")
    }

    return res.render("video", {item: video})


})


server.listen(5000, function(){

    console.log("server is running")
})
