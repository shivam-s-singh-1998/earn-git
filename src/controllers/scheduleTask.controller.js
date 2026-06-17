import { emailQueue,  smsQueue } from "../utils/queue.js";

export const scheduleTask =  async (req, res) => {
    const { email, name } = req.body;
  
    // 👉 Add job to queue with options
    await emailQueue.add(
      "send-welcome-email",
      { email, name },
      {
        delay: 10_000, // Delay job for 10 seconds (e.g. 10 minutes = 600_000)
        attempts: 3,   // Retry up to 3 times if job fails
        backoff: {
          type: "exponential", // wait longer after each retry
          delay: 5000
        },
        removeOnComplete: true, // Auto-remove successful jobs
        removeOnFail: false     // Keep failed jobs for debugging
      }
    );

      await smsQueue.add("send-welcome-sms", { email, name, number:"34567545" });
    res.json({ message: "User registered! Email will be sent in background." });
  }