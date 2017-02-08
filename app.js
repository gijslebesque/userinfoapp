//require necessary libraries
const express 	= require('express')
const app 		= express()
const fs 		= require('fs')
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// set view directory and engine 
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

//route 1 render every user
app.get('/', (request, response) =>{
	//read users from json file.
	fs.readFile(__dirname + '/user.json', (err, data) => {
		if(err) {
			throw err
		}
		//parse the data from json
		let allUsers = JSON.parse(data)
		//render index.pug and send along all the users
		response.render('index', {allUsers: allUsers})

	})
})

//route 2 renders search form
app.get('/search', (request, response) => {
	response.render('search')
})

//route 3 renders results from search
app.post('/search', (request, response) =>  {
	let searchedName = request.body.searchedName

	fs.readFile(__dirname + '/user.json', (err, data) => {
			if(err) {
				throw err
			}
			//parse the data from json
			let allUsers = JSON.parse(data)

			for (var i = allUsers.length - 1; i >= 0; i--) {
			
				if(searchedName === allUsers[i].firstName || searchedName === allUsers[i].lastName) {
					response.render('searchResult', {foundUser: allUsers[i]})
				}
				
			}
	})
			//render index.pug and send along all the users

})


//server listening on poryt 8000
app.listen(8000, () => {
	console.log("server runnnninggg")
})