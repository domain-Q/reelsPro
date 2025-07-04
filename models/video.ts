import mongoose, { model, Schema, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;
export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  descrption: string;
  videoURL: string;
  thumbnailURL: string;
  controls?: boolean;
  transformation?: { height: number; width: number; quality?: number };
  createdAT:Date;
  updatedAt:Date;
}
const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    descrption: { type: String, required: true },
    videoURL: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);


const Video = models.Video || model<IVideo>("video", videoSchema );
export default Video