import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import {register} from "./contollers/auth.js";
import {createPost} from "./contollers/posts.js";
import { verifyToken } from "./middlewear/auth.js";
import User from "./models/User.js";
import Post from "./models/Posts.js";
import {users, posts} from "./data/index.js"

/*CONFIGURATIONS*/ 
// to use modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// use .env files
dotenv.config();
// init express
const app = express();
// MIDDLEWEAR: used between request
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
// stores things like images locally, in normal production, files should be stored in cloud
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
// from github multer repo
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'public/assets' );
    },
    filename : function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({storage})

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register); 
app.post("/post", verifyToken, upload.single("picture"), createPost); // to create post

/* ROUTES  */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/post", postRoutes); // to get post

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts)
}).catch((error)=> console.log(`${error} did not connect`))


