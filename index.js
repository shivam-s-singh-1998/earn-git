import express from "express";
import redis from "./src/utils/redisClient.js";
import connectDb from "./src/db/coneectionDb.js";
import userRoute from "./src/routes/user.route.js";
import scheduleRoute from "./src/routes/schedule.route.js"
// Bull Board
import bodyParser from "body-parser";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { emailQueue, reportQueue, smsQueue } from "./src/utils/queue.js";
const app = express();

// Middleware
// app.use(express.json());
app.use(bodyParser.json());
// Routes
app.get("/test", async (req, res) => {
    try {
        await redis.set("msg", "Hello from redis!!");
        const msg = await redis.get("msg");
        console.log(msg);
        res.send(msg);
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Redis error");
    }
});


// ====================

app.use("/api", scheduleRoute);

// Setup Bull Board UI
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
    queues: [
    new BullMQAdapter(emailQueue),
    new BullMQAdapter(smsQueue),
    new BullMQAdapter(reportQueue),
    ],
    serverAdapter: serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

// ====================





// Mount user routes at /users
app.use("/users", userRoute);

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDb();
        console.log("✅ Database connected successfully");

        app.listen(5000, () => {
            console.log("🚀 Server is running on port 5000");
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();


// import express from "express";
// import redis from "./src/utils/redisClient.js";
// import connectDb from "./src/db/coneectionDb.js";
// import userRoute from "./src/routes/user.route.js";

// const app = express();
// // mongodb+srv://shivams:JhW1EOe6LbPIlgUo@autorizz.f4ektmj.mongodb.net/autorizz

// app.get("/test", async(req, res)=>{
//     await redis.set("msg", "Hello from redis!!");
//     const msg = await redis.get("msg");
//     console.log(msg);
//     res.send(msg);
// })
// app.get("/users", userRoute)

// connectDb();
// app.listen(5000,()=>{
//     console.log("Server is running on port 5000");
// })