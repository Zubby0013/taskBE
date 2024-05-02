import { Document, Schema, model } from "mongoose";

export interface iProps {
    title: string;
    progress: boolean;
    done: boolean;
}

interface iData {
    todo: iProps[];
    progress: iProps[];
    done: iProps[];
}

interface iPropsData extends iProps, Document { }

const TodoModel = new Schema<iPropsData>(
    {
        title: {
            type: String,
        },
        progress: {
            default: false,
            type: Boolean,
        },
        done: {
            default: false,
            type: Boolean,
        },
    },
    { timestamps: true }
);

// const TodoModel = new Schema<iPropsData>(
//   {
//     todo: {
//       type: [],
//     },
//     progress: {
//       type: [],
//     },
//     done: {
//       type: [],
//     },
//   },
//   { timestamps: true }
// );

export default model<iPropsData>("todos", TodoModel);
