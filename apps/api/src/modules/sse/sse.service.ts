import { Injectable, MessageEvent } from '@nestjs/common';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class SseService {
  private readonly connections: Map<string, Subject<MessageEvent>> = new Map();

  public connect(key: string): Observable<MessageEvent> {
    const connectionSubject = new Subject<MessageEvent>();
    this.connections.set(key, connectionSubject);
    return connectionSubject.asObservable();
  }

  public disconnect(key: string): void {
    this.connections.delete(key);
  }

  public sendEvent(key: string, event: MessageEvent): void {
    this.connections.get(key)?.next(event);
  }
}
