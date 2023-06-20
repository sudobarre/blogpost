import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, filter, first } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { SocketClientState } from '../model/SocketClientState.enum';
 
@Injectable({
  providedIn: 'root'
})
export class ViewCountWebSocketService implements OnDestroy {
  private client: Client;
  private state: BehaviorSubject<SocketClientState>;


  constructor() {
    this.client = over(new SockJS('http://localhost:8080/ws'));
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    this.client.connect({}, () => {
      console.log("Websocket connected.");
      this.state.next(SocketClientState.CONNECTED);
    });
  }

  connect(): Observable<Client> {
    return new Observable<Client>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
        observer.next(this.client);
      });
    });
  }

  ngOnDestroy(): void {
    this.connect().pipe(first()).subscribe(inst => inst.disconnect(null));
  }

  send(topic: string, payload: any): void {
    this.connect()
      .pipe(first())
      .subscribe(inst => inst.send(topic, {}, JSON.stringify(payload)));
  }


}
