
// backend/queue.js
import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(); // connect to Redis

// Create a named queue
export const emailQueue = new Queue("email-queue", { connection });

export const jobQueue = new Queue("future-job", { connection } )

export const smsQueue   = new Queue("sms-queue", { connection });
export const reportQueue = new Queue("report-queue", { connection });