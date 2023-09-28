import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { tokenGetter } from '../app.module';
import { Injectable } from '@angular/core';

const config: SocketIoConfig = {
  url: 'http://localhost:5000',
  options: {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: tokenGetter(),
        },
      },
    },
  },
};
@Injectable({ providedIn: 'root' })
export class CustomSocket extends Socket {
  constructor() {
    super(config);
  }
}
