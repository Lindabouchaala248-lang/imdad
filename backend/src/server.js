import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const app=express();
const port=process.env.PORT||4000;
const pool=process.env.DATABASE_URL?new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.NODE_ENV==='production'?{rejectUnauthorized:false}:false}):null;
app.use(helmet());
app.use(cors({origin:(process.env.FRONTEND_ORIGIN||'http://localhost:5173').split(',').map(s=>s.trim()),credentials:true}));
app.use(express.json({limit:'32kb'}));
app.get('/api/health',async(_req,res)=>{let database='not_configured';if(pool){try{await pool.query('SELECT 1');database='connected'}catch{database='unavailable'}}res.json({ok:true,service:'imdad-api',database,environment:process.env.NODE_ENV||'development'});});
const registerSchema=z.object({name:z.string().trim().min(2).max(80),email:z.string().email().max(254),password:z.string().min(10).max(100)});
const loginSchema=z.object({email:z.string().email(),password:z.string().min(1).max(100)});
function requireDb(res){if(!pool){res.status(503).json({error:'Database is not configured.'});return false}return true}
function signToken(user){if(!process.env.JWT_SECRET)throw new Error('JWT_SECRET is not configured');return jwt.sign({sub:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:'2h',issuer:'imdad-api',audience:'imdad-client'});}
app.post('/api/auth/register',async(req,res)=>{if(!requireDb(res))return;const parsed=registerSchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({error:'Please check the registration details.'});const {name,email,password}=parsed.data;try{const hash=await bcrypt.hash(password,12);const result=await pool.query('INSERT INTO users (name,email,password_hash) VALUES ($1,$2,$3) RETURNING id,name,email,created_at',[name,email.toLowerCase(),hash]);const user=result.rows[0];res.status(201).json({user,token:signToken(user)});}catch(error){if(error.code==='23505')return res.status(409).json({error:'An account with this email already exists.'});res.status(500).json({error:'Could not create account.'});}});
app.post('/api/auth/login',async(req,res)=>{if(!requireDb(res))return;const parsed=loginSchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({error:'Invalid email or password.'});try{const result=await pool.query('SELECT id,name,email,password_hash FROM users WHERE email=$1',[parsed.data.email.toLowerCase()]);const user=result.rows[0];if(!user||!(await bcrypt.compare(parsed.data.password,user.password_hash)))return res.status(401).json({error:'Invalid email or password.'});res.json({user:{id:user.id,name:user.name,email:user.email},token:signToken(user)});}catch{res.status(500).json({error:'Could not sign in.'});}});
app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({error:'Unexpected server error.'});});
app.listen(port,()=>console.log(`IMDAD API listening on ${port}`));
