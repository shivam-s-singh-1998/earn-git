// backend/worker.js
import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
    maxRetriesPerRequest:null
});

const worker = new Worker(
  "email-queue",
  async job => {
    if (job.name === "send-welcome-email") {
      console.log(`📧 Sending email to ${job.name}...`);

      // Simulate sending email (could integrate Nodemailer here)
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (Math.random() < 0.3) { // 30% chance to simulate failure
        throw new Error("SMTP connection failed!");
      }

      console.log(`✅ Email sent successfully to ${job.data.email}`);
    }
  },
  { connection }
);

worker.on("completed", job => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed: ${err.message}`);
});
