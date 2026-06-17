
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import categoryRouter from './routes/category.routes.js'
import foodRouter from './routes/food.routes.js'
import orderRouter from './routes/order.routes.js'
import customerRouter from "./routes/customer.routes.js";
import reportRouter from "./routes/report.routes.js"
import dashboardRouter from './routes/dashboard.routes.js';
import settingsRouter from "./routes/settings.routes.js";
import blogRouter from './routes/blog.routes.js' 

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/foods", foodRouter)
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/reports", reportRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/settings", settingsRouter);
app.use('/api/v1/blogs', blogRouter)


export { app }
