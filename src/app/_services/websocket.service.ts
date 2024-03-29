import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, filter, first } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Client, Message, over } from 'stompjs';
import { SocketClientState } from '../model/SocketClientState.enum';
import { PostModel } from '../shared/post-model';
 
@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
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

  //TODO: check
  ngOnDestroy(): void {
    this.connect().pipe(first()).subscribe(inst => inst.disconnect(null));
  }

  send(topic: string, payload: any): void {
    this.connect()
      .pipe(first())
      .subscribe(inst => inst.send(topic, {}, JSON.stringify(payload)));
  }


  updateViewCount(postId: number): void {
    const topic = `/app/incrementViewCount/${postId}`;
    const payload = {};
    this.send(topic, payload);
  }

  subscribeToPostDeleted(): Observable<number> {
    const topic = '/topic/postDeleted';
    return new Observable<number>(observer => {
      this.client.subscribe(topic, (message: Message) => {
        observer.next(Number(message.body));
      });
    });
  }

  subscribeToPostCreated(): Observable<PostModel> {
    const topic = '/topic/postAdded';
    return new Observable<PostModel>(observer => {
      this.client.subscribe(topic, (message: Message) => {
        const post = JSON.parse(message.body);
        observer.next(post);
      });
    });
  }
  
}
