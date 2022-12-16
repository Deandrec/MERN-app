import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from morgan;
import path from "path";
import { fileURLToPath } from "url";

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