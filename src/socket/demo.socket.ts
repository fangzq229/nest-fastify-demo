import { Inject } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Socket } from 'net';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Logger } from 'winston';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DemoSocket {
  @Inject(WINSTON_MODULE_PROVIDER)
  public readonly logger: Logger;

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.info('Socket Init Success');
  }

  handleConnection() {
    this.logger.info('Connect Success');
  }

  handleDisconnect() {
    this.logger.info('Disconnect');
  }

  @SubscribeMessage('events')
  findAll(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<number>> {
    client.emit('events', '11'); // send events
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }
}
