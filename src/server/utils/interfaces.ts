import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import { UserDoc } from '../models';

export interface CustomRequest extends Request {
  user?: UserDoc;
  token?: string;
}

export type MiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type AsyncMiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type ModelAttribute = { [key: string]: unknown };

export interface Model<
  Attrs extends ModelAttribute,
  Doc extends mongoose.Document
> extends mongoose.Model<Doc> {
  build(attrs: Attrs): Doc;
}

export type Validator = ([input]: any) => boolean;

export type PropsAndValidators = {
  prop: string;
  validator?: Validator;
  message?: string;
}[];

export interface DuplicateKeyMongoError extends MongoError {
  keyValue: { [field: string]: string };
}
