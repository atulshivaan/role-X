import express from "express"
import cors from "cors"
import session from "express-session";
import dotenv from "dotenv"
import db from "./config/database.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/products.route.js";
import authRouter from "./routes/auth.route.js";
import SequelizerStore from "connect-session-sequelize"
dotenv.config();

const app = express();

const sessionStore = SequelizerStore(session.Store);
const store = new sessionStore({
    db:db
});


(async()=>{
    await db.sync();
})();


//middleware
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173/"
}))
app.use(express.json());
app.use(session({
    secret:"atulshivaan",
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure:'auto'
    }
}))
//routes
app.use("/api/user",userRouter);
app.use("/api/product",productRouter)
app.use("/api/auth",authRouter)


store.sync();

app.get("/",(req,res)=>{
    res.send("hello there");
})
const port = 3030;
app.listen(port,(req,res)=>{
    console.log(`le bhai ${port} yha chal rha hai`);
    
})