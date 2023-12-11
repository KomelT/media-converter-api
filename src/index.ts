console.log(`
 __  __          _ _          _____                          _                       _____ _____ 
|  \\/  |        | (_)        / ____|                        | |                /\\   |  __ \\_   _|
| \\  / | ___  __| |_  __ _  | |     ___  _ ____   _____ _ __| |_ ___ _ __     /  \\  | |__) || |  
| |\\/| |/ _ \\/ _' | |/ _' | | |    / _ \\| '_ \\ \\ / / _ \\ '__| __/ _ \\ '__|   / /\\ \\ |  ___/ | |  
| |  | |  __/ (_| | | (_| | | |___| (_) | | | \\ V /  __/ |  | ||  __/ |     / ____ \\| |    _| |_ 
|_|  |_|\\___|\\__,_|_|\\__,_|  \\_____\\___/|_| |_|\\_/ \\___|_|   \\__\\___|_|    /_/    \\_\\_|   |_____|
`)

import "./exithandler.js"
import "./settings.js"
import "./mongodb.js"
import "./http.js"
import "./express.js"

import "./routes/hello.get.js"
import "./routes/photo.post.js"
import "./routes/404.js"
