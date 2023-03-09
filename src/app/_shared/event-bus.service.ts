import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface EventData {
  name: string;
  value?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject<EventData>();
  public postDeleted$ = new Subject<void>();

  get postDeleted() {
    return this.postDeleted$.asObservable();
  }

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e.value)).subscribe(action);
  }

  notifyPostDeleted() {
    this.postDeleted$.next();
  }
}
