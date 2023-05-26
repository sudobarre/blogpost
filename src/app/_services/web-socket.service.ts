import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocketSubject: WebSocketSubject<any>;

  constructor() {
    this.webSocketSubject = webSocket(`${environment.websocketUrl}/votes`);
  }

  getWebSocketSubject(): WebSocketSubject<any> {
    return this.webSocketSubject;
  }
}
