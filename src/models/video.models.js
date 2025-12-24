import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
  {
    videoFile: {
      type: String,   // 'Type' → should be lowercase 'type'
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
     title: {
      type: String,
      required: true
    },

 zz    description: {
      type: String,
      required: true
    },
     duration: {
      type: String,
      required: true
    },
 views:{
    type: Number,
    default:0
 },
 ispublished:{
    type: Boolean,
    default: true
 },
owner: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true
}

  },

  {
    timestamps: true
  }
);
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema);  // Model names usually start with uppercase
