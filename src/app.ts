import 'dotenv/config'
import fastify from "fastify"
import { crudUsers } from './routes/crud-users'
import { authentication } from './routes/authentication'
import { crudTasks } from './routes/crud-tasks'

const app = fastify()

app.register(crudUsers)
app.register(crudTasks)
app.register(authentication)

app.listen({
    port: 3333,
    host: '0.0.0.0'
}).then(() => {
    console.log("HTTP server running. 🔥")
})