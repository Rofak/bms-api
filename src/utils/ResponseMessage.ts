import { HttpStatus } from '@nestjs/common';
import { Timestamp } from 'typeorm';

export class ResponseMessage<T> {
  private _message:string;
  private _status:HttpStatus;
  private _data:T;
  private _timeStamp:Date;

  constructor() {
  }


  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get status(): HttpStatus {
    return this._status;
  }

  set status(value: HttpStatus) {
    this._status = value;
  }

  get data(): T {
    return this._data;
  }

  set data(value: T) {
    this._data = value;
  }

  get timeStamp(): Date {
    return this._timeStamp;
  }

  set timeStamp(value: Date) {
    this._timeStamp = value;
  }
}