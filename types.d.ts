import { Connection } from "mongoose";

declare global{
    var mongoose:{
        conn :mongoose.Connection | null;
        promise : Promise <Connection> | null;
    }
}
export {};