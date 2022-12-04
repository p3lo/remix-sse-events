import { EventEmitter } from 'node:events';

let emitter: EventEmitter;
declare global {
  // eslint-disable-next-line no-var
  var __emmiter: EventEmitter;
}
if (process.env.NODE_ENV === 'production') {
  emitter = new EventEmitter();
} else {
  if (!global.__emmiter) {
    global.__emmiter = new EventEmitter();
  }
  emitter = global.__emmiter;
}
export { emitter };
